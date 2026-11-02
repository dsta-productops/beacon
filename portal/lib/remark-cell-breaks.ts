import { visit } from "unist-util-visit";
import type { Root } from "mdast";

/** A table cell cannot hold a list, so `<br>` inside one becomes a line break. */
export function remarkCellBreaks() {
  return (tree: Root) => {
    visit(tree, "html", (node, index, parent) => {
      if (parent?.type === "tableCell" && index !== undefined && /^<br\s*\/?>$/i.test(node.value)) {
        parent.children[index] = { type: "break" };
      }
    });
  };
}
