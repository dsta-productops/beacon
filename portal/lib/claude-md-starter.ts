/**
 * Starter CLAUDE.md rendered on /quality-model. Kept in a .ts module so the
 * page component stays readable and the string can be reused by the corpus /
 * llms.txt surfaces later if we decide to expose it as a standalone endpoint.
 */
export const CLAUDE_MD_STARTER = `# CLAUDE.md

## Project Context

- Name: [project name]
- Tech stack: [e.g. React + TypeScript, Node/Express, PostgreSQL]
- Last reviewed: [date]
- Endorsed by: [Tech Lead name] — [date]. Required before this file is
  enabled for a project; see note below.

<!-- Point to deeper docs instead of pasting them, e.g.:
See @README.md for project overview
See @docs/architecture.md for system design -->

> **Before use:** the rules below reference this project's actual patterns
> (\`apiClient\`, \`ErrorBoundary\`, state management, etc.). These are
> placeholders in the starter template and must be verified — and the file
> endorsed — by the project's tech lead before it's enabled. A rule that
> names the wrong convention is worse than no rule at all.

## Commands

- Install: \`[e.g. pnpm install]\`
- Dev: \`[e.g. pnpm dev]\`
- Build: \`[e.g. pnpm build]\`
- Type check: \`[e.g. pnpm typecheck]\`
- Lint: \`[e.g. pnpm lint]\`
- Test: \`[e.g. pnpm test]\`

## Working Principles

General session behavior, separate from the NFR rules below — these apply to
how Claude Code works, not to properties of the code it produces.

- **IMPORTANT: make minimal, targeted changes.** Do not refactor, reformat, or
  "clean up" code outside the scope of the current task.
- **IMPORTANT: when unsure between two reasonable approaches, explain the
  tradeoff and ask, rather than picking one silently.**
- Prefer reusing existing helpers, components, and utilities over writing new
  ones from scratch.
- Do not edit authentication, data classification, or deployment configuration
  without first explaining the risk and getting confirmation.
- Keep one logical change per PR; do not bundle unrelated changes together.

## Verification

Before opening a PR, run the relevant commands from above and report any that
could not be run:

- Type check and lint must both pass.
- Run tests for anything touching shared logic or state.
- For UI changes, do a visual check against the design in Figma/PRIZM before
  requesting review.

## Non-Functional Requirement Rules

These apply to all code generated in this repository, regardless of whether
the author is UX or Dev. Organised by category, not by author — functional
code inherits the same rules NFR code is expected to follow.

**MUST** = blocking, fails the PR. **SHOULD** = advisory, flagged but non-blocking.

**If a rule below says "use the existing X" and no clear existing pattern is
found, or more than one conflicting pattern exists in the codebase: STOP and
note the ambiguity in the PR description rather than picking one.** This is
the single most important instruction in this file — a flagged ambiguity
costs Dev two minutes to answer; a silent guess costs a rewrite.

### Architecture & Integration

- **[NFR-ARCH-01] MUST** separate presentational components (markup, styling)
  from logic and data-fetching (state, API calls). Keep them in different
  files/hooks, not interleaved in one component. (Lets NFR work be layered in
  without touching UI code.)
- **[NFR-ARCH-02] MUST** expose typed props/interfaces for every component,
  using shared type definitions where one already exists rather than
  redefining local shapes. (Mismatched types are the most common cause of
  integration breakage.)
- **[NFR-ARCH-03] MUST** follow the existing folder/file naming convention
  for the module being worked in, rather than introducing a new structure.
  (Inconsistent structure is what makes a component feel unsalvageable.)
- **[NFR-ARCH-04] MUST** compose PRIZM components whenever one exists for
  the job — layout, forms, interactive surfaces, content — before writing a
  bespoke component or dropping to raw HTML. If a PRIZM primitive is missing,
  flag it per the ambiguity rule rather than fabricating one. (Reaching for
  PRIZM by default is how L1 keeps accessibility, theming, and visual bars
  met by construction.)

### Code Convention

- **[NFR-API-01] MUST** call backend services through the shared \`apiClient\`
  wrapper; never call \`fetch\`/\`axios\` directly. (Centralises auth headers,
  retries, and error shape.)
- **[NFR-API-02] MUST NOT** introduce a new HTTP/data-fetching library; use
  the data layer already in use elsewhere in the app.

### Error Handling

- **[NFR-ERR-01] MUST** wrap async UI actions in the existing \`ErrorBoundary\` /
  \`useAsyncState\` pattern; no bare try/catch with silent swallow. (Silent
  failures stay invisible until a user reports them.)
- **[NFR-ERR-02] MUST** define loading, empty, and error states for any
  data-driven component, not just the happy path. (Missing states are usually
  retrofitted, not added — which is what triggers a rewrite.)

### Accessibility

- **[NFR-A11Y-01] MUST** give all interactive elements accessible names; use
  PRIZM form components rather than raw HTML inputs. (Screen-reader and
  keyboard navigation depend on this.)
- **[NFR-A11Y-02] MUST** use semantic HTML landmarks consistent with the rest
  of the app's layout structure.

### Performance

- **[NFR-PERF-01] SHOULD** use the shared virtualised list component for
  lists over 50 items, not a plain map render. (Unvirtualised long lists are
  the most common cause of jank reports.)
- **[NFR-PERF-02] SHOULD** avoid inline function/object literals in render
  paths where the rest of the app relies on memoisation.

### Security

- **[NFR-SEC-01] MUST** never inline secrets, tokens, or environment values;
  reference the config module only. (The single most common SAST finding.)
- **[NFR-SEC-02] MUST** use the shared auth/session hook to check
  permissions; never re-implement auth logic locally.
- **[NFR-SEC-03] MUST NOT** log, print, or expose personally identifiable
  information (PII) or classified/sensitive data in console output, error
  messages, or client-side storage.

### State & Data Management

- **[NFR-STATE-01] MUST** use the app's existing state management pattern
  (shared store/hook) for any state that needs to persist beyond a single
  component. No component-local copies of server state.
- **[NFR-STATE-02] MUST NOT** introduce a new state management library or
  pattern alongside the one already in use.

### Testing

- **[NFR-TEST-01] MUST** include a colocated test file for any new
  component, following the existing test file naming convention (e.g.
  \`Component.test.tsx\` next to \`Component.tsx\`). If no test convention is
  found, flag it per the ambiguity rule above rather than skipping tests.
- **[NFR-TEST-02] MUST** add \`data-testid\` attributes to primary
  interactive elements, using the existing naming convention, so Dev's
  automated test suite doesn't need to be retrofitted after handover.

### Dependencies

- **[NFR-DEP-01] MUST NOT** add a new npm package without first checking
  whether an existing library in the repo already covers the need, and
  flagging the addition in the PR description. (An unreviewed new dependency
  is one of the fastest ways to trigger a full rewrite.)

### Documentation

- **[NFR-DOC-01] SHOULD** add a brief comment explaining non-obvious
  business logic decisions — the "why," not the "what." (Restating the code
  in words isn't documentation.)
- **[NFR-DOC-02] MUST** update the relevant README or docs when introducing
  a new environment variable, script, or public-facing API.

### Version Control

- **[NFR-VC-01] MUST** write descriptive commit messages (what changed and
  why); no generic messages like "fix" or "update."
- **[NFR-VC-02] MUST NOT** commit commented-out code, debug console logs, or
  TODO comments without a linked ticket.

## Adding New Rules

- ID format: \`NFR-<CATEGORY>-<NUMBER>\`, stable once assigned.
- Write rules as actions, not vibes: name the exact pattern/component/wrapper.
  ("Handle errors gracefully" is not a rule.)
- Promote a rule here once the same PR review pushback recurs 3+ times in a
  sprint — don't pre-guess rules that haven't come up yet.
- Keep this file scannable. If a rule only matters for one part of the
  codebase, put it in a path-scoped rule under \`.claude/rules/\` instead.
`;
