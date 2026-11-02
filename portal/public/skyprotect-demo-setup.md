# Set up the SKYPROTECT demo project in Confluence

## Who is reading this

You are an AI assistant with Confluence MCP tools. Your task is to populate a Confluence space named **`SKYPROTECT`** (key **`SKYPR`**) with a demo project for a fictional drone-defence programme. The space already exists; do not create it.

The user is trying out a ProductOps Co-pilot portal that produces structured research artefacts and files them into Confluence. SKYPROTECT is a made-up programme, used so people without a project of their own can follow the tutorial.

The story: SKYPROTECT is a **new** programme. Its team starts from the documents of a **prior** programme, FLEETWATCH, whose lessons might carry over. The space holds the prior programme's pages, the new programme's kickoff brief and 12 field notes from interviews and observations. It holds **no finished research artefacts**: no synthesis, personas, journeys, PRD or test plan. The user makes those with CLARA, so do not create any.

Every node is a **page**. Hierarchy is expressed by the `parent_id` field: each page's `parent_id` is the page one level above it. Content lives in the page **description**.

## Filing discipline (apply to every page below)

1. **Space check.** Verify the `SKYPROTECT` space (key `SKYPR`) exists. If it does not, stop and report. Do not create the space yourself.
2. **Hierarchy check.** Before creating any page, verify every parent page in its path exists.
3. **No silent fallbacks.** If a page cannot be created (permissions, missing space, anything), stop and report. Never file a page anywhere other than where it is listed, without explicit confirmation.
4. **Labels are optional.** The hierarchy is carried entirely by the parent chain. No label is required.
5. **Create pages in the order listed below.** That order encodes the hierarchy, so every parent is created before its children.
6. **Copy descriptions exactly.** Do not summarise, tidy or correct the text in the code blocks. The field notes are deliberately rough, and some of them disagree with each other.
7. **Do not add anything.** Do not create example artefacts, summaries or extra pages.

## Target hierarchy

```
SKYPROTECT (space, key SKYPR)
├── Prior-projects/
│   ├── FLEETWATCH — Project brief
│   └── FLEETWATCH — Close-out report
├── SKYPROTECT — Kickoff brief
└── Knowledge Base/
    └── Programme-wide/
        └── Field-notes (Programme-wide)/
            ├── _Template — Field note (Programme-wide)
            ├── S01 — Console operator interview
            ├── S02 — Console operator interview
            ├── S03 — Console operator interview
            ├── S04 — Console operator interview
            ├── S05 — Console operator interview
            ├── S06 — Console operator interview
            ├── S07 — Air-defence commander interview
            ├── S08 — Air-defence commander interview
            ├── S09 — Sensor technician interview
            ├── S10 — Safety and legal adviser interview
            ├── WT01 — Day-shift observation, Site Alpha
            └── WT02 — Night handover observation, Site Bravo
```

That is 20 pages in all. `Prior-projects` and `SKYPROTECT — Kickoff brief` sit at the top of the space on purpose. They are reference material that other teams wrote, not Knowledge Base artefacts. Everything CLARA files later goes under `Knowledge Base`.

## SKYPROTECT: programme context

SKYPROTECT is a digital command-and-control system for counter-UAS (counter-unmanned-aircraft-system) operations that protect fixed sites. It brings feeds from radar, RF detection and EO/IR cameras into a single operator console, and supports the decision chain from alert to authorisation. There are two sites: **Site Alpha**, a coastal airbase, and **Site Bravo**, an inland depot. There is one central ops room, where **air-defence commanders** oversee both sites.

FLEETWATCH is the prior programme: a unified console for supervising a fleet of warehouse robots. Use these names consistently.

---

## Pages to create

### Page 1: `Prior-projects` (reference folder)

- **Title:** `Prior-projects`
- **Parent:** none (top level of the space)
- **Description:**

```
Documents from earlier programmes, kept for reference. Other teams wrote these pages.
```

---

### Page 2: `FLEETWATCH — Project brief`

- **Title:** `FLEETWATCH — Project brief`
- **Parent:** `Prior-projects`
- **Description:**

```
# FLEETWATCH: project brief

**Programme:** FLEETWATCH, a unified supervision console for warehouse robots
**Sponsor:** Logistics Operations Directorate
**Duration:** January 2023 to June 2025
**Team:** 1 product lead, 2 designers, 6 engineers, 1 researcher

## Background

The Central Distribution Hub moves stock with 142 autonomous mobile robots (AMRs) from three vendors:

- Kestrel Robotics: 70 pallet movers
- Marlow Automation: 48 shelf pickers
- Torvik Systems: 24 tuggers

Each vendor ships its own console. Control-room supervisors work four rotating 12-hour shifts, with six supervisors on each. To see the state of the floor, they move between three consoles and reconcile what each one says by hand.

## Problem

Supervisors are flooded with alerts, and most need no action. They hand over between shifts using a whiteboard and a group chat, so information gets lost. When a robot loses its network connection, its last known position stays on screen, and supervisors cannot tell whether it is still there.

## Objectives and targets

| Measure | Baseline | Target |
|---|---|---|
| Median time to acknowledge an alert | 94 seconds | under 45 seconds |
| Alerts per supervisor per shift | about 600 | under 200 |
| Handover items lost (per quarter) | 11 | under 3 |
| System Usability Scale (SUS) score | 48 | 70 or more |

## Users

- **Control-room supervisors:** the main users, 24 of them across four shifts
- **Hub manager:** reviews shift performance each morning
- **Maintenance technicians:** receive faults that supervisors raise

## Scope

**In scope:** one console that brings all three vendors' robots into a single view; alert grouping; a structured handover screen; robot health status.

**Out of scope:** changing the robots' own control software; route planning; the warehouse management system.

## Approach

22 interviews, 6 shift observations and 3 rounds of prototype testing with supervisors, including night shift.

## Related pages

See the FLEETWATCH close-out report for results and lessons.
```

---

### Page 3: `FLEETWATCH — Close-out report`

- **Title:** `FLEETWATCH — Close-out report`
- **Parent:** `Prior-projects`
- **Description:**

```
# FLEETWATCH: close-out report

**Closed:** June 2025
**Author:** FLEETWATCH product lead

## Results against targets

| Measure | Baseline | Target | Result |
|---|---|---|---|
| Median time to acknowledge an alert | 94 seconds | under 45 seconds | 31 seconds |
| Alerts per supervisor per shift | about 600 | under 200 | about 140 |
| Handover items lost (per quarter) | 11 | under 3 | 2 |
| SUS score | 48 | 70 or more | 74 |

## What worked

- **Grouping alerts by root cause.** One failed network switch used to raise 40 alerts. After grouping, it raised one. This cut alert volume by about three quarters.
- **A structured handover screen.** Outgoing supervisors tick through open items and watch items, and the incoming supervisor signs for them. Lost handover items fell from 11 a quarter to 2.
- **Showing how old a robot's position is.** A "last seen 40 s ago" label stopped supervisors from trusting stale positions.
- **Testing on the night shift.** Night supervisors worked differently from day supervisors, and two of the biggest problems appeared only in night-shift tests.

## What did not work

- **Voice alerts.** The hub floor is loud, and supervisors switched them off within three weeks.
- **Auto-dispatch of recovery robots.** Supervisors overrode 62% of the system's proposals, because they could not see why it had chosen them. The feature was switched off at launch of version 2.
- **Confidence scores.** Supervisors ignored the percentage on each alert. A bare number did not tell them what to do.
- **Waiting on equipment owners.** Some "ghost" robots came from a vendor gateway setting that the console could not change. Supervisors raised it three times, and it took five weeks to reach the person who owned the setting.

## Lessons

1. Group alerts by root cause, not by robot.
2. Always show how old a position is.
3. Make handover structured and written, not verbal.
4. Do not automate a decision that supervisors cannot inspect. They will override it.
5. Test on every shift pattern, especially nights.
6. Take faults that sit in the equipment's configuration to the owner of the equipment. They cannot be fixed in the console.

## Open questions we did not answer

- How should a system show how sure it is, so that people act on it?
- What is the right way to escalate to a manager during an incident, without slowing the supervisor down?
- Do the lessons hold where a missed alert is dangerous, not just costly?
- How should the console behave when one vendor's feed drops out?
```

---

### Page 4: `SKYPROTECT — Kickoff brief`

- **Title:** `SKYPROTECT — Kickoff brief`
- **Parent:** none (top level of the space)
- **Description:**

```
# SKYPROTECT: kickoff brief

**Programme:** SKYPROTECT, a fused-sensor console for counter-drone operations
**Kickoff:** August 2026
**Team:** 1 product lead, 1 designer, 4 engineers, 1 researcher
**Prototype due:** 8 weeks from kickoff

## The ask

Operators at our two sites should not need three windows to confirm a drone. Commanders in the central ops room should be able to authorise faster. Show us a prototype that people can try.

## What the prototype should show

- One view per drone, with the radar track, the RF contact and the camera feed together, and the track marked on the camera picture.
- Whether each of the three feeds is live, stale or dropped, and how old its last data is.
- When an operator escalates, one panel that gives the commander the evidence, and the commander authorises from there.
- Both sites in one console, with an alert from the other site shown as it arrives.

## Background

Radar, RF detection and EO/IR cameras are separate vendor systems:

- Halden Radar: tracks objects in the air
- Sigma RF Watch: detects radio signals from drones
- Optix EO Viewer: shows live camera feeds

Operators describe the setup as "three windows duct-taped together". They reconcile contradictions between the three by hand.

## Sites and people

- **Site Alpha:** a coastal airbase
- **Site Bravo:** an inland depot
- **Operators:** each site has two operators on each day shift and one at night, working 12-hour shifts
- **Central ops room:** air-defence commanders, each overseeing both sites, who authorise any response

All decisions to engage stay with a human. Nothing in this programme may automate engagement.

## Constraints

- Once a drone is confirmed, there are only about 90 seconds to decide before it reaches the protected area.
- Commanders and a safety and legal adviser must be able to review who confirmed what, and when.
- The console must work on the sites' existing screens.

## What we hope to reuse

The team that ran FLEETWATCH, the warehouse robot console, solved problems that look similar: alert floods, handovers and several vendor systems. We think some of their lessons apply. We have not tested whether they hold where a missed alert is dangerous.

## What we do not know yet

- What operators and commanders actually struggle with today
- Which FLEETWATCH lessons carry over, and which do not
- Which problem to build for first

## Success looks like

- Operators confirm a drone faster than today.
- Fewer false alerts reach the operator.
- Commanders authorise faster, with the evidence in front of them.
- Operators and commanders rate the console higher than the current toolchain.
```

---

### Page 5: `Knowledge Base` (top-level parent)

- **Title:** `Knowledge Base`
- **Parent:** none (top level of the space)
- **Description:**

```
This is the SKYPROTECT programme's Knowledge Base. All AI-generated research artefacts file under here, organised by track.

Programme type: Digital

Tracks in this programme:
- Programme-wide: artefacts that apply to the whole programme

Filing convention: `Knowledge Base / <track> / <artefact-type> / <name>`.
```

---

### Page 6: `Programme-wide` (track parent)

- **Title:** `Programme-wide`
- **Parent:** `Knowledge Base`
- **Description:**

```
Programme-wide artefacts for SKYPROTECT: prior-knowledge summaries, research synthesis, personas and so on.
```

---

### Page 7: `Field-notes (Programme-wide)` (grouping)

- **Title:** `Field-notes (Programme-wide)`
- **Parent:** `Programme-wide`
- **Description:** `Placeholder — created to support filing structure.`

---

### Page 8: `_Template — Field note (Programme-wide)`

- **Title:** `_Template — Field note (Programme-wide)`
- **Parent:** `Field-notes (Programme-wide)`
- **Description:**

```
#### How to use this template

1. **Duplicate this page** into the `Field-notes (Programme-wide)` folder (Confluence: page `⋯` menu → *Copy*).
2. **Rename your copy** to something memorable, such as `S13 — Console operator interview`.
    - Drop the `_Template — ` prefix.
    - Drop the `(Programme-wide)` suffix too. Leaf field-note pages don't carry the track suffix.
3. **Leave Session ID blank.** CLARA stamps it the first time it processes the note. Do not edit this field yourself.
4. **Fill in the rest.** Participants and User group are optional but useful. Raw notes and Verbatim quotes are the substance.
5. Delete this *How to use* block before saving.

---

- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** e.g. Console operator (x2), Air-defence commander (x1)
- **User group:** 

---

## Raw notes

_Drop your notes here. No structure required._

---

## Verbatim quotes

_Exact words from participants only. Attribute to role where possible, e.g. Console operator: "..."_
```

---

### Page 9: `S01 — Console operator interview`

- **Title:** `S01 — Console operator interview`
- **Parent:** `Field-notes (Programme-wide)`
- **Description:**

```
- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** Console operator (x1), Site Alpha, day shift, 6 years in role
- **User group:** Console operators

---

## Raw notes

Interview at Alpha, 14 Aug, about 40 min, in the break room. Operator was relaxed, spoke fast.

Day to day: three windows open, radar on the left screen, RF on the middle, camera on the right. Spends most of the shift on the radar. Alt-tabs to RF when a track looks like a drone. Camera only if RF shows nothing and radar still looks odd.

Dawn and dusk are the worst. Gulls come off the shoreline and the radar draws them as small slow tracks. Gets "eighty, ninety alerts a shift" and "most of them are birds". Has learned to ignore anything small and slow near the water. Said he feels bad about it, it's a rule he made up himself.

RF only helps if the drone is transmitting. A drone flying on a pre-set route with no link doesn't show on RF at all. He worries about that one. Nobody has told him what to do about it.

Writes the log in a spreadsheet at the end of the hour, from memory plus the radar history. Sometimes misses the exact time.

Wishes there was one list of everything, instead of three.

---

## Verbatim quotes

Operator: "I've got three windows and one pair of eyes."

Operator: "Ninety alerts a shift and maybe two of them matter. You stop reading them. You'd have to."

Operator: "If it isn't talking on RF, I'm relying on a camera I have to point by hand."
```

---

### Page 10: `S02 — Console operator interview`

- **Title:** `S02 — Console operator interview`
- **Parent:** `Field-notes (Programme-wide)`
- **Description:**

```
- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** Console operator (x1), Site Alpha, day shift, 3 years in role
- **User group:** Console operators

---

## Raw notes

Interview at Alpha, 14 Aug, 30 min at the console during a quiet hour. Kept glancing at the screen.

Asked where the false alerts come from. Answer was straight away: birds. "Dawn, dusk, any time the tide is out." Reckons nine in ten of the alerts he dismisses are birds. Doesn't think weather matters much at Alpha.

Doesn't trust the radar's own label. The radar tags each track "bird", "drone" or "unknown", and he said the label is "a guess". Treats "unknown" as bird unless something else backs it up.

Handover: whiteboard by the door and a chat group. At 07:00 the night operator reads out what's on the whiteboard. He missed a "watch item" once, a contact the night operator had been keeping an eye on, because it was only in the chat group and he hadn't scrolled up. It turned out to be a hobbyist. Still bothers him.

Training: shadowed a senior operator for two weeks. No written guide. "You learn which windows to ignore."

---

## Verbatim quotes

Operator: "It's birds. It's always birds. Dawn and dusk, and any time the tide's out."

Operator: "The label says bird or drone. It's a guess. I treat unknown as bird until something else tells me different."

Operator: "The whiteboard says what's on the whiteboard. Anything that's only in the chat, you'd have to scroll for."
```

---

### Page 11: `S03 — Console operator interview`

- **Title:** `S03 — Console operator interview`
- **Parent:** `Field-notes (Programme-wide)`
- **Description:**

```
- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** Console operator (x1), Site Bravo, night shift, 9 years in role
- **User group:** Console operators

---

## Raw notes

Interview at Bravo, 19 Aug, 45 min, started 06:15 at the end of a night shift. Tired but talkative.

Only one operator at Bravo at night. Can't leave the console. Brings food in. If something happens while they're at the toilet, "that's the shift".

False alerts at Bravo are mostly rain and clutter on the radar, not birds. Nights after rain are the worst, with dozens of tracks that aren't there. Also gets ghost tracks: a contact sits on the screen long after it has gone, usually after the RF sensor restarts. He doesn't know how old a track is. Has to look at the radar's clock in the corner and work it out.

We discussed grouping alerts together to cut the number. He didn't like it. "If you bunch them up, the real one hides in the pile." Wants each alert separate but wants the obvious clutter filtered, and wants to choose what's filtered.

Handover by phone with the day operator, about 15 minutes. No written record.

Says commanders are good, but "you can wait a minute for them to pick up".

---

## Verbatim quotes

Operator: "Rain comes and it's like someone threw a handful of gravel at the screen."

Operator: "A ghost sits there looking real. I don't know if it's ten seconds old or ten minutes."

Operator: "If you bunch them up, the real one hides in the pile."
```

---

### Page 12: `S04 — Console operator interview`

- **Title:** `S04 — Console operator interview`
- **Parent:** `Field-notes (Programme-wide)`
- **Description:**

```
- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** Console operator (x1), Site Bravo, day shift, 2 years in role
- **User group:** Console operators

---

## Raw notes

Interview at Bravo, 19 Aug, 35 min. Newest operator on the team. A bit nervous at first, loosened up.

Training was shadowing only. Spent the first month unsure what the screens were telling him. Terms differ between the three tools: radar calls it a "track", RF calls it an "emitter" and the camera system calls it a "target". He kept a sticky note on the monitor for it. Wasn't sure whether one track and one emitter were the same object. Still checks by comparing bearing and range by eye.

Timestamps differ by a few seconds across the three tools. When writing the log he isn't sure which time to use.

Doesn't want alerts to take over the screen. Likes that the current tools stay quiet. Worries a new system would "shout".

Asked what he'd want most: one list that says "radar and RF both see something at this bearing". Said it would save him the comparing.

---

## Verbatim quotes

Operator: "Track, emitter, target. Same thing, three names. I wrote it on a sticky note."

Operator: "I never know if the radar contact and the RF contact are the same drone. I do the sums in my head."

Operator: "Please don't make it shout."
```

---

### Page 13: `S05 — Console operator interview`

- **Title:** `S05 — Console operator interview`
- **Parent:** `Field-notes (Programme-wide)`
- **Description:**

```
- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** Console operator (x1), Site Alpha, night shift, 7 years in role
- **User group:** Console operators

---

## Raw notes

Interview at Alpha, 21 Aug, 30 min, phone call at home before shift.

Disagreed with the idea that the false alerts are mostly birds. Says that's only true in the day. At night, and especially in monsoon months, it is "rain returns and sea clutter". Birds are rare at night. Estimates two thirds of his dismissed alerts are weather.

Ghost tracks are common. Last month a track stayed on screen for what he thinks was nearly a minute after the object had gone. He wants every track to show an age, like "last seen 20 s ago".

Escalation: when he confirms something he calls the commander on a voice line. Commander usually picks up in under 15 seconds, "but I can't tell you what he's doing with it". He describes what he sees in his own words, which takes time and gets muddled.

Doesn't want the system to decide anything. "I'm the one who has to say it out loud."

---

## Verbatim quotes

Operator: "Nights are weather. Birds are a daytime problem."

Operator: "Put a clock on every track. Last seen, so many seconds. That's all I want."

Operator: "I describe it down the phone and I hear myself getting it wrong."
```

---

### Page 14: `S06 — Console operator interview`

- **Title:** `S06 — Console operator interview`
- **Parent:** `Field-notes (Programme-wide)`
- **Description:**

```
- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** Console operator (x1), Site Bravo, day shift, 5 years in role
- **User group:** Console operators

---

## Raw notes

Interview at Bravo, 21 Aug, 40 min, at the console.

Centre of the conversation was escalation. Once he is sure, he calls the commander on a voice line. Has had it ring for a long time. "I've waited a minute with a confirmed drone." Commander is often on a call with the other site. No way to know whether the commander has seen it. No way to know whether he has acknowledged, other than hearing him say so.

Once he waited about 70 seconds. The drone was a hobby quadcopter that turned away, but he says he "had my hand on the desk the whole time".

Trust: finds the RF detection reliable for known drone models, because it reads the radio signature. Does not trust the radar's drone label. The camera is slow to point. "By the time you've slewed it, it's moved."

Wants confirmation that the commander has the message. Doesn't want the commander on his screen though. "If I know he's looking, I'll slow down."

---

## Verbatim quotes

Operator: "I've waited a minute with a confirmed drone. A minute is a long time."

Operator: "RF I trust. It reads the actual signal. Radar's label I don't."

Operator: "I just want to know he's got it. Not that he's watching me."
```

---

### Page 15: `S07 — Air-defence commander interview`

- **Title:** `S07 — Air-defence commander interview`
- **Parent:** `Field-notes (Programme-wide)`
- **Description:**

```
- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** Air-defence commander (x1), Lt Col, 18 years in role
- **User group:** Commanders (central ops room)

---

## Raw notes

Interview in the central ops room, 24 Aug, 45 min, mid-shift. Oversees both sites at once.

Main theme was holding a picture of two sites with two sets of dashboards, each in a separate browser tab. Described "tab-thrashing" in the morning when both sites get returns within minutes of each other.

On authorisation: wants to authorise quickly enough that a soft response is still an option. The delay is not knowing what the operator is seeing. Asks the operator by voice to describe the sensor state, which adds 20 to 40 seconds a call. He does not want a system-written summary. He wants the operator's own framing, because "the operator knows what looks wrong".

On operators: tries to "stay out of the operator's screen" during live alerts. Has noticed operators slow down when they think he's watching. Considers it a design problem, not an operator problem.

Asked about FLEETWATCH-style grouping of alerts. Not against it for the operator's list, but warned: "I would not want a group that hides a single contact that's different from the others."

---

## Verbatim quotes

Commander: "I'm holding two sites in my head and switching between two dashboards to do it. That's not a picture, that's a slideshow."

Commander: "I want to know quickly enough to keep a soft response on the table. Right now I'm getting there by voice, which costs me thirty, forty seconds a call."

Commander: "If I'm visibly watching their screen, they slow down. I've stopped doing it during live alerts."
```

---

### Page 16: `S08 — Air-defence commander interview`

- **Title:** `S08 — Air-defence commander interview`
- **Parent:** `Field-notes (Programme-wide)`
- **Description:**

```
- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** Air-defence commander (x1), Col, deputy of the ops room, 22 years in role
- **User group:** Commanders (central ops room)

---

## Raw notes

Interview in the central ops room, 26 Aug, 35 min, between shifts.

Disagrees a little with what operators say about delays. From his seat, the slow part is usually the operator, not the commander. "They don't call until they're sure. They wait for the third sensor." By the time the call comes in, a good part of the 90 seconds is gone. He would rather get an early "possible" than a late "confirmed".

Would like a system-written summary after all, as long as it shows how sure it is and what it is based on. A number alone is no use. "Tell me radar and RF agree, or tell me they don't."

Wants to acknowledge with one action and have the operator see it. Today he says "acknowledged" aloud, and the operator has to hear it.

Says his team keeps a handwritten log of who authorised what. Reviewing it afterwards is slow.

On automation: fine with the system preparing, never deciding. "It can have the form filled in. It can't sign it."

---

## Verbatim quotes

Commander: "They wait for the third sensor. By the time they call, I've lost half my window."

Commander: "I'd rather have an early 'possible' than a late 'confirmed'."

Commander: "It can have the form filled in. It can't sign it."
```

---

### Page 17: `S09 — Sensor technician interview`

- **Title:** `S09 — Sensor technician interview`
- **Parent:** `Field-notes (Programme-wide)`
- **Description:**

```
- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** Sensor technician (x1), covers radar and RF at both sites, 11 years in role
- **User group:** Sensor technicians

---

## Raw notes

Interview by video call, 28 Aug, 30 min. Not a console user. Looks after the hardware.

Most of what operators call a "false alert problem" at Bravo is down to configuration, not the tool they look at. The Bravo radar's sensitivity was turned up two years ago after a missed contact, and nobody has revisited it. It picks up rain and clutter that a normal setting would drop. He has asked twice for a review. No owner for it.

The RF sensor at Bravo restarts about once a week, because of a memory fault. When it comes back, the old emitter list can stay on screen for a while. Operators see it as ghost tracks. He knows because the restart is in his own logs.

Nobody tells operators when a sensor is degraded or has just restarted. They find out when things look strange.

Would like a simple health indicator for each sensor, visible to operators: working, restarted recently, degraded.

Couldn't say how often the same thing happens at Alpha. Hasn't looked.

---

## Verbatim quotes

Technician: "The radar at Bravo has been set too hot for two years. Nobody owns the setting."

Technician: "The RF box reboots about weekly. The operators get ghosts and think it's the software."

Technician: "Nobody tells the operator the sensor has just come back. They find out when the screen looks wrong."
```

---

### Page 18: `S10 — Safety and legal adviser interview`

- **Title:** `S10 — Safety and legal adviser interview`
- **Parent:** `Field-notes (Programme-wide)`
- **Description:**

```
- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** Safety and legal adviser (x1), advises on rules of engagement, 8 years in role
- **User group:** Safety and legal advisers

---

## Raw notes

Interview by video call, 2 Sep, 25 min. Only had one slot. Did not see the current tools in use, only the outputs.

After an incident, the adviser has to reconstruct who confirmed what, when, and on what evidence. Today that means listening to the voice-line recordings and reading the handwritten commander log. A review of one incident takes "a few days".

Needs a record that says: which sensors saw it, when each did, who confirmed, who authorised, and the time of each step. Wants it created as the work happens, not afterwards.

Every engagement decision must stay with a human. Said that more than once. Would object to any design that appeared to authorise on the person's behalf, even by default.

Could not say how many incidents there are a year that need this level of review. Thinks "a handful". Offered to find out and did not follow up before we ended.

---

## Verbatim quotes

Adviser: "A review takes days. I'm listening to recordings and reading a handwritten log."

Adviser: "I need to see who confirmed, who authorised and what they were looking at, with the times."

Adviser: "The human decides. Full stop. Not by default, not after a countdown."
```

---

### Page 19: `WT01 — Day-shift observation, Site Alpha`

- **Title:** `WT01 — Day-shift observation, Site Alpha`
- **Parent:** `Field-notes (Programme-wide)`
- **Description:**

```
- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** Console operators (x2), Site Alpha, day shift. Researcher observed.
- **User group:** Console operators

---

## Raw notes

Observation at Alpha, 17 Aug, 08:00 to 12:00. Sat behind the two operators. Did not speak during the shift.

Counts for the four hours:
- 31 alerts shown on radar
- 27 were dismissed within about 10 seconds, without opening anything else
- 3 were checked on the RF window
- 1 was checked on the camera
- 1 was a real contact: a hobby quadcopter near the east fence

For the real contact:
- 08:52 radar track appears
- 08:52 operator A looks at it, does nothing for a few seconds
- 08:53 operator A switches to RF. Nothing at first
- 08:54 operator B points the camera by joystick
- 08:55 camera sees the drone. Operators agree it's real
- 08:55 operator A calls the commander on the voice line
- Total from first track to the call: about 2 min 40 s

Neither operator could tell whether the radar track and the RF contact were the same object. Operator B read bearings aloud across the desk to check.

At 11:30, one operator spent about 5 minutes typing the log into a spreadsheet from memory.

Alerts cluster. Between 08:40 and 09:00 there were 14.

---

## Verbatim quotes

Operator A: "Is that your emitter or my track?"

Operator B: "Bearing 070, range 800. Is that the same one?"

Operator A: "Right, writing up the log. What time did we say it was?"
```

---

### Page 20: `WT02 — Night handover observation, Site Bravo`

- **Title:** `WT02 — Night handover observation, Site Bravo`
- **Parent:** `Field-notes (Programme-wide)`
- **Description:**

```
- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** Console operators (x2), Site Bravo, shift handover. Researcher observed.
- **User group:** Console operators

---

## Raw notes

Observation at Bravo, 25 Aug, 06:50 to 07:15. Sat in the corner. Outgoing night operator and incoming day operator.

Handover took 11 minutes. Done standing next to the console. Outgoing operator read from the whiteboard and added things from memory.

Things covered:
- RF sensor "flaky", restarted at 03:10
- Two false alerts from rain overnight
- A contact near the north tank at 02:30, dismissed as a bird

Not covered:
- A "watch item": a contact at the south fence that the outgoing operator had been watching on and off. He did not mention it.

The incoming operator found the contact on the radar history 40 minutes into the shift and asked what it was. Outgoing operator had already left.

The incoming operator asked six questions during handover, mostly "which sensor?" and "how long ago?". Answers came from memory. No written record of the handover exists.

The whiteboard was wiped at 07:10.

---

## Verbatim quotes

Incoming operator: "Which sensor saw that? And how long ago?"

Outgoing operator: "RF was a bit flaky, it came back around three."

Incoming operator (40 minutes later): "What's this one by the south fence? Did anyone look at this?"
```
