# Design Brainstorm: kacyculpepper.digital × WordPress CMS

## Context
Combining a WordPress-powered multi-page site structure with the kacyculpepper.digital aesthetic.
The original site uses: Ken Garff Red (#c8102e), IBM Plex Mono, Libre Baskerville, Inter, bento-card grid, terminal elements, dark/light card contrast.

---

<response>
<probability>0.07</probability>
<idea>

**Design Movement:** Neo-Editorial / Brutalist Minimalism
**Core Principles:**
1. Raw typographic hierarchy — headings dominate, body text breathes
2. Asymmetric bento grid with deliberate tension between card sizes
3. Monochrome base with surgical red accents (Ken Garff Red)
4. Terminal/code aesthetic as a recurring motif

**Color Philosophy:**
- Background: #fafafa (near-white, not pure white — avoids sterility)
- Text: #1a1a1a (near-black — warm, not cold)
- Accent/Link: #c8102e (Ken Garff Red — authority, precision)
- Dark cards: #0d1117 (terminal black — contrast anchor)
- Off-gray: #2a2a2a (secondary dark surface)
- Gold: #ffd700 (sparse highlight — achievement)
- Cement: #e0e0e0 (neutral dividers)
- Burgundy: #800020 (project headings — depth)

**Layout Paradigm:**
Asymmetric bento grid — cards of varying widths (1/3, 2/3, full) arranged in a flex-wrap system. No centered hero. Navigation is left-anchored, minimal. Content begins immediately after a compact header.

**Signature Elements:**
1. Terminal card with blinking cursor and typewriter text
2. Red-accented section labels in uppercase monospace (// Section)
3. Progress bars in Ken Garff Red for skill visualization

**Interaction Philosophy:**
Cards lift on hover (translateY -4px). Buttons have subtle press states. Terminal text types itself. Clock ticks in real time.

**Animation:**
- Cards: ease-in-out transform on hover, 0.3s
- Terminal: typewriter effect, character by character
- Page transitions: fade-in on mount (framer-motion)
- Skill bars: animate width from 0 on scroll into view

**Typography System:**
- Display/Headings: Libre Baskerville (serif, weight 700) — editorial authority
- Body: Inter (sans-serif, 400/500/600) — clean readability
- Code/Terminal/Tags: IBM Plex Mono (monospace, 400/500) — technical precision

</idea>
</response>

<response>
<probability>0.06</probability>
<idea>

**Design Movement:** Dark Terminal / Hacker Portfolio
**Core Principles:**
1. Dark-first — terminal black background, green phosphor text
2. Red as danger/accent — Ken Garff Red on dark is electric
3. Monospace dominates all text, serif only for names
4. Grid is tight, dense, information-rich

**Color Philosophy:**
- Background: #0d1117
- Text: #e0e0e0
- Accent: #c8102e
- Terminal text: #00ff9f
- Card: #161b22
- Border: #30363d

**Layout Paradigm:**
Full-dark bento with glowing borders. Navigation is a horizontal terminal prompt. Content cards have subtle glow effects.

**Typography System:**
- All text: IBM Plex Mono
- Headings: Libre Baskerville for name only

</idea>
</response>

<response>
<probability>0.05</probability>
<idea>

**Design Movement:** Swiss Grid / International Typographic Style
**Core Principles:**
1. Strict column grid, mathematical spacing
2. Red as the only color — everything else is black/white/gray
3. Typography IS the design — no decorative elements
4. Functional beauty through pure structure

**Color Philosophy:**
- Background: #ffffff
- Text: #000000
- Accent: #c8102e
- Grid lines: #e0e0e0

**Layout Paradigm:**
12-column grid, strict alignment, generous margins. Navigation is a single horizontal line.

**Typography System:**
- Headings: Libre Baskerville Bold
- Body: Inter Regular
- Labels: IBM Plex Mono

</idea>
</response>

---

## Selected Approach: **Neo-Editorial / Brutalist Minimalism** (Response 1)

This approach faithfully preserves the kacyculpepper.digital aesthetic while expanding it into a multi-page WordPress-style site. The bento grid, terminal card, red accents, and typographic hierarchy are all carried forward. The multi-page structure adds: Home (hero bento), About, Experience, Skills, Projects, Blog/Posts, and Contact pages — all sharing the same design language.
