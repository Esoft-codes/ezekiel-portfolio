# DESIGN.md: Ezekiel Efemena Atevafo portfolio

## Brief
- Subject: Ezekiel Efemena Atevafo, Lagos. Two equal disciplines: AI automation & integration, AI creative production.
- Audience: business owners and agency founders who need automations, voice agents or AI video.
- Job: get booked (email / LinkedIn).
- Assets: studio portrait (OneDrive `up.jpg`), street portrait (`Esoft.jpg`), real screenshots of n8n, Make and Vapi builds. Client names and emails blurred or cropped.
- Language: English. Stack: Next.js (user asked for React/Next; static export so it deploys anywhere).

## Concepts
| | Idea | Anchor | Signature | O / F / Fe / P |
|---|---|---|---|---|
| A. Material | The site is one running workflow. Scroll is the execution: an item travels down a wire and every section is a node that runs as it passes. A router splits the wire into two lanes, automation and creative, which merge again at contact. | He builds n8n / Make workflows every day; his two disciplines really are two branches of one practice. | The execution pulse on the wire; node statuses flip from "waiting" to "success" as it passes. | 4 / 5 / 4 / 2 |
| B. Process (film) | An edit timeline with two tracks: V1 creative, A1 automation; scroll scrubs the playhead. | His Google Flow film work. | Playhead scrub with timecode. | 3 / 3 / 3 / 3 |
| C. Formal (voice) | Every section is one turn of a phone call, transcript style, the agent speaks first. | His Vapi receptionists. | Lines type themselves like live captions. | 4 / 3 / 4 / 2 |

Pick A: the only one that covers both disciplines and is built from his real material. From C, the 404 borrows real tool voice: an n8n "Problem in node" error, which is also a real screenshot in his OneDrive.

## Concept card
```
Idea:        A portfolio that runs like one of his workflows: you are the trigger, each section is a node.
Metaphor:    an automation canvas (dot grid, nodes, wires, execution status, router and merge)
Signature:   the execution pulse travelling down the wire with scroll; nodes report "success" as it passes; router splits into two coloured lanes
Emotion:     calm precision, the satisfaction of a run that goes green
Motion verb: "run": things travel along a line, then settle into place (wire draws, item moves, status resolves)
Screenshot:  the hero node: condensed name, portrait framed as the workflow's output, the trigger status ticking to success
```

## System
Palette (night canvas)
- ground `#0C0D10` canvas
- node `#15171C` node bodies
- ink `#ECEEF1`
- muted `#959CA8` (AA on ground)
- line `#262A33` wires at rest, dot grid
- auto `#4C86FF` automation lane, pulse, focus ring
- create `#A794FF` creative lane
- curtain: ground with an auto wire leading the wipe

Why blue + violet (an AI-default pair): the brief asks for them, and here they are not a gradient or a glow. They are lane colours, the way workflow tools colour branches. They never mix.

Type: Archivo variable (wght 100 to 900, wdth 62 to 125) + Martian Mono 400.
- Automation voice: Archivo wdth 68, wght 700, tight tracking.
- Creative voice: Archivo wdth 125, wght 600.
- Text: Archivo wdth 100, 400. Node labels and status: Martian Mono 12 to 13 px.
- The tagline sets "Automate" condensed, "Integrate" normal, "Create" expanded: one family, two personalities.

Grid: 12 columns, the wire hangs on a fixed line left of column 1 (`--wire-x`). Text starts on col 2, col 7.
Rhythm: hero full, about airy, services normal, work tight, process airy, contact full.
Shape: only nodes are rounded (10 px). Media and sections are square.
Motion: engine eases. Wire draws 0.6 s, statuses resolve 0.4 s, page transition 0.9 s each way.

Composition
```
HERO (split frame)            ABOUT (asymmetric pair)      SERVICES (router → 2 lanes)
|● trigger                    | img 5col | statement 6col   |◆ router
| NAME NAME  [portrait node]  |          | facts table      |──┬────────────┐
| role / tagline / CTAs       |                             | auto lane     | create lane
WORK (execution log index)    WORKBENCH (gallery wall)     PROCESS (4 nodes in a chain)
| # title branch stack ✓      | big | small / small | wide  | ○──○──○──○
TOOLS (data columns)          CONTACT (finale)
| 4 mono columns              | send-email node, giant question, email, form, footer "finished"
```

Hovers: CTAs flood with lane blue from the pointer side; nav underline draws like a wire; project rows draw their wire, nudge the title and show a floating screenshot; inline links keep an underline that rises.
Idle: the wire's dashes keep flowing (data in transit) and the pulse breathes. Stops under reduced motion.

## Genericness test
- "Dark AI portfolio with blue glow and portrait" is what a generic model would make. Changed: no glow, no gradient blob, no cards grid; the structure is a workflow, the work list is an execution log, the 404 is a node error.
- Services are not 12 equal cards: two lanes with different type widths.

## Update 2026-11-24
Owner asked for a standard portfolio look. Removed the workflow concept: wire, pulse, node chips, dot-grid canvas, execution-log wording, "Running next node" transition label, n8n-style 404. Sections now use plain uppercase labels (Eyebrow component).
