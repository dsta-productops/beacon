import type { List, ListItem, Parent, Root, RootContent } from "mdast";
import type { Directives } from "mdast-util-directive";

/**
 * Resolves the walkthrough's project-specific content before it is rendered, so the markdown
 * renderer only ever sees the text that applies to one reader. Hiding things in React instead
 * leaves their effect on layout behind, such as the extra spacing a hidden block gives a list.
 *
 * For the chosen project it:
 * - keeps the contents of `:::demo` / `:demo[]` and `:::own` / `:own[]` that match it, and drops the rest
 * - does the same for `::::when{project="..."}`
 * - turns PROGRAMME into SKYPROTECT inside ```prompt blocks, for the demo
 * - marks any list item it changed as tight, so removing a note never leaves a loose list behind
 */
export type Project = "own" | "demo";

const DEMO_PROGRAMME = "SKYPROTECT";
const PLACEHOLDER = /\bPROGRAMME\b/g;

/** Source text that needs a different render per project; anything else renders once. */
export const PROJECT_MARKUP = /^\s*:{1,}(?:demo|own|when)\b|:(?:demo|own)\[|\bPROGRAMME\b/m;

/** Which project a node is for, or undefined when it is not project-specific. */
function audience(node: RootContent): string | undefined {
  if (
    node.type !== "containerDirective" &&
    node.type !== "leafDirective" &&
    node.type !== "textDirective"
  ) {
    return undefined;
  }
  const d = node as Directives;
  if (d.name === "demo" || d.name === "own") return d.name;
  if (d.name === "when") return d.attributes?.project ?? "";
  return undefined;
}

function resolve(parent: Parent, project: Project): boolean {
  let changed = false;
  let changedItem = false;
  const next: RootContent[] = [];

  for (const child of parent.children as RootContent[]) {
    const wanted = audience(child);
    if (wanted === undefined) {
      if (child.type === "code" && child.lang === "prompt" && project === "demo") {
        child.value = child.value.replace(PLACEHOLDER, DEMO_PROGRAMME);
      }
      if ("children" in child && resolve(child as Parent, project) && child.type === "listItem") {
        changedItem = true;
      }
      next.push(child);
      continue;
    }
    changed = true;
    if (wanted !== project) continue;
    const inner = child as Parent;
    resolve(inner, project);
    next.push(...(inner.children as RootContent[]));
  }

  parent.children = next as Parent["children"];
  if (changed && parent.type === "listItem") (parent as ListItem).spread = false;
  if (changedItem && parent.type === "list") {
    const list = parent as List;
    list.spread = list.children.some((item) => item.spread);
  }
  return changed;
}

export function remarkProject(project: Project) {
  return (tree: Root) => {
    resolve(tree, project);
  };
}
