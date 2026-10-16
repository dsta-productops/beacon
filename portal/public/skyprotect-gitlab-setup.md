# Set up the SKYPROTECT demo Knowledge Base in a GitLab Wiki

## Who is reading this

You are an AI assistant with a shell and git. You use plain git commands only: do not use any GitLab MCP tools or the GitLab API. Your task is to populate the wiki of the GitLab project named **SKYPROTECT** with a demo Knowledge Base for a fictional drone-defence C3 programme. You do this by writing Markdown files into a local clone of the project's wiki repository, committing them, and pushing. The project and its wiki repository already exist; do not create them.

The user is testing a ProductOps Co-pilot portal that produces structured research artefacts and files them into a GitLab wiki. SKYPROTECT is being used as test data.

The user will give you the SKYPROTECT wiki clone URL in chat (for example `https://gitlab.example.com/my-group/skyprotect.wiki.git`). If they have not, ask for it once before doing anything else.

## How a GitLab wiki works (conventions this file relies on)

- **Pages are files.** A wiki is a git repository. Each page is a Markdown file; the page's address is its path without the `.md` extension. The wiki repository is the project's repository address with `.git` replaced by `.wiki.git`.
- **Folders are hierarchy.** A file in `Operator-console/Field-notes/` is a page under Operator-console > Field-notes. GitLab builds the nested tree in the wiki sidebar from the folders.
- **Every folder has an index page beside it.** The index for the folder `Programme-wide/` is the file `Programme-wide.md` (next to the folder, not inside it). Index pages link to everything inside their folder. Git cannot store an empty folder, so a grouping with no children is just its index file.
- **The home page is `home.md`** at the wiki root. `_sidebar.md` at the wiki root is the custom navigation sidebar.
- **Titles come from front matter.** Every file except `_sidebar.md` starts with a front-matter block containing the page's title:

  ```
  ---
  title: "<Title>"
  ---
  ```

  Followed by a blank line, then the Content for that page, verbatim. (Front-matter titles need a reasonably recent GitLab. If the instance ignores them, pages still work and are titled from the file name; mention this in your report.)
- **Links are root-relative, without the extension:** `[Operator-console](/Operator-console)`, `[S01](/Operator-console/Field-notes/S01-Console-operator-interview)`. A link starting with `/` is relative to the wiki root.
- **File names** use ASCII letters, digits, and hyphens only, no spaces, and end in `.md`.

## Filing discipline (apply to every file below)

**Repository check.** Clone the wiki repository (`git clone <wiki-clone-url> skyprotect-wiki`) and work only inside that clone. The user has already created the project and initialised its wiki by adding a first page in the GitLab UI, so the clone should succeed. If it fails for any reason (project missing, wiki disabled, wiki not yet initialised, authentication), stop and report. Do not create the project, enable the wiki, or run `git init`. Work on the branch the clone checks out (the wiki's default branch). Derive the project's web URL from the clone URL by removing `.wiki.git`.

**Hierarchy check.** Before writing a file, verify that its folder and its parent index page are in the list below. If a parent index page is missing from the working tree when you reach a child, create it first as a placeholder whose Content is exactly "Placeholder — created to support filing structure." with the correct front matter and breadcrumb.

**No silent fallbacks.** If a file cannot be written, committed, or pushed (permissions, protected branch, authentication, name conflict, anything else), stop and report. Never write outside the wiki working tree. The only files allowed at the wiki root are `home.md`, `_sidebar.md`, `Programme-wide.md`, and `Operator-console.md`; never file anything else at the root, or anywhere else, without explicit confirmation. Never touch the project's code repository.

**Existing content.** If the wiki already contains a file at a target path with different content, stop and report; do not overwrite it. If the content is identical, skip it and count it as "already existed". One exception: the user created a first page in the GitLab UI to initialise the wiki. If, and only if, `home.md` is the **only** file in the clone, replace its content with page 1 in the normal way (a regular commit, no history rewriting) and say so in your report. If the clone holds any other file, apply the rule above.

**Credentials.** Use only the git credentials already configured on this machine. Never ask for a token or password in chat, never put one in a remote URL or a file, and never commit one. If authentication fails, stop and report. If no git author identity is configured, stop and ask which to use.

**No history rewriting.** No force-push, no amend after push, no rebase. Make the commits described under "Git workflow" and push them once, to the wiki's default branch.

**Order.** Create files in the order listed below — page numbers are creation order. That order writes the structure first (pages 1-18), then the field notes (pages 19-44), then the artefacts that cite them (pages 45-52). A wiki path is known in advance, so the citations below can be written exactly as given; the order is for readability and for the three commits.

**Cite field notes by link.** Inside the artefact bodies (synthesis, persona, journey, PRD, test plan) and inside notes that refer to other notes, every reference to an interview, walk-through, or field observation is a link to that note's page. In the Content below this is written in reference style: the label is written in square brackets in the text, for example `[S01]`, and a block at the bottom of the file defines where each label points, for example `[S01]: /Operator-console/Field-notes/S01-Console-operator-interview`. Reproduce both the in-text labels and the definition block exactly as written. The visible link text is the note's short label (S01, WT02, Field Alpha 1). Do not invent paths.

**Provenance labels.** The SKYPROTECT pages in this file do not carry provenance labels, so do not add any.

**Labels and metadata are not needed.** GitLab wikis have no labels or metadata beyond the front-matter title. The hierarchy is carried by folders, and relationships are carried by links.

## Target hierarchy

Everything sits inside the SKYPROTECT project's wiki. The tree below shows the files to create. Each folder has an index page beside it, and the Knowledge Base home page is `home.md`.

```
<wiki repository root>
├── home.md    # Knowledge Base (wiki home page)
├── _sidebar.md    # custom navigation sidebar
├── Programme-wide.md    # track index page
├── Programme-wide/
│   ├── Prior-knowledge.md    # grouping index page
│   ├── Prior-knowledge/
│   │   └── Counter-drone-systems.md
│   ├── Interview-guides.md    # grouping index page (placeholder only)
│   ├── Field-notes.md    # grouping index page
│   ├── Field-notes/
│   │   ├── Template-Field-note.md
│   │   ├── S13-Air-defence-commander-interview.md
│   │   ├── S14-Air-defence-commander-interview.md
│   │   ├── S15-Air-defence-commander-interview.md
│   │   └── S16-Air-defence-commander-interview.md
│   ├── Research-synthesis.md    # research synthesis
│   ├── Personas.md    # grouping index page
│   ├── Personas/
│   │   └── Air-defence-commander.md
│   ├── Journeys.md    # grouping index page (placeholder only)
│   ├── PRDs.md    # grouping index page (placeholder only)
│   └── Test-plans.md    # grouping index page (placeholder only)
├── Operator-console.md    # track index page
└── Operator-console/
    ├── Prior-knowledge.md    # grouping index page (placeholder only)
    ├── Interview-guides.md    # grouping index page (placeholder only)
    ├── Field-notes.md    # grouping index page
    ├── Field-notes/
    │   ├── Template-Field-note.md
    │   ├── S01-Console-operator-interview.md
    │   ├── S02-Console-operator-interview.md
    │   ├── S03-Console-operator-interview.md
    │   ├── S04-Console-operator-interview.md
    │   ├── S05-Console-operator-interview.md
    │   ├── S06-Console-operator-interview.md
    │   ├── S07-Console-operator-interview.md
    │   ├── S08-Console-operator-interview.md
    │   ├── S09-Console-operator-interview.md
    │   ├── S10-Console-operator-interview.md
    │   ├── S11-Console-operator-interview.md
    │   ├── S12-Console-operator-interview.md
    │   ├── WT01-Console-paper-prototype-walk-through.md
    │   ├── WT02-Reconciliation-view-walk-through.md
    │   ├── WT03-Site-context-surfacing-walk-through.md
    │   ├── WT04-Commander-acknowledgement-walk-through.md
    │   ├── Field-Alpha-1-Site-Alpha-day-shift.md
    │   ├── Field-Alpha-2-Site-Alpha-night-shift.md
    │   ├── Field-Bravo-1-Site-Bravo-day-shift.md
    │   └── Field-Bravo-2-Site-Bravo-night-shift.md
    ├── Research-synthesis.md    # research synthesis
    ├── Personas.md    # grouping index page
    ├── Personas/
    │   └── Console-operator.md
    ├── Journeys.md    # grouping index page
    ├── Journeys/
    │   └── Engage-incoming-threat.md
    ├── PRDs.md    # grouping index page
    ├── PRDs/
    │   └── Console-v1.md
    ├── Test-plans.md    # grouping index page
    └── Test-plans/
        └── Console-v1-usability-test.md
```

Artefact-type groupings (Personas, Journeys, Field-notes, etc.) are titled plainly, with no track suffix. The titles are not unique: there is a Personas page under Programme-wide and another under Operator-console. They are disambiguated by their folder and by the breadcrumb at the top of each page. Every level, including these groupings and each leaf artefact, is a file nested under its parent folder.

Programme-wide and Operator-console are tracks. Programme-wide holds umbrella artefacts that apply across all tracks; the Operator-console track holds artefacts specific to the operator-facing console. SKYPROTECT is a digital programme — there are no engineering-track artefacts in this demo.

Some groupings are intentionally left as placeholders: Programme-wide Interview-guides, Journeys, PRDs and Test-plans, and Operator-console Prior-knowledge and Interview-guides. Each is a single index file whose Content is the placeholder sentence. Do not fill them.

## SKYPROTECT — programme context

A digital command-and-control system for counter-UAS (counter-unmanned-aircraft-systems) operations protecting fixed sites — military bases, critical infrastructure, defence-led security at public events. The system unifies feeds from radar, RF detection, and EO/IR cameras into a single operator console, and supports the decision chain from alert through to engagement authorisation.

The current toolchain in use across DSTA-supported sites is described by operators as *"three windows duct-taped together"* — separate vendor systems for each sensor type, with the operator manually reconciling contradictions. SKYPROTECT replaces that with a single fused-sensor console plus a commander oversight view.

Use these names consistently across all pages so the demo coheres internally.

## Git workflow

1. **Clone the wiki repository** with git and work inside the clone. Note the project's web URL, derived from the clone URL.
2. **Write the files** in page-number order, following the conventions above. Use UTF-8 and LF line endings, and end every file with a single newline.
3. **Run the link check** below from the repository root. It must print `OK` before you commit. If it reports a broken link, fix a transcription error in your own working tree; if the cause is anything else, stop and report. Keep the script outside the repository (for example `/tmp/check_wiki_links.py`) so it is not committed.
4. **Make three commits**, in this order, each staging only its own files:
   - `wiki: add SKYPROTECT structure (pages 1-18)`
   - `wiki: add SKYPROTECT field notes (pages 19-44)`
   - `wiki: add SKYPROTECT artefacts (pages 45-52)`
5. **Push once** to the wiki's default branch, with a normal (non-force) push.
6. **Verify** with git only: run `git fetch`, then count the Markdown files on the remote default branch (for example `git ls-tree -r --name-only origin/<branch> | grep -c '\.md$'`). The count should match the number of Markdown files you wrote. Report any difference.

Link check script:

```python
#!/usr/bin/env python3
"""Link check for the SKYPROTECT wiki working tree. Run from the wiki repo root."""
import re, sys, pathlib

root = pathlib.Path(".")
files = [p for p in root.rglob("*.md") if ".git" not in p.parts]
pages = {p.as_posix()[:-3] for p in files}
bad = []
for p in files:
    text = p.read_text(encoding="utf-8")
    if p.name != "_sidebar.md" and not text.startswith("---\ntitle: "):
        bad.append(f"{p}: missing front-matter title")
    scan = re.sub(r"`[^`\n]*`", "", text)
    targets = re.findall(r"\]\((/[^)\s#]+)", scan) + re.findall(r"^\[[^\]]+\]:\s*(/\S+)", scan, re.M)
    for t in targets:
        t = t.strip("/")
        t = t[:-3] if t.endswith(".md") else t
        if t not in pages:
            bad.append(f"{p}: broken link /{t}")
for p in pages:
    if " " in p:
        bad.append(f"{p}: file name contains a space")
print("\n".join(bad) if bad else f"OK: {len(files)} pages, all links resolve")
sys.exit(1 if bad else 0)
```

---

## Pages to create

Each page below gives its file, its front-matter title, its parent, and its Content. Write the front-matter block, a blank line, then the Content verbatim.

---

Page 1 — Knowledge Base (wiki home page)

File: home.md

Title: Knowledge Base

Parent: none (wiki home page)

Content:

This is the SKYPROTECT programme's Knowledge Base. All AI-generated research artefacts file under here, organised by track.

Programme type: Digital

## Tracks

- [Programme-wide](/Programme-wide) — umbrella artefacts that apply across all tracks
- [Operator-console](/Operator-console) — the operator-facing console

## Start here

- [Counter-drone systems](/Programme-wide/Prior-knowledge/Counter-drone-systems) — what past programmes already taught us
- [Programme-wide research synthesis](/Programme-wide/Research-synthesis) — themes, friction points and the problem statement
- [Operator-console research synthesis](/Operator-console/Research-synthesis) — console-level themes and friction points
- [Console v1 PRD](/Operator-console/PRDs/Console-v1) — the requirements for the operator console

## How this wiki is organised

Filing convention: `<track>/<artefact-type>/<File-name>.md`. Folders carry the hierarchy and links carry the relationships:

- Every folder has an **index page beside it** (for example `Programme-wide.md` next to the `Programme-wide/` folder) that links to everything inside.
- Every page starts with a **breadcrumb** back up the tree.
- Every reference to an interview, walk-through, or field observation in an artefact is a **link to that note's page**, with the note's short label (for example [S01]) as the visible text.
- The sidebar (`_sidebar.md`) shows the tree down to the artefact level.

<!-- link references -->
[S01]: /Operator-console/Field-notes/S01-Console-operator-interview

Page 2 — _sidebar (custom wiki navigation)

File: _sidebar.md

Title: none (the sidebar file has no front matter)

Parent: wiki root

Content:

**[Knowledge Base](/home)**

- [Programme-wide](/Programme-wide)
  - [Prior-knowledge](/Programme-wide/Prior-knowledge)
    - [Counter-drone-systems](/Programme-wide/Prior-knowledge/Counter-drone-systems)
  - [Interview-guides](/Programme-wide/Interview-guides)
  - [Field-notes](/Programme-wide/Field-notes)
  - [Research-synthesis](/Programme-wide/Research-synthesis)
  - [Personas](/Programme-wide/Personas)
    - [Air-defence-commander](/Programme-wide/Personas/Air-defence-commander)
  - [Journeys](/Programme-wide/Journeys)
  - [PRDs](/Programme-wide/PRDs)
  - [Test-plans](/Programme-wide/Test-plans)
- [Operator-console](/Operator-console)
  - [Prior-knowledge](/Operator-console/Prior-knowledge)
  - [Interview-guides](/Operator-console/Interview-guides)
  - [Field-notes](/Operator-console/Field-notes)
  - [Research-synthesis](/Operator-console/Research-synthesis)
  - [Personas](/Operator-console/Personas)
    - [Console-operator](/Operator-console/Personas/Console-operator)
  - [Journeys](/Operator-console/Journeys)
    - [Engage-incoming-threat](/Operator-console/Journeys/Engage-incoming-threat)
  - [PRDs](/Operator-console/PRDs)
    - [Console-v1](/Operator-console/PRDs/Console-v1)
  - [Test-plans](/Operator-console/Test-plans)
    - [Console-v1-usability-test](/Operator-console/Test-plans/Console-v1-usability-test)

Page 3 — Programme-wide (track index page)

File: Programme-wide.md

Title: Programme-wide

Parent: home.md

Content:

[Knowledge Base](/home)

Programme-wide artefacts — personas, prior-knowledge summaries, and research synthesis that apply across all tracks in SKYPROTECT. Track-level artefacts may inherit from these as foundation.

## Contents

- [Prior-knowledge](/Programme-wide/Prior-knowledge) — what earlier programmes taught us
- [Interview-guides](/Programme-wide/Interview-guides) — how sessions are run *(placeholder)*
- [Field-notes](/Programme-wide/Field-notes) — interviews, walk-throughs, and shift observations (the evidence)
- [Research-synthesis](/Programme-wide/Research-synthesis) — themes, friction points, problem statement, success criteria
- [Personas](/Programme-wide/Personas) — who we are designing for
- [Journeys](/Programme-wide/Journeys) — current-state journey maps *(placeholder)*
- [PRDs](/Programme-wide/PRDs) — product requirements *(placeholder)*
- [Test-plans](/Programme-wide/Test-plans) — how the product will be evaluated *(placeholder)*

Page 4 — Operator-console (track index page)

File: Operator-console.md

Title: Operator-console

Parent: home.md

Content:

[Knowledge Base](/home)

The Operator-console track. The operator-facing console is the primary user-facing artefact of SKYPROTECT — the unified screen that replaces the previous three-vendor toolchain.

Artefacts in this track are scoped to operators' use of the console. Programme-wide personas, prior-knowledge summaries, and the umbrella research synthesis cascade in as foundation.

## Contents

- [Prior-knowledge](/Operator-console/Prior-knowledge) — what earlier programmes taught us *(placeholder)*
- [Interview-guides](/Operator-console/Interview-guides) — how sessions are run *(placeholder)*
- [Field-notes](/Operator-console/Field-notes) — interviews, walk-throughs, and shift observations (the evidence)
- [Research-synthesis](/Operator-console/Research-synthesis) — themes, friction points, problem statement, success criteria
- [Personas](/Operator-console/Personas) — who we are designing for
- [Journeys](/Operator-console/Journeys) — current-state journey maps
- [PRDs](/Operator-console/PRDs) — product requirements
- [Test-plans](/Operator-console/Test-plans) — how the product will be evaluated

Page 5 — Prior-knowledge (grouping index page under Programme-wide)

File: Programme-wide/Prior-knowledge.md

Title: Prior-knowledge

Parent: Programme-wide.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide)

Summaries of what is already known from earlier programmes. Cite the source of each finding.

## Contents

- [Counter-drone-systems](/Programme-wide/Prior-knowledge/Counter-drone-systems)

Page 6 — Interview-guides (grouping placeholder under Programme-wide)

File: Programme-wide/Interview-guides.md

Title: Interview-guides

Parent: Programme-wide.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide)

Placeholder — created to support filing structure.

Page 7 — Field-notes (grouping index page under Programme-wide)

File: Programme-wide/Field-notes.md

Title: Field-notes

Parent: Programme-wide.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide)

Primary evidence: interviews, walk-throughs, and shift observations. Artefacts cite these notes by link. To add a note, copy the template in this folder.

## Template

- [Template — Field note](/Programme-wide/Field-notes/Template-Field-note)

## Commander interviews

- [S13 — Air-defence commander interview](/Programme-wide/Field-notes/S13-Air-defence-commander-interview)
- [S14 — Air-defence commander interview](/Programme-wide/Field-notes/S14-Air-defence-commander-interview)
- [S15 — Air-defence commander interview](/Programme-wide/Field-notes/S15-Air-defence-commander-interview)
- [S16 — Air-defence commander interview](/Programme-wide/Field-notes/S16-Air-defence-commander-interview)

Page 8 — Personas (grouping index page under Programme-wide)

File: Programme-wide/Personas.md

Title: Personas

Parent: Programme-wide.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide)

Evidence-backed personas. Every trait cites the notes it comes from.

## Contents

- [Air-defence-commander](/Programme-wide/Personas/Air-defence-commander)

Page 9 — Journeys (grouping placeholder under Programme-wide)

File: Programme-wide/Journeys.md

Title: Journeys

Parent: Programme-wide.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide)

Placeholder — created to support filing structure.

Page 10 — PRDs (grouping placeholder under Programme-wide)

File: Programme-wide/PRDs.md

Title: PRDs

Parent: Programme-wide.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide)

Placeholder — created to support filing structure.

Page 11 — Test-plans (grouping placeholder under Programme-wide)

File: Programme-wide/Test-plans.md

Title: Test-plans

Parent: Programme-wide.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide)

Placeholder — created to support filing structure.

Page 12 — Prior-knowledge (grouping placeholder under Operator-console)

File: Operator-console/Prior-knowledge.md

Title: Prior-knowledge

Parent: Operator-console.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console)

Placeholder — created to support filing structure.

Page 13 — Interview-guides (grouping placeholder under Operator-console)

File: Operator-console/Interview-guides.md

Title: Interview-guides

Parent: Operator-console.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console)

Placeholder — created to support filing structure.

Page 14 — Field-notes (grouping index page under Operator-console)

File: Operator-console/Field-notes.md

Title: Field-notes

Parent: Operator-console.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console)

Primary evidence: interviews, walk-throughs, and shift observations. Artefacts cite these notes by link. To add a note, copy the template in this folder.

## Template

- [Template — Field note](/Operator-console/Field-notes/Template-Field-note)

## Operator interviews

- [S01 — Console operator interview](/Operator-console/Field-notes/S01-Console-operator-interview)
- [S02 — Console operator interview](/Operator-console/Field-notes/S02-Console-operator-interview)
- [S03 — Console operator interview](/Operator-console/Field-notes/S03-Console-operator-interview)
- [S04 — Console operator interview](/Operator-console/Field-notes/S04-Console-operator-interview)
- [S05 — Console operator interview](/Operator-console/Field-notes/S05-Console-operator-interview)
- [S06 — Console operator interview](/Operator-console/Field-notes/S06-Console-operator-interview)
- [S07 — Console operator interview](/Operator-console/Field-notes/S07-Console-operator-interview)
- [S08 — Console operator interview](/Operator-console/Field-notes/S08-Console-operator-interview)
- [S09 — Console operator interview](/Operator-console/Field-notes/S09-Console-operator-interview)
- [S10 — Console operator interview](/Operator-console/Field-notes/S10-Console-operator-interview)
- [S11 — Console operator interview](/Operator-console/Field-notes/S11-Console-operator-interview)
- [S12 — Console operator interview](/Operator-console/Field-notes/S12-Console-operator-interview)

## Walk-throughs

- [WT01 — Console paper-prototype walk-through](/Operator-console/Field-notes/WT01-Console-paper-prototype-walk-through)
- [WT02 — Reconciliation view walk-through](/Operator-console/Field-notes/WT02-Reconciliation-view-walk-through)
- [WT03 — Site-context surfacing walk-through](/Operator-console/Field-notes/WT03-Site-context-surfacing-walk-through)
- [WT04 — Commander acknowledgement walk-through](/Operator-console/Field-notes/WT04-Commander-acknowledgement-walk-through)

## Field observations

- [Field Alpha 1 — Site Alpha day shift](/Operator-console/Field-notes/Field-Alpha-1-Site-Alpha-day-shift)
- [Field Alpha 2 — Site Alpha night shift](/Operator-console/Field-notes/Field-Alpha-2-Site-Alpha-night-shift)
- [Field Bravo 1 — Site Bravo day shift](/Operator-console/Field-notes/Field-Bravo-1-Site-Bravo-day-shift)
- [Field Bravo 2 — Site Bravo night shift](/Operator-console/Field-notes/Field-Bravo-2-Site-Bravo-night-shift)

Page 15 — Personas (grouping index page under Operator-console)

File: Operator-console/Personas.md

Title: Personas

Parent: Operator-console.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console)

Evidence-backed personas. Every trait cites the notes it comes from.

## Contents

- [Console-operator](/Operator-console/Personas/Console-operator)

Page 16 — Journeys (grouping index page under Operator-console)

File: Operator-console/Journeys.md

Title: Journeys

Parent: Operator-console.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console)

Current-state journey maps built from the field notes.

## Contents

- [Engage-incoming-threat](/Operator-console/Journeys/Engage-incoming-threat)

Page 17 — PRDs (grouping index page under Operator-console)

File: Operator-console/PRDs.md

Title: PRDs

Parent: Operator-console.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console)

Product requirements documents.

## Contents

- [Console-v1](/Operator-console/PRDs/Console-v1)

Page 18 — Test-plans (grouping index page under Operator-console)

File: Operator-console/Test-plans.md

Title: Test-plans

Parent: Operator-console.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console)

Test plans for evaluating the product against the PRD's success criteria.

## Contents

- [Console-v1-usability-test](/Operator-console/Test-plans/Console-v1-usability-test)

Page 19 — _Template — Field note (template under Programme-wide field notes)

File: Programme-wide/Field-notes/Template-Field-note.md

Title: Template — Field note

Parent: Programme-wide/Field-notes.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide) › [Field-notes](/Programme-wide/Field-notes)

## How to use this template

1. **Create a new file** in the `Programme-wide/Field-notes/` folder, next to this template, with a `.md` extension. Copy the structure below into it and start the file with a front-matter block: a `---` line, `title: <your title>`, and another `---` line.
2. **Name your copy** something memorable — e.g. `Commander-session-2026-05-22.md`, `Cross-site-handover-observation-2026-05-30.md`. Use hyphens, no spaces. CLARA reads the body, not the file name.
    - Drop the `Template-` prefix.
3. **Cite this note by linking to its file.** Artefacts reference a note with a link whose visible text is the note's short label, e.g. `[S17](/Programme-wide/Field-notes/Commander-session-2026-05-22)`. You choose the label and the file name; there is no system-assigned identifier. Also add the note to the `Field-notes` index page so it can be found.
4. **Fill in the rest.** Participants and User group are optional but useful; Raw notes and Verbatim quotes are the substance.
5. Delete this *How to use* block before saving — it's guidance for you, not part of the note.

---

- **Participants:** e.g. Air-defence commander (x1), Console operator (x1)
- **User group:** 

---

## Raw notes

_Drop your notes here. No structure required._

---

## Verbatim quotes

_Exact words from participants only. Attribute to role where possible — e.g. Air-defence commander: "..."_

Page 20 — S13 — Air-defence commander interview

File: Programme-wide/Field-notes/S13-Air-defence-commander-interview.md

Title: S13 — Air-defence commander interview

Parent: Programme-wide/Field-notes.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide) › [Field-notes](/Programme-wide/Field-notes)

- **Participants:** Air-defence commander (x1) — Lt Col, 18 yrs exp
- **User group:** Commanders (central ops room)

---

## Raw notes

Conducted in the central ops room mid-shift, 45 min. Subject oversees three sites concurrently. Main thread of the conversation was around the difficulty of holding a coherent picture across sites when each site dashboard is in a separate browser tab. Subject described "tab-thrashing" during the morning bird-strike window when several sites get returns within minutes of each other.

On engagement authorisation: subject wants to authorise quickly enough that soft-kill remains viable but emphasised that quickness is constrained by *not knowing what the operator is seeing*. Currently he asks the operator over voice to describe sensor state — adds 20-40s per call. He explicitly does *not* want a system-summarised version; he wants the operator's own framing.

On operator disruption: subject said he tries to "stay out of the operator's screen" during active alerts because he's noticed operators slow down visibly when they think he's watching. He sees this as a design problem of the current setup, not an operator problem.

---

## Verbatim quotes

Commander: "I'm holding three sites in my head and switching between three dashboards to do it. That's not a picture, that's a slideshow."

Commander: "I want to know quickly enough to keep soft-kill on the table. Right now I'm getting there via voice, which costs me thirty, forty seconds a call."

Commander: "If I'm visibly watching their screen they slow down. I've stopped doing it during live alerts."

Page 21 — S14 — Air-defence commander interview

File: Programme-wide/Field-notes/S14-Air-defence-commander-interview.md

Title: S14 — Air-defence commander interview

Parent: Programme-wide/Field-notes.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide) › [Field-notes](/Programme-wide/Field-notes)

- **Participants:** Air-defence commander (x1) — Maj, 12 yrs exp
- **User group:** Commanders (central ops room)

---

## Raw notes

Newer commander, came up through the operator role two years ago. 60 min, ops room.

Spent most of the session on the acknowledgement workflow. Subject's core complaint: acknowledgement is one button regardless of stakes. A routine bird-strike re-classification needs the same physical action as authorising a soft-kill on a confirmed hostile UAS. Subject described having developed a personal habit of "double-pausing" before high-stakes acknowledgements just to slow himself down, because the workflow doesn't differentiate.

Asked about quick-vs-considered tension: he said for routine cases he wants the acknowledgement to be near-instant; for high-stakes ones he wants the system to *make him* pause — show him the operator's reasoning, the sensor confidence breakdown, the engagement option being requested. Not to gate him, but to force a conscious read.

---

## Verbatim quotes

Commander: "The button is the same whether I'm acknowledging a heron at 0600 or authorising soft-kill on a real one. That's a workflow problem."

Commander: "I want the routine ones out of my face. I want the serious ones to slow me down on purpose."

Commander: "I've literally trained myself to count to two before the high-stakes presses. The system should be doing that, not me."

Page 22 — S15 — Air-defence commander interview

File: Programme-wide/Field-notes/S15-Air-defence-commander-interview.md

Title: S15 — Air-defence commander interview

Parent: Programme-wide/Field-notes.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide) › [Field-notes](/Programme-wide/Field-notes)

- **Participants:** Air-defence commander (x1) — Lt Col, 22 yrs exp
- **User group:** Commanders (central ops room)

---

## Raw notes

Most senior of the commander interviews. 75 min, his office. Subject is the unofficial reference point for the other commanders — they bring him hard calls. Heavy thread about classifier confidence: he doesn't trust a confidence score he can't trace to specific sensor evidence. He'd rather have *no* score than a score he can't reason about. Quote below captures this.

On multi-site oversight: he runs five sites and switches between them constantly. The act of switching loses him picture continuity — when he flips back to Site 3 after dealing with Site 1, he has to re-orient.

On commander-induced operator hesitation: confirmed [S13]'s finding. Subject said he can *see* operators slow down when he opens their session view. He's stopped doing live views during alerts and now does post-engagement reviews instead, which he likes worse.

On confidence afterwards: emphasised that he carries the decisions home with him. He wants the rationale auditable not for compliance but for his own conscience. The current system makes him reconstruct rationale from his memory of the voice call.

---

## Verbatim quotes

Commander: "My job in those 30 seconds isn't to second-guess them — it's to confirm I'd make the same call if I were sitting there. But to do that, I need to see what they're seeing, and right now I don't."

Commander: "A confidence number I can't trace is noise. Show me which sensor saw what, or don't show me anything."

Commander: "Five sites, five tabs. I lose the picture every time I switch."

Commander: "I want to be able to sleep on the call. Right now the only record is what I remember from a voice exchange."

<!-- link references -->
[S13]: /Programme-wide/Field-notes/S13-Air-defence-commander-interview

Page 23 — S16 — Air-defence commander interview

File: Programme-wide/Field-notes/S16-Air-defence-commander-interview.md

Title: S16 — Air-defence commander interview

Parent: Programme-wide/Field-notes.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide) › [Field-notes](/Programme-wide/Field-notes)

- **Participants:** Air-defence commander (x1) — Lt Col, 16 yrs exp
- **User group:** Commanders (central ops room)

---

## Raw notes

60 min, ops room. Conversation centred on what the system should *not* do for commanders. Subject is sceptical of automated summaries — he'd rather hear the operator speak than read a system-generated digest. His view: when the system pre-digests for him he loses the read on what the operator is actually thinking, including their level of certainty. Confirmed his preference for operator-authored framing over system-authored framing.

Reiterated [S14]'s concern about acknowledgement granularity. Said the current workflow flattens the cognitive register — routine and high-stakes get the same physical interaction, which is unfit for what the role actually requires.

Stayed-confident-afterwards: subject keeps a personal logbook outside the system because he doesn't trust the system's log to capture what he was actually weighing. He'd stop keeping it if the in-system log captured his rationale in his own words at the moment of decision.

---

## Verbatim quotes

Commander: "If the system pre-digests it for me, I lose the read on what the operator is actually thinking."

Commander: "I want to hear them — their hedge, their certainty. A summary loses that."

Commander: "I keep my own log on paper because I don't trust the system to record what I was weighing."

<!-- link references -->
[S14]: /Programme-wide/Field-notes/S14-Air-defence-commander-interview

Page 24 — _Template — Field note (template under Operator-console field notes)

File: Operator-console/Field-notes/Template-Field-note.md

Title: Template — Field note

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

## How to use this template

1. **Create a new file** in the `Operator-console/Field-notes/` folder, next to this template, with a `.md` extension. Copy the structure below into it and start the file with a front-matter block: a `---` line, `title: <your title>`, and another `---` line.
2. **Name your copy** something memorable — e.g. `Operator-session-2026-05-22.md`, `Site-Alpha-night-shift-observation-2026-05-30.md`. Use hyphens, no spaces. CLARA reads the body, not the file name.
    - Drop the `Template-` prefix.
3. **Cite this note by linking to its file.** Artefacts reference a note with a link whose visible text is the note's short label, e.g. `[S18](/Operator-console/Field-notes/Operator-session-2026-05-22)`. You choose the label and the file name; there is no system-assigned identifier. Also add the note to the `Field-notes` index page so it can be found.
4. **Fill in the rest.** Participants and User group are optional but useful; Raw notes and Verbatim quotes are the substance.
5. Delete this *How to use* block before saving — it's guidance for you, not part of the note.

---

- **Participants:** e.g. Console operator (x2), Air-defence commander (x1)
- **User group:** 

---

## Raw notes

_Drop your notes here. No structure required._

---

## Verbatim quotes

_Exact words from participants only. Attribute to role where possible — e.g. Console operator: "..."_

Page 25 — S01 — Console operator interview

File: Operator-console/Field-notes/S01-Console-operator-interview.md

Title: S01 — Console operator interview

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operator (x1) — 8 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

45 min, end of day shift. Subject described a standard alert response as "open radar, then open RF, then open camera, then make a call" — three windows, three context switches before the decision. Said the slowest part is the second open, because by then he's holding the bearing in his head and worrying about losing it.

On classifier confidence: subject does not act on the radar classifier confidence alone. He always confirms on EO. Said the camera feed is "the only thing that doesn't lie to you" because everything else is downstream of an algorithm he doesn't trust. Asked what would change his mind: showing him the sensor-level evidence behind a classification, not just the number.

On contradictory sensors: the worst case is when radar says "yes, UAS" and RF says "no signature." He has no in-tool way to reconcile — he builds a mental model and acts on the EO.

---

## Verbatim quotes

Operator: "It's open radar, open RF, open camera, then make a call. Three opens before I've decided anything."

Operator: "The camera is the only thing that doesn't lie to you. The rest is an algorithm I don't know."

Operator: "If radar and RF disagree, I'm just guessing. There's no tool for that disagreement."

Page 26 — S02 — Console operator interview

File: Operator-console/Field-notes/S02-Console-operator-interview.md

Title: S02 — Console operator interview

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operator (x1) — 6 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

50 min, beginning of shift. Subject's main thread was about classifier *basis* — she wants to know *why* a classifier landed on 87% confidence, not just the number. Said the number on its own is meaningless because she can't reason about it.

On cross-shift handover: she described inheriting a "blank picture" from the previous shift. She knows the previous operator noted things — false-positive sources, recurring artefacts — but those notes don't make it into the system, they live in the operator's head. Subject has personally re-discovered the Site Alpha heli-pad 0600 return three times in two months.

Said the worst part of the handover gap is that it makes new operators slower. Site-specific gotchas are learned by suffering through them, not transmitted.

---

## Verbatim quotes

Operator: "87% of what? Show me which sensor saw what. Then the number means something."

Operator: "Every shift I start blind. Whatever the previous shift learned, it stayed with them."

Operator: "The heli-pad gives a return every morning at 0600. I've figured that out three times now because nobody can write it down where the system shows it."

Page 27 — S03 — Console operator interview

File: Operator-console/Field-notes/S03-Console-operator-interview.md

Title: S03 — Console operator interview

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operator (x1) — 10 yrs exp, Site Bravo
- **User group:** Operators

---

## Raw notes

60 min, day shift midpoint. Subject spent most of the session on the engagement-decision logging form. Said he stopped trying to log mid-engagement after about a year on the job because the form is too heavy — multi-field, multi-screen. He now logs post-hoc, reconstructing what he was thinking from memory and from his radio transcripts.

On commander acknowledgement: subject said the worst thing about the current workflow is not knowing whether the commander has heard him. He radios, waits, sometimes re-radios. Acknowledgement state isn't on his screen. He estimated this costs him 20-40s on roughly half his engagements.

On commander-induced hesitation: when subject knows the commander is on the radio listening, he speaks more carefully and decides slower. Estimated ~20s slower per decision when commander is actively watching/listening. Confirmed [S07]'s finding.

---

## Verbatim quotes

Operator: "The logging form is heavy enough that I just don't fill it in-flight. I reconstruct after."

Operator: "I'm radioing the commander and I don't know if she's heard me. Is she there? Has she ack'd? My screen doesn't tell me."

Operator: "When I know command is on the line I'm slower. I'm choosing my words. That's twenty seconds I don't have."

<!-- link references -->
[S07]: /Operator-console/Field-notes/S07-Console-operator-interview

Page 28 — S04 — Console operator interview

File: Operator-console/Field-notes/S04-Console-operator-interview.md

Title: S04 — Console operator interview

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operator (x1) — 5 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

45 min, ops cell. Subject is comfortable with the "fused sensors disagree" case being a normal state, not an exception. She explicitly asked for a dedicated reconciliation view — said the current implementation buries disagreement under a banner that's easy to miss. She wants to see each sensor's contribution side-by-side with its basis.

On classifier confidence: similar to [S02], wants the basis, not the number. Said she'd accept a *lower* nominal confidence if she could see *why* it's low.

Non-obvious thread: she said she trusts "three weak agreements" more than "one strong agreement." Counterintuitive but consistent — if radar weakly says yes, RF weakly says yes, and EO weakly says yes, that's three independent failure modes that all have to be wrong simultaneously. A single strong radar return could be a single sensor glitch.

---

## Verbatim quotes

Operator: "Disagreement isn't an exception. It's half my alerts. Make it a real view, not a banner."

Operator: "Tell me a lower confidence number if you can tell me why. That I can work with."

Operator: "Three sensors weakly agreeing is harder to fake than one sensor strongly insisting. Give me the three."

<!-- link references -->
[S02]: /Operator-console/Field-notes/S02-Console-operator-interview

Page 29 — S05 — Console operator interview

File: Operator-console/Field-notes/S05-Console-operator-interview.md

Title: S05 — Console operator interview

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operator (x1) — 12 yrs exp, Site Bravo
- **User group:** Operators

---

## Raw notes

55 min, post-shift. Subject is one of the longer-tenured operators. Spoke at length about alert fatigue on night shifts — said the night bird-strike window (roughly 0500-0700 at Site Bravo) generates 4-6× the alert volume of an off-season day shift, and that fatigue is the single biggest threat to decision quality.

On EO reliance: same pattern as [S01]/[S03] — always confirms on camera before believing radar. Said this isn't paranoia, it's experience: radar has been wrong often enough that he won't act without the EO.

On handover: said he's developed a small notebook of site-specific false-positive sources he's learned over the years. The notebook stays with him. Subject said he'd happily put it into the system if it'd carry across shifts and across sites, but currently there's nowhere for it to go.

---

## Verbatim quotes

Operator: "The 0500-to-0700 window I get five times the alerts of a day shift. By 0700 my hit rate is rubbish."

Operator: "Twelve years and I still always go to the camera. The radar is wrong often enough that I won't act without the feed."

Operator: "I have a notebook. Heli-pad 0600 return. Tree line at the southeast corner gives an RF artefact in wet weather. None of that is in the system because there's nowhere for it to go."

<!-- link references -->
[S01]: /Operator-console/Field-notes/S01-Console-operator-interview
[S03]: /Operator-console/Field-notes/S03-Console-operator-interview

Page 30 — S06 — Console operator interview

File: Operator-console/Field-notes/S06-Console-operator-interview.md

Title: S06 — Console operator interview

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operator (x1) — 7 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

40 min, ops cell. Tight interview. Subject's strongest theme was context-switching: he counted the cursor moves between vendor systems on a typical alert and got to seven. He said the cursor distance is the friction he most viscerally feels — physically moving the mouse between three monitors during the engagement window.

On sensor disagreement: said the harder problem is not single-sensor detection (which he thinks is largely solved) but reconciliation when sensors contradict. Wants the console to present disagreement as a primary state, with the basis for each sensor's reading laid out for comparison.

Agreed with [S04] about preferring weak fused agreement over strong single-sensor agreement.

---

## Verbatim quotes

Operator: "Seven cursor moves on a normal alert. That's where my time goes."

Operator: "Single-sensor is fine. The hard part is when they fight. There's no tool for that fight."

Operator: "I'd trust three of them weakly agreeing more than one of them shouting. Three weak agreements is hard to fake."

<!-- link references -->
[S04]: /Operator-console/Field-notes/S04-Console-operator-interview

Page 31 — S07 — Console operator interview

File: Operator-console/Field-notes/S07-Console-operator-interview.md

Title: S07 — Console operator interview

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operator (x1) — 9 yrs exp, Site Bravo
- **User group:** Operators

---

## Raw notes

50 min. Subject focused on the commander-acknowledgement gap. Confirmed [S03]'s finding: when the commander is on the radio actively listening, he's measurably slower. Self-reported about 20-25 seconds slower per decision. He said it's not because the commander is critical — it's because he's narrating, and narration is a different cognitive task from deciding.

On cross-shift handover: subject is one of the operators who's been at Site Bravo long enough to know the site-specific false-positive sources. He said the night-shift handover is the worst — the day-shift operator clocks out at 1900 and he comes on at 1900, and there's a 5-minute verbal pass-down that loses 80% of the day's context.

On EO reliance: same pattern. Always confirms on EO before acting.

---

## Verbatim quotes

Operator: "When command's on the line I'm narrating, not deciding. That's twenty-five seconds I don't get back."

Operator: "Five minutes of handover. Eight hours of someone else's context. The maths doesn't work."

Operator: "I go to the camera every time. Every. Time."

<!-- link references -->
[S03]: /Operator-console/Field-notes/S03-Console-operator-interview

Page 32 — S08 — Console operator interview

File: Operator-console/Field-notes/S08-Console-operator-interview.md

Title: S08 — Console operator interview

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operator (x1) — 11 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

60 min, longer interview. Subject is a vocal critic of the current toolchain. Strongest quote of the round (captured below). Themes hit: classifier-confidence opacity, sensor disagreement, context-switching, fused-sensor preference, commander acknowledgement invisibility.

On classifier confidence specifically: subject said a number without basis is "an opinion the system has, not evidence." He needs the sensor-level breakdown. The 87% example below is verbatim from his standard response when asked about the classifier display.

On sensor disagreement: matches [S04] and [S06]. Wants a dedicated reconciliation view as a first-class state.

On commander acknowledgement: matches [S03] and [S07].

---

## Verbatim quotes

Operator: "The classifier says 87%. Fine. But 87% of what? Until I see the EO feed I'm not moving. And by then the soft-kill window is half gone."

Operator: "A confidence number with no basis is the system's opinion. I want evidence."

Operator: "When radar and RF disagree I want a screen for that disagreement, not a banner I have to notice."

Operator: "Is the commander listening or not? My screen doesn't know."

<!-- link references -->
[S03]: /Operator-console/Field-notes/S03-Console-operator-interview
[S04]: /Operator-console/Field-notes/S04-Console-operator-interview
[S06]: /Operator-console/Field-notes/S06-Console-operator-interview
[S07]: /Operator-console/Field-notes/S07-Console-operator-interview

Page 33 — S09 — Console operator interview

File: Operator-console/Field-notes/S09-Console-operator-interview.md

Title: S09 — Console operator interview

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operator (x1) — 4 yrs exp, Site Bravo
- **User group:** Operators

---

## Raw notes

45 min, ops cell. Newer operator. Focused on engagement-decision logging and commander acknowledgement.

On logging: said he tries to log in-flight but typically can't finish the form before the next thing demands attention. He estimates he completes maybe 30% of his logs during the engagement; the rest he reconstructs at the end of shift from memory and radio transcripts. Knows this is bad for audit quality. Doesn't see a way around it without a lighter logging mechanism.

On commander acknowledgement latency: said he's hesitant to act on soft-kill until he's heard the acknowledgement. He's been on engagements where the acknowledgement landed 90-120s after his radio call, during which the soft-kill window closed and the engagement went kinetic.

On auditability: said he wants his decisions defensible. He worries that post-hoc reconstruction loses the *uncertainty* he felt at decision time — that the log makes him look more confident than he was.

---

## Verbatim quotes

Operator: "I get maybe a third of the log done in-flight. The rest is me at the end of the shift trying to remember what I was thinking at 0612."

Operator: "I've had ninety seconds go by waiting for ack. That's a soft-kill window gone."

Operator: "When I reconstruct, I sound more certain than I was. The log is wrong about my confidence."

Page 34 — S10 — Console operator interview

File: Operator-console/Field-notes/S10-Console-operator-interview.md

Title: S10 — Console operator interview

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operator (x1) — 6 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

40 min. Subject's emphasis was on classifier *basis* and sensor disagreement. Echoed [S02] and [S08] on opacity of the confidence score. Echoed [S04] and [S06] on disagreement being a first-class state. Also confirmed the non-obvious "prefer three weak agreements over one strong" pattern.

Less developed thread on personal heuristics: said she keeps mental notes on which alert times tend to be false-positive heavy (early morning at Site Alpha, mid-afternoon in summer when bird activity spikes near the south boundary). None of these are captured in the system.

---

## Verbatim quotes

Operator: "Show me which sensor said what. The number alone is meaningless."

Operator: "Disagreement is half the alerts. Don't make me click through a banner to deal with the most common case."

Operator: "I trust three sensors weakly agreeing more than one shouting. The shouting one might be having a bad day."

<!-- link references -->
[S02]: /Operator-console/Field-notes/S02-Console-operator-interview
[S04]: /Operator-console/Field-notes/S04-Console-operator-interview
[S06]: /Operator-console/Field-notes/S06-Console-operator-interview
[S08]: /Operator-console/Field-notes/S08-Console-operator-interview

Page 35 — S11 — Console operator interview

File: Operator-console/Field-notes/S11-Console-operator-interview.md

Title: S11 — Console operator interview

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operator (x1) — 9 yrs exp, Site Bravo
- **User group:** Operators

---

## Raw notes

50 min, post-shift. Subject's focus was on auditable rationale and handover. He keeps a personal end-of-shift note where he summarises the shift for himself; he then uses that note to brief the next operator verbally. The note stays with him; it doesn't go into the system.

On engagement logging: subject completes most of his logs post-hoc and acknowledges the quality is lower than it should be. He pointed out that the form requires re-entering information that the system already had on screen at decision time — bearing, classification, sensors triggered — which he finds particularly frustrating.

On EO reliance: same as the other long-tenured operators. Always confirms on EO.

On handover: same as [S07]. The 5-minute verbal pass-down doesn't carry the day's actual context.

---

## Verbatim quotes

Operator: "I write a shift summary for myself. I read it to the next operator. None of that is in the system."

Operator: "The form asks me for things that were on my screen sixty seconds ago. Just capture the screen."

Operator: "I want to defend the decision later. Right now what I have is what I remember."

<!-- link references -->
[S07]: /Operator-console/Field-notes/S07-Console-operator-interview

Page 36 — S12 — Console operator interview

File: Operator-console/Field-notes/S12-Console-operator-interview.md

Title: S12 — Console operator interview

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operator (x1) — 5 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

35 min. Shortest of the operator interviews. Subject is mid-career, less talkative. Confirmed multi-sensor disagreement as the dominant friction. Said his typical alert response is bottlenecked at the "wait for the camera to slew, then decide" moment, which itself is bottlenecked at having opened the radar and RF views first.

Echoed the disagreement-as-first-class-state preference from [S04], [S06], [S08], [S10]. Did not have strong views on logging or handover — said those weren't his pain points.

---

## Verbatim quotes

Operator: "The hard part is when they don't agree. There's no tool. I'm guessing."

Operator: "By the time the camera has slewed I've already opened two other things to get to it."

<!-- link references -->
[S04]: /Operator-console/Field-notes/S04-Console-operator-interview
[S06]: /Operator-console/Field-notes/S06-Console-operator-interview
[S08]: /Operator-console/Field-notes/S08-Console-operator-interview
[S10]: /Operator-console/Field-notes/S10-Console-operator-interview

Page 37 — WT01 — Console paper-prototype walk-through

File: Operator-console/Field-notes/WT01-Console-paper-prototype-walk-through.md

Title: WT01 — Console paper-prototype walk-through

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operators (x3)
- **User group:** Operators

---

## Raw notes

Walk-through of the v0 paper prototype of the unified console with three operators (mixed experience: 4, 8, 12 yrs). 90 min in a conference room with printed screens taped to a wall. Focus of this session: the engagement-decision logging interaction.

All three operators reacted positively to capturing the console state automatically at decision-time. Strong preference for 1-2 click logging over the current multi-screen form. The 12-yr operator pushed back on free-text rationale — "if you make me type, I won't log" — and proposed structured one-tap rationale chips ("EO confirmed", "fused-low-conf majority agree", "site-specific FP pattern"). Other two operators agreed.

Open question: whether operators want any free-text addition at all. Two said no; one said yes but only as a post-engagement augmentation, not a blocker on the decision log.

---

## Verbatim quotes

Operator (12 yrs): "If you make me type, I won't log. Give me chips."

Operator (8 yrs): "One tap, two taps, that's it. Anything heavier and you've lost me."

Operator (4 yrs): "Maybe a free-text field, but after the decision, not before."

Page 38 — WT02 — Reconciliation view walk-through

File: Operator-console/Field-notes/WT02-Reconciliation-view-walk-through.md

Title: WT02 — Reconciliation view walk-through

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operators (x4)
- **User group:** Operators

---

## Raw notes

Walk-through of three candidate reconciliation views with four operators. 90 min. Variants tested:

1. **Banner on main view** — current incumbent. Operators rejected this as "the thing we already have that doesn't work."
2. **Inline reconciliation panel** — sensor breakdown appears in the right rail when disagreement above threshold. All four preferred this to the banner.
3. **Dedicated reconciliation modal** — full-screen takeover when triggered. Two operators preferred this for high-stakes; two thought it was disruptive for the routine case.

Strong consensus that disagreement is a first-class state — operators want a real view, not a notification on top of the main view. Disagreement on whether the reconciliation surface should be inline (always available) or modal (only when triggered).

---

## Verbatim quotes

Operator: "Banner is the thing we have now. Don't show me a banner."

Operator: "I want a real screen for it. Not a tag, not a popup, a real screen."

Operator: "Full takeover is fine for the big calls. Don't take over my screen for a heron."

Page 39 — WT03 — Site-context surfacing walk-through

File: Operator-console/Field-notes/WT03-Site-context-surfacing-walk-through.md

Title: WT03 — Site-context surfacing walk-through

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operators (x4)
- **User group:** Operators

---

## Raw notes

Walk-through of two candidate patterns for surfacing site-specific false-positive context. 75 min. Variants tested:

1. **Active prompt at start-of-shift** — operator sees a list of "known false-positive sources at this site" on session start. Has to dismiss to proceed.
2. **Passive side panel** — same list lives in a collapsible right-rail panel; operator opens when they want.

Two operators preferred active prompt: "I want it pushed into my face on day one at a new site." Two preferred passive: "After a year I know my site; the prompt becomes noise." Both groups agreed the *content* of the list (site-specific FP patterns with timestamps and previous-operator notes) is valuable.

Also tested whether operators would log new false-positive sources during their shift if doing so was a single-tap action from the alert. All four said yes. The friction is the current multi-screen form, not the willingness.

---

## Verbatim quotes

Operator: "Day one at a new site, push it into my face. Day three hundred, get out of my way."

Operator: "If logging a new false-positive is one tap I'll do it ten times a shift. If it's a form, never."

Operator: "Show me what the operator before me figured out. Don't make me re-figure it."

Page 40 — WT04 — Commander acknowledgement walk-through

File: Operator-console/Field-notes/WT04-Commander-acknowledgement-walk-through.md

Title: WT04 — Commander acknowledgement walk-through

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Console operators (x4)
- **User group:** Operators

---

## Raw notes

Walk-through of two patterns for surfacing commander acknowledgement state on the operator screen. 60 min. Variants tested:

1. **Inline indicator** — acknowledgement state lives in the primary view next to the engagement option being requested. Status updates in real time.
2. **Peripheral indicator** — top-of-screen status bar with acknowledgement state alongside other system state (sensor health, classifier version, etc.).

Operators split exactly evenly: two preferred inline (more attention to the state they're actively waiting on), two preferred peripheral (less distraction from the alert response itself). Both groups agreed the *absence* of acknowledgement-state visibility on the current setup is the worst case.

No decisive preference emerged — recorded as open question for Console v1 spec.

---

## Verbatim quotes

Operator: "Put it where I'm looking. I'm staring at the engagement option, that's where the state should be."

Operator: "Inline pulls my eye when I want to focus on the alert. Top bar is fine."

Operator: "Either is better than what we have. Right now I just don't know."

Page 41 — Field Alpha 1 — Site Alpha day shift

File: Operator-console/Field-notes/Field-Alpha-1-Site-Alpha-day-shift.md

Title: Field Alpha 1 — Site Alpha day shift

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Researcher (x1, observing); Console operator (x1, observed)
- **User group:** Operators

---

## Raw notes

Full day shift, Site Alpha, 0700-1900. Observed three alert responses end-to-end, plus eleven sub-threshold detections that the operator triaged without escalating.

Every alert response involved at least three context switches between vendor systems. Counted cursor moves on the second observed alert: nine moves, two of which were across monitors. Operator was visibly task-switching — paused mid-action twice to remind herself which window had which sensor view.

Two of the three alerts involved sensor disagreement. In both cases the operator opened the EO feed before deciding. In both cases the operator's final decision aligned with the EO read, not the radar classification.

Engagement-decision logging: operator attempted in-flight logging on the first alert, gave up after the next alert came in. The other two were logged post-hoc at end of shift.

No false-positive context-sharing observed. Operator referenced her own mental knowledge of the site's recurring false-positive sources (heli-pad 0600, tree line at SE corner during wet weather) — none of these were in the system.

---

## Verbatim quotes

Operator (mid-alert, to herself): "Was that RF window the left or the right monitor."

Operator (post-alert): "I tried to log it. I got two fields in. Then the next one came in and I lost it."

Operator (end of shift): "I'll do the logs now. From memory."

Page 42 — Field Alpha 2 — Site Alpha night shift

File: Operator-console/Field-notes/Field-Alpha-2-Site-Alpha-night-shift.md

Title: Field Alpha 2 — Site Alpha night shift

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Researcher (x1, observing); Console operator (x1, observed)
- **User group:** Operators

---

## Raw notes

Full night shift, Site Alpha, 1900-0700. Bird activity peaks fell in the 0500-0700 window, matching prior reports. Observed alert volume tripled during that window relative to the rest of the shift.

By 0600, operator was showing visible fatigue signs — slower head turns to confirm EO, longer pauses before classifying. Self-reported at end of shift that his decision confidence in the last two hours of the shift is "noticeably worse" than the first two.

Counted context switches: every single observed alert involved at least three vendor-system context switches. No alerts were resolved on a single screen.

Engagement-decision logging: zero in-flight logs completed during the high-volume window. Operator logged all post-shift, took 45 minutes, openly described the rationale he was reconstructing as "best guess at what I thought."

---

## Verbatim quotes

Operator (mid-shift): "Three windows, every time. I've done this thirty times tonight."

Operator (0540): "Bird, bird, bird. They're going to keep coming for the next two hours."

Operator (end of shift, doing logs): "I'm guessing at what I was thinking three hours ago. This isn't a log, this is fiction."

Page 43 — Field Bravo 1 — Site Bravo day shift

File: Operator-console/Field-notes/Field-Bravo-1-Site-Bravo-day-shift.md

Title: Field Bravo 1 — Site Bravo day shift

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Researcher (x1, observing); Console operator (x1, observed)
- **User group:** Operators

---

## Raw notes

Full day shift, Site Bravo, 0700-1900. Five alert responses observed.

Shift began with a 4-minute verbal handover from the night-shift operator. Researcher noted that the handover covered the past hour's activity but did not transmit the site-specific false-positive context the night-shift operator had learned (Site Bravo has a recurring RF artefact near the southeast tree line that activates in wet weather — discussed in prior interviews with this operator but not mentioned during the handover).

All five alerts involved vendor-system context switching. The third alert involved an operator-internal reconciliation when radar and RF disagreed — operator opened the EO feed, watched for ~40s, classified as bird.

Commander acknowledgement latency observed on one alert: operator radioed at 1043, acknowledgement landed at 1044:51, a 71-second gap during which the operator was unable to act on soft-kill. By the time acknowledgement landed the kinetic option was the only remaining viable response.

---

## Verbatim quotes

Operator (during handover): "Anything I should know?"

Off-going operator: "Quiet shift. Nothing weird."

Operator (mid-alert, post-radio): "Did she hear me. I'm going to call again."

Page 44 — Field Bravo 2 — Site Bravo night shift

File: Operator-console/Field-notes/Field-Bravo-2-Site-Bravo-night-shift.md

Title: Field Bravo 2 — Site Bravo night shift

Parent: Operator-console/Field-notes.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Field-notes](/Operator-console/Field-notes)

- **Participants:** Researcher (x1, observing); Console operator (x1, observed)
- **User group:** Operators

---

## Raw notes

Full night shift, Site Bravo, 1900-0700. Same bird-activity pattern as Site Alpha night shift: alert volume tripled in the 0500-0700 window.

Two engagement-class alerts observed during the high-volume window. Both involved sensor disagreement; both were resolved by the operator opening the EO feed and overriding the radar classification.

Engagement-decision logging: operator attempted in-flight logs on both engagement-class alerts, completed neither. Reconstructed both at end of shift.

Cross-shift handover: pre-shift handover from day-shift operator was 6 minutes and reasonably thorough on the day's activity, but did not include any site-specific FP context. The operator on this shift was a 4-year operator new to Site Bravo (rotated from Site Alpha three weeks prior) — researcher noted he was visibly re-discovering several site-specific patterns the day-shift operator clearly already knew.

---

## Verbatim quotes

Operator (during handover): "I keep getting an RF signal near the SE corner. Is that a thing?"

Off-going operator: "Yeah, that's a thing. Wet weather."

Operator (later, mid-alert): "Wait, is this the SE corner thing? I think this is the SE corner thing."

Operator (end of shift): "Three weeks here and I'm still figuring out what's a real alert at this site."

Page 45 — Counter-drone-systems (prior-knowledge artefact)

File: Programme-wide/Prior-knowledge/Counter-drone-systems.md

Title: Counter-drone-systems

Parent: Programme-wide/Prior-knowledge.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide) › [Prior-knowledge](/Programme-wide/Prior-knowledge)

# Counter-drone systems — prior knowledge summary

A summary of what's already known across past programmes about counter-UAS systems and the operator workflows they support.

## Recurring patterns

- **Operators trust visual confirmation more than classifier confidence.** Across SHIELDWATCH (2023) and AEGIS-LITE (2024), operator after-action reports consistently cited "I looked at the camera feed before believing the radar return." Even when the classifier confidence was >90%, operators reached for the EO feed before escalating.
- **Multi-sensor disagreement is the dominant friction.** Single-sensor detection is largely solved at the algorithm level. The hard problem is what to do when radar says "small UAS, low altitude" and RF says "no UAS signature detected" — current systems present both readings and leave the operator to reconcile.
- **False-positive load on night shifts is materially higher.** Bird-strike season generates 3-5× the alert volume of off-season shifts. Operators on the OWLEYE programme described developing personal heuristics ("I just ignore anything below 80m near the lake") that worked for them but were never captured by the system.

## Unresolved questions

- Are operators' personal heuristics about false-positive sources transferable across sites, or are they site-specific? OWLEYE concluded they were largely site-specific; SHIELDWATCH suggested some generalised.
- How much classifier *explanation* (versus classifier *confidence*) does an operator actually need to act? Hard to disentangle in past data because confidence and explanation were always presented together.
- What's the right level of commander oversight? AEGIS-LITE found commanders wanted more visibility; operators found that visibility increased their hesitation. No resolution.

## Adjacent work

- **OWLEYE (2022-2024)** — counter-UAS at maritime sites. Heavier emphasis on RF detection due to over-water radar limitations. Lessons about RF false-positives from civilian maritime traffic.
- **SHIELDWATCH (2023)** — counter-UAS at fixed land sites. Closest analog to SKYPROTECT's use case. Their final report cited "alert fatigue on night shifts" as the unresolved issue going into SKYPROTECT.
- **AEGIS-LITE (2024)** — pilot for unified C2 view across multiple counter-UAS sites. Concluded that fusion was valuable but the implementation was too brittle to scale. SKYPROTECT is in part a re-attempt at unified C2 with better-engineered fusion.

## Sources

- SHIELDWATCH after-action report (SHIELDWATCH programme KB, "Lessons learned 2023")
- OWLEYE final synthesis (OWLEYE programme KB, "Programme close-out 2024")
- AEGIS-LITE pilot writeup (AEGIS-LITE programme KB, "Pilot report Q3 2024")
- Internal operator-fatigue study (Human-Factors programme KB, "Night shift alert load 2024")

Page 46 — Research-synthesis (programme-wide synthesis)

File: Programme-wide/Research-synthesis.md

Title: Research-synthesis

Parent: Programme-wide.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide)

# Research synthesis — Programme-wide

**Outcome question:** What is the workflow change that would let air-defence operators move from multi-sensor alert to engagement decision quickly enough for soft-kill measures to remain the primary response?

**Sources:**
- Interview sessions [S01]-[S12] (operators, mixed sites, Mar-Apr)
- Interview sessions [S13]-[S16] (commanders, central operations room)
- Field observation notes — Site Alpha, 3 shifts
- Field observation notes — Site Bravo, 2 shifts
- SHIELDWATCH and AEGIS-LITE prior-programme writeups

## Themes

- **Operators trust their eyes more than the classifier.** Every session-level operator described falling back to the EO feed before believing a radar-derived classification. *Evidence: [S01], [S03], [S05], [S07], [S09], [S11].*
- **"Why" data matters more than "what" data.** Operators repeatedly asked for the basis of a classification — which sensor saw what, with what confidence — rather than just the classification label itself. *Evidence: [S02], [S04], [S08], [S10].*
- **Multi-sensor disagreement is the harder problem.** Single-sensor detection is largely fine; reconciling contradictions across radar / RF / EO is where time is lost. *Evidence: [S01], [S06], [S08], [S12]; [Field Alpha 2].*
- **Cross-shift handover loses context the system doesn't capture.** Each shift inherits the previous shift's situational picture verbally. Operators described re-discovering known false-positive sources (e.g. "the heli pad at Site Charlie always gives a return at 0600") shift after shift. *Evidence: [S02], [S05], [S11]; [Field Bravo 1], [Field Bravo 2].*
- **Commander oversight increases hesitation.** When commanders are actively watching the operator's screen, operators slow down by an average of ~20s per decision (self-reported). *Evidence: [S03], [S07]; [S13], [S15].*

## Friction points

| Friction | Severity (1-5) | Frequency | Type | Evidence |
|---|---|---|---|---|
| Multi-sensor contradiction with no in-system reconciliation tool | 5 | Observed in 9 of 12 operator sessions | Design / systemic | [S01], [S06], [S08], [S12] |
| Commander acknowledgement latency stretching engagement window | 5 | Observed in 7 of 12 sessions; both commander sessions confirmed | Systemic | [S03], [S07], [S09], [S13], [S15] |
| Night-shift alert fatigue from bird returns and civilian drones | 4 | All 4 night-shift observations | Design / training | [Field Alpha 2], [Field Bravo 2] |
| Lost context across shift handover | 4 | 11 of 12 sessions referenced it unprompted | Systemic | [S02], [S05], [S07], [S08], [S11] |
| Classifier "confidence" presented without basis ("why") | 3 | 8 of 12 sessions | Design | [S02], [S04], [S08], [S10] |
| Operator personal heuristics never captured in the tool | 3 | All sessions | Design | All |
| Vendor-system context-switching during a single alert | 5 | Every observed alert response | Design / systemic | [Field Alpha 1], [Field Alpha 2], [Field Bravo 1], [Field Bravo 2] |

## Problem statement

> Air-defence operators monitoring multi-sensor feeds for unauthorised UAS activity cannot move quickly enough from alert to engagement decision because the current toolchain forces them to manually reconcile contradictions across three separate vendor systems while explaining their reasoning to commanders who are looking at different screens. The result is escalation latency that reduces the window for soft-kill measures and increases reliance on kinetic options.

**Alternatives considered:**
- *Frame as a classifier-accuracy problem* — rejected. Classifier accuracy is acceptable; the friction is reconciliation and explanation, not raw accuracy.
- *Frame as a commander-oversight problem* — partially correct, but addressing only the commander side misses the operator-side reconciliation friction that creates most of the time loss.

## Success criteria

- **Median alert-to-engagement-decision time** reduced from current baseline (measured 4-7 minutes across observed sessions) to **under 90 seconds for high-confidence threats**. Measured at operator desks via DASH 2.0 post-iteration prototype surveys.
- **80% of operator engagement decisions reference fused-sensor evidence** rather than single-sensor evidence. Measured via in-session decision logging.
- **Commander acknowledgement latency** reduced from current baseline (60-180s observed) to **under 30 seconds** for routine acknowledgement; commander deliberation time excluded from this metric.
- **False-positive rate at the operator desk** reduced by 50% relative to current baseline, through fusion-aware classification confidence (the classifier shows lower confidence when sensors disagree, not just averaged confidence).

## Open questions

- Should the cross-shift handover problem be solved inside SKYPROTECT (a structured handover artefact) or treated as outside scope (training / SOPs)?
- Are operators willing to log their personal heuristics into the system if it means a future operator on a different site sees them? Worth a follow-up round of interviews.
- Is the "commander oversight increases hesitation" finding stable across different commander-operator pair familiarities, or only present with newer pairings?

<!-- link references -->
[S01]: /Operator-console/Field-notes/S01-Console-operator-interview
[S02]: /Operator-console/Field-notes/S02-Console-operator-interview
[S03]: /Operator-console/Field-notes/S03-Console-operator-interview
[S04]: /Operator-console/Field-notes/S04-Console-operator-interview
[S05]: /Operator-console/Field-notes/S05-Console-operator-interview
[S06]: /Operator-console/Field-notes/S06-Console-operator-interview
[S07]: /Operator-console/Field-notes/S07-Console-operator-interview
[S08]: /Operator-console/Field-notes/S08-Console-operator-interview
[S09]: /Operator-console/Field-notes/S09-Console-operator-interview
[S10]: /Operator-console/Field-notes/S10-Console-operator-interview
[S11]: /Operator-console/Field-notes/S11-Console-operator-interview
[S12]: /Operator-console/Field-notes/S12-Console-operator-interview
[S13]: /Programme-wide/Field-notes/S13-Air-defence-commander-interview
[S15]: /Programme-wide/Field-notes/S15-Air-defence-commander-interview
[S16]: /Programme-wide/Field-notes/S16-Air-defence-commander-interview
[Field Alpha 1]: /Operator-console/Field-notes/Field-Alpha-1-Site-Alpha-day-shift
[Field Alpha 2]: /Operator-console/Field-notes/Field-Alpha-2-Site-Alpha-night-shift
[Field Bravo 1]: /Operator-console/Field-notes/Field-Bravo-1-Site-Bravo-day-shift
[Field Bravo 2]: /Operator-console/Field-notes/Field-Bravo-2-Site-Bravo-night-shift

Page 47 — Air-defence-commander (programme-wide persona)

File: Programme-wide/Personas/Air-defence-commander.md

Title: Air-defence-commander

Parent: Programme-wide/Personas.md

Content:

[Knowledge Base](/home) › [Programme-wide](/Programme-wide) › [Personas](/Programme-wide/Personas)

# Air-defence commander

- **Summary:** Senior officer responsible for engagement authorisation across 3-5 fixed sites simultaneously from a central operations room. Final decision-maker on response options.

- **Goals (4):**
  - Maintain a coherent threat picture across all sites under their command — *evidence: [S13], [S15].*
  - Authorise engagement quickly enough to keep soft-kill measures viable — *evidence: [S13], [S14], [S15], [S16].*
  - Stay confident in the decision afterwards (auditable rationale) — *evidence: [S15], [S16].*
  - Avoid disrupting operator focus during active alerts — *evidence: [S13], [S15].*

- **Pains (4):**
  - Cannot see what the operator is seeing without explicitly asking — *evidence: [S13], [S15].*
  - Acknowledgement workflow is too heavy for routine cases, too light for high-stakes ones (no differentiation) — *evidence: [S14], [S16].*
  - Multi-site picture currently requires switching between site-specific dashboards manually — *evidence: [S13], [S15].*
  - Reasoning behind classifier confidence is opaque, so they ask the operator to explain — adding 20-60s per decision — *evidence: [S15].*

- **Context:** Works from a central operations room at the regional defence HQ, overseeing operators distributed across protected sites. Typically a senior officer (Lt Col equivalent or above) with 15+ years' experience. On duty in 8-hour shifts; usually 1-2 active alerts per shift requiring authorisation.

- **Real quote:** *"My job in those 30 seconds isn't to second-guess them — it's to confirm I'd make the same call if I were sitting there. But to do that, I need to see what they're seeing, and right now I don't."* — [S15].

- **Non-obvious trait:** Commanders prefer *less* automated assistance for themselves than for operators. Where operators welcome classifier explanations and fusion confidence scores, commanders explicitly said they want to see the *raw operator reasoning*, not an additional layer of system-generated context. Quote from [S16]: *"If the system pre-digests it for me, I lose the read on what the operator is actually thinking."*

- **Evidence sources:** [S13] (interview), [S14] (interview), [S15] (interview, primary), [S16] (interview).

<!-- link references -->
[S13]: /Programme-wide/Field-notes/S13-Air-defence-commander-interview
[S14]: /Programme-wide/Field-notes/S14-Air-defence-commander-interview
[S15]: /Programme-wide/Field-notes/S15-Air-defence-commander-interview
[S16]: /Programme-wide/Field-notes/S16-Air-defence-commander-interview

Page 48 — Research-synthesis (Operator-console track synthesis)

File: Operator-console/Research-synthesis.md

Title: Research-synthesis

Parent: Operator-console.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console)

# Research synthesis — Operator-console track

**Outcome question:** What console interactions would let an operator move from a multi-sensor alert to a high-confidence engagement decision in under 90 seconds without sacrificing decision auditability?

**Sources:**
- Interview sessions [S01]-[S12] (operators)
- Field observation notes — Site Alpha (3 shifts), Site Bravo (2 shifts)
- Console mock walk-through sessions [WT01]-[WT04] (with operators reacting to paper prototypes)
- Programme-wide Research-synthesis (inherited as foundation)

## Themes

- **Operators want a "single screen" they can stay on through an entire engagement.** Context-switching between sensor views is the most consistently named friction. *Evidence: [S01], [S03], [S05], [S06], [S08], [S11]; [Field Alpha 1], [Field Alpha 2].*
- **Sensor-disagreement is a first-class console state, not an exception.** When sensors disagree, operators want a dedicated reconciliation view, not a banner on the main display. *Evidence: [S04], [S08], [S10]; [WT02], [WT03].*
- **Operators want the console to surface previously-noted false-positive sources for the current site.** "If someone before me flagged that the heli pad gives 0600 returns, show me." *Evidence: [S02], [S05], [S07].*
- **Engagement-decision logging needs to be 1-2 clicks, not a form.** Operators currently avoid logging mid-engagement because the form is too heavy; rationale gets reconstructed afterwards from memory. *Evidence: [S03], [S09], [S11]; [WT01].*

## Friction points

| Friction | Severity (1-5) | Frequency | Type | Evidence |
|---|---|---|---|---|
| Context-switch between sensor vendor views during a single alert | 5 | Every observed alert response | Design / systemic | [Field Alpha 1], [Field Alpha 2], [Field Bravo 1], [Field Bravo 2] |
| Reconciliation of contradicting sensors has no dedicated tool | 5 | 9 of 12 sessions | Design | [S01], [S04], [S06], [S08], [S10], [S12] |
| Engagement-decision logging is too heavy to complete in-flight | 4 | 8 of 12 sessions; observed in all field shifts | Design | [S03], [S09], [S11]; Field all |
| Site-specific false-positive context is lost between shifts | 4 | 11 of 12 sessions | Systemic | [S02], [S05], [S07], [S08], [S11] |
| Commander-acknowledgement state not visible on operator screen | 3 | 6 of 12 sessions | Design | [S03], [S07], [S09], [S15] |
| Classifier confidence shown without sensor-level basis | 3 | 8 of 12 sessions | Design | [S02], [S04], [S08], [S10] |

## Problem statement

> Operators using the current toolchain cannot complete an alert-to-engagement workflow on a single screen because each sensor type lives in a separate vendor system. Reconciling contradicting sensors, logging the decision rationale, and acknowledging commander oversight all happen in different places — adding time, fragmenting attention, and producing post-hoc rationale rather than in-flight reasoning. A unified operator console that treats fusion, reconciliation, and logging as first-class console states (not exceptions) is the path forward.

**Alternatives considered:**
- *Improve the existing three-vendor toolchain via integration layers* — rejected. Operator interviews and prior-programme writeups (AEGIS-LITE) suggest integration patches don't address the fundamental attention fragmentation.

## Success criteria

- **Median alert-to-engagement-decision time** on the new console is under 90 seconds for high-confidence threats. Measured via DASH 2.0 prototype surveys after each iteration.
- **100% of operator decisions** are logged in-flight (during the engagement, not reconstructed afterwards). Measured via console telemetry.
- **80% of operators** report (DASH survey) that the console gives them everything they need on one screen for ≥90% of alerts.
- **Reconciliation view used in ≥60% of contradicting-sensor alerts** during evaluation. Measured via console telemetry.

## Open questions

- Should commander-acknowledgement state appear inline in the operator's primary view, or as a peripheral indicator? Operators split roughly evenly in [WT04].
- Is site-specific false-positive context something the console should *suggest* (passive) or *prompt* (active) at start-of-shift? Both modes tested in [WT03]; no clear winner.

<!-- link references -->
[S01]: /Operator-console/Field-notes/S01-Console-operator-interview
[S02]: /Operator-console/Field-notes/S02-Console-operator-interview
[S03]: /Operator-console/Field-notes/S03-Console-operator-interview
[S04]: /Operator-console/Field-notes/S04-Console-operator-interview
[S05]: /Operator-console/Field-notes/S05-Console-operator-interview
[S06]: /Operator-console/Field-notes/S06-Console-operator-interview
[S07]: /Operator-console/Field-notes/S07-Console-operator-interview
[S08]: /Operator-console/Field-notes/S08-Console-operator-interview
[S09]: /Operator-console/Field-notes/S09-Console-operator-interview
[S10]: /Operator-console/Field-notes/S10-Console-operator-interview
[S11]: /Operator-console/Field-notes/S11-Console-operator-interview
[S12]: /Operator-console/Field-notes/S12-Console-operator-interview
[S15]: /Programme-wide/Field-notes/S15-Air-defence-commander-interview
[WT01]: /Operator-console/Field-notes/WT01-Console-paper-prototype-walk-through
[WT02]: /Operator-console/Field-notes/WT02-Reconciliation-view-walk-through
[WT03]: /Operator-console/Field-notes/WT03-Site-context-surfacing-walk-through
[WT04]: /Operator-console/Field-notes/WT04-Commander-acknowledgement-walk-through
[Field Alpha 1]: /Operator-console/Field-notes/Field-Alpha-1-Site-Alpha-day-shift
[Field Alpha 2]: /Operator-console/Field-notes/Field-Alpha-2-Site-Alpha-night-shift
[Field Bravo 1]: /Operator-console/Field-notes/Field-Bravo-1-Site-Bravo-day-shift
[Field Bravo 2]: /Operator-console/Field-notes/Field-Bravo-2-Site-Bravo-night-shift

Page 49 — Console-operator (track-specific persona)

File: Operator-console/Personas/Console-operator.md

Title: Console-operator

Parent: Operator-console/Personas.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Personas](/Operator-console/Personas)

# Console operator

- **Summary:** Mid-career shift-based operator (4-12 years' experience) sitting in front of the unified console for a 12-hour shift. Primary user of SKYPROTECT.

- **Goals (4):**
  - Get to a high-confidence engagement decision quickly — *evidence: [S01], [S03], [S06], [S08], [S11].*
  - Stay confident in their own decision afterwards (auditable, defensible) — *evidence: [S03], [S09], [S11].*
  - Keep alert-fatigue low across a long shift — *evidence: [S05], [S07]; [Field Alpha 2].*
  - Hand a coherent picture to the next shift — *evidence: [S02], [S05], [S08], [S11].*

- **Pains (5):**
  - Context-switching between vendor systems during an active alert — *evidence: [S01], [S06], [S08]; Field all.*
  - Sensor disagreement with no in-tool reconciliation — *evidence: [S04], [S08], [S10].*
  - Decision logging is heavy enough that they skip it mid-engagement — *evidence: [S03], [S09], [S11].*
  - Re-discovering false-positive sources each shift — *evidence: [S02], [S05], [S07].*
  - Commander acknowledgement state invisible on their screen, forcing voice check — *evidence: [S03], [S07].*

- **Context:** Works in a fixed C2 cell at a protected site, 12-hour shifts on rotation. Comfortable with multi-screen workflows but increasingly intolerant of context-switching after years of patching together vendor tools. Trusts their own eyes (EO feed) and their experience-derived heuristics over classifier confidence scores.

- **Real quote:** *"The classifier says 87%. Fine. But 87% of what? Until I see the EO feed I'm not moving. And by then the soft-kill window is half gone."* — [S08].

- **Non-obvious trait:** Console operators are *more* willing to act on a fused-sensor low-confidence signal than on a single-sensor high-confidence signal. Counterintuitive but consistent: across [S04], [S06], [S08], [S10], operators preferred "radar+RF+EO all weakly agree" to "radar strongly says yes, RF and EO silent." Their stated reason: a single sensor can be fooled; three weak agreements is harder to fake.

- **Evidence sources:** [S01], [S03], [S04], [S05], [S06], [S07], [S08], [S09], [S10], [S11]; [Field Alpha 1], [Field Alpha 2], [Field Bravo 1], [Field Bravo 2].

<!-- link references -->
[S01]: /Operator-console/Field-notes/S01-Console-operator-interview
[S02]: /Operator-console/Field-notes/S02-Console-operator-interview
[S03]: /Operator-console/Field-notes/S03-Console-operator-interview
[S04]: /Operator-console/Field-notes/S04-Console-operator-interview
[S05]: /Operator-console/Field-notes/S05-Console-operator-interview
[S06]: /Operator-console/Field-notes/S06-Console-operator-interview
[S07]: /Operator-console/Field-notes/S07-Console-operator-interview
[S08]: /Operator-console/Field-notes/S08-Console-operator-interview
[S09]: /Operator-console/Field-notes/S09-Console-operator-interview
[S10]: /Operator-console/Field-notes/S10-Console-operator-interview
[S11]: /Operator-console/Field-notes/S11-Console-operator-interview
[Field Alpha 1]: /Operator-console/Field-notes/Field-Alpha-1-Site-Alpha-day-shift
[Field Alpha 2]: /Operator-console/Field-notes/Field-Alpha-2-Site-Alpha-night-shift
[Field Bravo 1]: /Operator-console/Field-notes/Field-Bravo-1-Site-Bravo-day-shift
[Field Bravo 2]: /Operator-console/Field-notes/Field-Bravo-2-Site-Bravo-night-shift

Page 50 — Engage-incoming-threat (journey map)

File: Operator-console/Journeys/Engage-incoming-threat.md

Title: Engage-incoming-threat

Parent: Operator-console/Journeys.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Journeys](/Operator-console/Journeys)

# Journey map — Engage incoming threat (current state)

**Persona:** Console operator
**Scope:** From initial multi-sensor alert through to engagement authorisation and post-engagement logging. Current-state, three-vendor toolchain.
**Evidence base:** [Field Alpha 1], [Field Alpha 2], [Field Bravo 1], [Field Bravo 2], sessions [S01]-[S12].

## Stage 1 — Alert received

**Actions:** Operator hears alert tone, glances at radar vendor screen, notes timestamp + bearing.

**Emotion:** Alert but not yet committed. Suspicious by default (false-positive rate is high).

**Friction:**
- Alert tone is the same for low and high confidence — operator must look at the screen to triage.
- Radar screen shows only one sensor's view; operator must mentally hold the bearing while opening the next sensor view.

**Opportunity:** Pre-fused alert with confidence tier (high / medium / low) and the bearing held on a single screen.

## Stage 2 — Triage across sensors

**Actions:** Operator opens RF vendor system, looks for matching detection on bearing. If found, opens EO/IR vendor system, slews camera, confirms visually.

**Emotion:** Frustration if sensors disagree. Time pressure climbing.

**Friction:**
- Three vendor systems means two context switches and two re-enterings of bearing data.
- Sensors often disagree; no tool for reconciliation. Operator builds a mental model and lives with the uncertainty.
- 60-180s typically spent here, per field observations.

**Opportunity:** Single unified view with a dedicated reconciliation tool when sensors disagree.

## Stage 3 — Classify and decide

**Actions:** Operator forms a judgement (real threat / false positive / inconclusive). If real, decides on engagement option (soft-kill RF / kinetic escalation / monitor).

**Emotion:** Commitment moment. High cognitive load.

**Friction:**
- Classifier confidence is shown but without sensor-level basis. Operator typically discounts it.
- Personal heuristics ("the heli pad always gives false at 0600") not captured in the system — operator relies on shift experience.

**Opportunity:** Surface site-specific false-positive context proactively; show sensor-level basis for classifier confidence.

## Stage 4 — Escalate for commander acknowledgement

**Actions:** Operator radios commander, summarises situation verbally, awaits acknowledgement before acting on soft-kill.

**Emotion:** Time-anxious. Engagement window narrowing.

**Friction:**
- Acknowledgement is voice-only; no shared view between operator and commander.
- Operator describes the situation twice — once to themselves while triaging, once to the commander.
- 30-90s typically spent here.

**Opportunity:** Commander acknowledgement workflow integrated into the console; commander sees the operator's screen state.

## Stage 5 — Act and log

**Actions:** Operator executes the authorised response. After the immediate threat is resolved, opens the logging form and reconstructs the rationale.

**Emotion:** Relief, then administrative burden.

**Friction:**
- Logging form is multi-field, multi-screen — heavy enough that operators consistently complete it post-hoc, reconstructing rationale from memory.
- Information that *would* be valuable for the next shift (site-specific false-positive contexts noticed during this engagement) often doesn't make it into the log.

**Opportunity:** In-flight 1-2 click logging that captures the *sensor evidence in the operator's view at decision-time*, not a free-text reconstruction.

## Moments of truth

- **Stage 2 reconciliation** — if the operator loses confidence here, the rest of the workflow is shaky.
- **Stage 4 commander acknowledgement** — the time spent here is fully outside the operator's control and most directly affects whether soft-kill measures stay viable.
- **Stage 5 logging fidelity** — the difference between a programme that gets richer over shifts and one that doesn't.

<!-- link references -->
[S01]: /Operator-console/Field-notes/S01-Console-operator-interview
[S12]: /Operator-console/Field-notes/S12-Console-operator-interview
[Field Alpha 1]: /Operator-console/Field-notes/Field-Alpha-1-Site-Alpha-day-shift
[Field Alpha 2]: /Operator-console/Field-notes/Field-Alpha-2-Site-Alpha-night-shift
[Field Bravo 1]: /Operator-console/Field-notes/Field-Bravo-1-Site-Bravo-day-shift
[Field Bravo 2]: /Operator-console/Field-notes/Field-Bravo-2-Site-Bravo-night-shift

Page 51 — Console-v1 (PRD)

File: Operator-console/PRDs/Console-v1.md

Title: Console-v1

Parent: Operator-console/PRDs.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [PRDs](/Operator-console/PRDs)

# PRD — Console v1

## 1. Problem statement

Air-defence operators using the current three-vendor toolchain cannot complete an alert-to-engagement workflow on a single screen. Context-switching between sensor systems, manually reconciling contradicting sensors, and reconstructing decision rationale after the fact together produce an alert-to-engagement-decision latency of 4-7 minutes — long enough that soft-kill measures are often no longer viable by the time engagement is authorised. Console v1 replaces the three vendor systems with a single unified operator screen.

## 2. Target users / operators

Primary: **Console operators** (see the track-level persona at [Operator-console / Personas / Console-operator](/Operator-console/Personas/Console-operator)).

Secondary: **Air-defence commanders** (see [Programme-wide / Personas / Air-defence-commander](/Programme-wide/Personas/Air-defence-commander)) — they consume the acknowledgement workflow but are not the primary console user. A separate commander view will be scoped after Console v1 ships.

## 3. Success criteria

- Median alert-to-engagement-decision time under **90 seconds** for high-confidence threats (baseline 4-7 minutes). Measured via DASH 2.0 prototype surveys at the end of each evaluation iteration.
- **100% of operator decisions logged in-flight** (during the engagement, captured from console state at decision-time — not reconstructed). Measured via console telemetry.
- **80% of operators** report (DASH survey) that the console gives them everything they need on one screen for ≥90% of alerts.
- Operators use the **dedicated reconciliation view in ≥60%** of contradicting-sensor alerts in evaluation.

## 4. In scope / out of scope

**In scope:**
- Unified single-screen view fusing radar, RF, and EO/IR feeds
- Dedicated reconciliation view triggered when sensors disagree above a configurable threshold
- 1-2 click in-flight engagement-decision logging from current console state
- Site-specific false-positive context surfaced at start-of-shift
- Commander acknowledgement state visible inline (without forcing voice-only escalation)

**Out of scope (Console v1):**
- Cross-site coordination view (deferred to commander-view scoping)
- Cross-shift handover artefact (deferred — research synthesis flagged this as an open question)
- Mobile / remote operator access
- Classifier retraining or sensor-fusion algorithm changes (the algorithm side is treated as a black-box input)
- Kinetic-escalation team interface (handled by a separate downstream system)

## 5. User stories / jobs-to-be-done

- *As a* console operator, *when* a multi-sensor alert fires, *I want* to see all three sensor feeds plus the fused-confidence assessment in one screen, *so that* I don't context-switch between vendor systems while the engagement window closes.
- *As a* console operator, *when* sensors disagree above the reconciliation threshold, *I want* a dedicated reconciliation view that shows each sensor's basis, *so that* I can decide which sensor to trust without leaving the alert workflow.
- *As a* console operator, *when* I commit to an engagement decision, *I want* the console state at that moment captured as the decision log, *so that* I'm not reconstructing rationale from memory after the threat is resolved.
- *As a* console operator, *when* I start a shift at a site, *I want* the console to surface previously-noted false-positive sources for that site, *so that* I don't re-discover them mid-alert.
- *As a* console operator, *when* I'm awaiting commander acknowledgement, *I want* the acknowledgement state visible on my screen, *so that* I'm not blocked on voice-channel confirmation.

## 6. Constraints and dependencies

- **Sensor data:** depends on existing radar, RF, and EO/IR feeds being available via the unified fusion service. The fusion service itself is built by a separate team on the SKYPROTECT engineering side.
- **Classification confidence + sensor basis** must be exposed by the fusion service in a way the console can render. API contract to be agreed.
- **Commander acknowledgement workflow** depends on the commander view spec (not part of v1). Console v1 will render the acknowledgement *state* but the commander-side acknowledgement *action* must work via existing voice protocols until commander view ships.
- **Deployment site classification levels** vary across protected sites — the console must handle the lowest-common-denominator classification cleanly. Site-specific overrides handled via configuration, not code.

## 7. Open questions

- How should the reconciliation view be triggered — automatically when sensors disagree above threshold, or operator-triggered on demand? Both modes tested in walk-through [WT03]; no decisive preference.
- Should site-specific false-positive context appear as a *prompt* at start-of-shift or *passively available* via a side panel? Operators split in [WT03].
- Does the in-flight logging UI need to support free-text addition, or is structured-only (capturing console state + a few one-tap rationale chips) sufficient? Risk of free-text addition is that it slows logging back down.
- What is the right reconciliation-threshold default? Field observation suggests sensors disagree on roughly 30% of alerts; setting threshold too low will fatigue operators with the reconciliation view; too high and it never triggers.

<!-- link references -->
[WT03]: /Operator-console/Field-notes/WT03-Site-context-surfacing-walk-through

Page 52 — Console-v1-usability-test (test plan)

File: Operator-console/Test-plans/Console-v1-usability-test.md

Title: Console-v1-usability-test

Parent: Operator-console/Test-plans.md

Content:

[Knowledge Base](/home) › [Operator-console](/Operator-console) › [Test-plans](/Operator-console/Test-plans)

# Test plan: Console v1 — operator usability test

### Objective

Determine whether console operators can complete an alert-to-engagement-decision workflow on the Console v1 prototype within the success-criteria thresholds, without context-switching off-screen.

### Success criteria tested

- Median alert-to-engagement-decision under 90 seconds for high-confidence threats — covered by scenarios 1, 2, 4
- 100% of decisions logged in-flight from current console state — covered by scenarios 1, 2, 3, 4
- ≥90% of alerts handled on one screen without leaving the console — covered by all scenarios
- Reconciliation view used in ≥60% of contradicting-sensor alerts — covered by scenarios 2, 3

### Scenarios

#### Scenario 1: High-confidence single-sensor alert

- **Setup:** Operator is mid-shift at Site Alpha. Console shows quiet baseline. A high-confidence radar-only alert fires for an inbound airborne contact.
- **Steps:**
  1. Operator notices the alert.
  2. Operator inspects the fused-confidence assessment and supporting sensor feed.
  3. Operator commits to an engagement decision via the in-flight logging control.
- **Expected:** Decision logged from current console state in under 90 seconds from alert. No tab switches. No paper notes.
- **Evidence to capture:** Time-to-decision (console telemetry), tab-switch count, observer notes on hesitation points, post-task DASH prototype-survey scores.
- **Maps to:** Median time, in-flight logging, single-screen handling.

#### Scenario 2: Contradicting-sensor alert (reconciliation view)

- **Setup:** Operator is mid-shift. Radar and RF agree on a track; EO/IR shows nothing at the cued location. Sensor disagreement exceeds the reconciliation threshold.
- **Steps:**
  1. Operator notices the alert and the reconciliation indicator.
  2. Operator opens the reconciliation view.
  3. Operator inspects each sensor's basis and decides which to trust.
  4. Operator commits to an engagement decision (engage or dismiss).
- **Expected:** Operator uses the reconciliation view rather than reverting to off-screen tools or voice-channel querying. Decision logged in under 120 seconds.
- **Evidence to capture:** Reconciliation-view open/close events, sensor selected as basis, time-to-decision, observer notes on whether the basis was clear.
- **Maps to:** Reconciliation-view usage, in-flight logging, single-screen handling.

#### Scenario 3: Start-of-shift at an unfamiliar site

- **Setup:** Operator begins a shift at Site Bravo (they normally work Site Alpha). Console surfaces previously-noted false-positive context for Site Bravo at sign-in.
- **Steps:**
  1. Operator reviews the surfaced site context.
  2. A known-false-positive-shaped alert fires within the first 10 minutes.
  3. Operator processes the alert.
- **Expected:** Operator references the surfaced context (verbal or observable) and correctly classifies the alert as a likely false positive within the median-time threshold.
- **Evidence to capture:** Whether operator references site context, classification correctness, time-to-decision, post-task debrief on whether the context surfacing was useful or noise.
- **Maps to:** Single-screen handling, median time, site-context surfacing (open question — see PRD §7).

#### Scenario 4: Commander acknowledgement awaited

- **Setup:** Operator commits to an engagement decision that requires commander acknowledgement. Acknowledgement is delayed by 60 seconds (simulated).
- **Steps:**
  1. Operator commits the decision.
  2. Operator continues monitoring while awaiting acknowledgement state to update inline.
  3. Acknowledgement arrives; operator proceeds.
- **Expected:** Operator does not initiate voice-channel chase before the inline state update arrives. Decision and acknowledgement both logged from console state.
- **Evidence to capture:** Whether operator attempted off-channel chase, observer notes on confidence in the inline state, time spent staring at the acknowledgement indicator.
- **Maps to:** Single-screen handling, in-flight logging.

### Participants

- **Number:** 5
- **Profile:** Console operators with at least 3 months on the current three-vendor toolchain. Mix of Site Alpha and Site Bravo primary postings.
- **Recruiting source:** Through the SKYPROTECT field-research liaison; same pool as the session interviews ([S01]–[S12]).
- **Exclusions:** Operators who participated in walk-throughs [WT01]–[WT04] (already exposed to design intent — would skew freshness signal).

### Session structure

- **Pre-task (10 min):** Welcome, consent, brief on what's being tested (Console v1 prototype, not the current toolchain), warm-up question on a recent shift.
- **Scenarios:** 1 → 2 → 3 → 4, in order. 10–15 min per scenario including think-aloud. Total 50 min.
- **Post-task (15 min):** Debrief questions, DASH 2.0 prototype survey.
- **Total duration:** 75 minutes.

### Measurement

- **Behavioural observations:** Time-to-decision, tab-switch count, reconciliation-view usage, where the operator looks during hesitation, whether they reach for off-screen tools, observable confusion at decision-commit.
- **Metrics:** Console telemetry — alert-to-decision-commit duration, reconciliation-view open/close, in-flight logging completion, acknowledgement-state dwell time.
- **DASH 2.0 survey:** Prototype survey (post-iteration). Console v1 is still pre-deployment, so the system survey is not yet applicable.
- **Open questions:** "Did the console give you everything you needed on one screen?" "When did you most want to look elsewhere?" "Was the reconciliation view clear about *why* sensors disagreed?" "Did the site-specific context at start-of-shift help, get in the way, or neither?"

### Analysis

- Raw observations consolidated within 48 hours of the last session. DASH prototype-survey scores reviewed alongside observer notes.
- Findings flow directly into the next Console v1 design iteration (next prototype-from-PRD pass). No separate synthesis artefact — adjustments captured in PRD changelog and the next prototype.
- Reviewer: Operator-console track lead plus the prototype author.

### Validity risks

- **Prototype lacks site-realistic alert content:** alerts in the prototype may not feel ambiguous in the way real shifts do. Mitigation: seed each scenario from anonymised field-note alerts (see the [Field Alpha 1] and [Field Bravo 1] notes).
- **Observer presence changes hesitation behaviour:** operators may suppress think-aloud or pause-points. Mitigation: brief observers to remain silent until debrief; if feasible, capture screen + audio and review async.
- **Participant pool is small (5):** behavioural patterns will be indicative, not statistically conclusive. Mitigation: triangulate against DASH prototype survey and the existing walk-through findings ([WT01]–[WT04]).
- **Site Bravo unfamiliarity (scenario 3) may swamp the site-context signal:** operators new to Site Bravo will struggle regardless of whether the surfaced context helps. Mitigation: include at least 2 Site-Bravo-primary operators so we can compare.

<!-- link references -->
[S01]: /Operator-console/Field-notes/S01-Console-operator-interview
[S12]: /Operator-console/Field-notes/S12-Console-operator-interview
[WT01]: /Operator-console/Field-notes/WT01-Console-paper-prototype-walk-through
[WT04]: /Operator-console/Field-notes/WT04-Commander-acknowledgement-walk-through
[Field Alpha 1]: /Operator-console/Field-notes/Field-Alpha-1-Site-Alpha-day-shift
[Field Bravo 1]: /Operator-console/Field-notes/Field-Bravo-1-Site-Bravo-day-shift

---

## After all pages are created

Report back to the user with:

1. The total number of files created (expected: 52) and the three commit hashes
2. Any files that already existed and were skipped, and any that conflicted (verbatim)
3. The wiki path of every field-note file (pages 19-44) and its full wiki URL, so the user can confirm the artefact citations resolve. Templates are included in that range but are not cited by any artefact.
4. The full URL of the Knowledge Base home page (`<project-url>/-/wikis/home`) so the user can verify
5. The output of the link check, and the result of the git page-count verification
6. Whether front-matter titles rendered on this GitLab instance
7. Any issues encountered (e.g. permissions, protected branch, name conflicts) — verbatim, no paraphrasing

If anything was not created, do **not** retry or improvise. Stop and report.
