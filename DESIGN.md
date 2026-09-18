---
name: exoplanet-signal-lab
description: "낮의 관측기록 콘솔 — bright paper ledger for fitting transit candidates"
colors:
  paper: "#faf8f1"
  paper-deep: "#f1ede1"
  plate: "#ffffff"
  ink: "#16181a"
  ink-soft: "#2b3138"
  ink-faint: "#4a545e"
  hairline: "#d9d4c6"
  hairline-strong: "#b9b2a1"
  signal: "#1d4ed8"
  signal-ink: "#123a9e"
  signal-wash: "#e3ebfd"
  stamp: "#b3261e"
  stamp-wash: "#fbe9e7"
  amber: "#8a5a00"
  amber-wash: "#fdf3dd"
  ok: "#1e6b34"
  ok-wash: "#e5f3e8"
typography:
  display:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", "Segoe UI", sans-serif'
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  headline:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", "Segoe UI", sans-serif'
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", "Segoe UI", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", "Segoe UI", sans-serif'
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.6
  mono-measure:
    fontFamily: 'ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace'
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "tnum"
rounded:
  sm: "4px"
  md: "8px"
  lg: "10px"
  xl: "12px"
  pill: "999px"
spacing:
  xs: "0.35rem"
  sm: "0.6rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.plate}"
    rounded: "{rounded.lg}"
    padding: "0.55rem 1rem"
    height: "44px"
  button:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.55rem 1rem"
    height: "44px"
  signal:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.plate}"
    rounded: "{rounded.lg}"
    padding: "0.55rem 1rem"
    height: "44px"
  danger:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.stamp}"
    rounded: "{rounded.lg}"
    padding: "0.55rem 1rem"
    height: "44px"
  input:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.5rem 0.6rem"
    height: "44px"
    width: "7.5rem"
  range:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.signal}"
    height: "44px"
    width: "10rem"
  mission-card:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.7rem 0.9rem"
  metric:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-measure}"
    rounded: "{rounded.md}"
    padding: "0.35rem 0.6rem"
  notice:
    backgroundColor: "{colors.amber-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.7rem 0.9rem"
  stamp:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.stamp}"
    rounded: "{rounded.md}"
    padding: "0.3rem 0.8rem"
---

# Design System: exoplanet-signal-lab

## Overview

**Creative North Star: "낮의 관측기록 콘솔 (The Daytime Observation Ledger)"**

The Daytime Observation Ledger is a bright daytime bench, not a night-sky cinema. Warm paper grounds every figure, ink-black tabular numerals carry measurement, and a single restrained blue draws only the model line and the next action. Density stays calm and tabular, with generous line rhythm (1.6) and thin rules separating ledger rows.

Plates feel like registered instruments: white grounds, thin borders, small corner ticks, and mono tags. Verdicts arrive as rotated rubber stamps in reserved red, caution rests in amber washes, and agreement rests in quiet leaf washes. Every encoding pairs line, text, and shape, never color alone.

**Key Characteristics:**
- Warm paper ground with faint ruled lines and ink-black tabular figures
- One restrained signal blue reserved for the model line and next action
- Flat hairline plates with corner registration ticks and mono tags
- Ledger rows and instrument strips, calm and tabular, closed by stamps
- Legend plus text plus shape for every state, never color alone

## Colors

Warm paper and ink do the work; blue signals the model, red stamps the verdict, amber holds caution.

### Primary
- **Restrained Signal Blue**: the model line, the next-action aura, and focus rings; used sparingly so rarity carries meaning.
- **Deep Signal Ink**: hover depth for the signal action; keeps the blue family grounded.
- **Signal Wash**: quiet tint behind selected instruments and informational notices.

### Secondary
- **Stamp Red**: verdict stamps and destructive outlines only; never body text or decoration.
- **Stamp Wash**: tint behind negative notices; keeps alarm soft against paper.

### Tertiary
- **Amber Earth**: residual lines, dashed caution accents, and hold verdicts.
- **Amber Wash**: default notice ground; warm without shouting.
- **Quiet Leaf**: agreement accents and confirmed verdicts.
- **Leaf Wash**: tint behind positive notices.

### Neutral
- **Warm Ledger Paper**: page ground with faint ruled repeat.
- **Deep Paper**: recessed metric grounds and hover tint for default actions.
- **Instrument White**: plate and field grounds that lift slightly off paper.
- **Ink Black**: primary text, curve points, and dark token strip.
- **Soft Ink**: secondary text and status lines.
- **Faint Ink**: hints, table headers, footers, and tags.
- **Pale Hairline**: dividers between ledger rows and table rules.
- **Strong Hairline**: plate borders, field strokes, and registration ticks.

### Named Rules
**The One Signal Rule.** Signal blue marks the model and one next action at a time; nothing else borrows it.
**The Verdict Reserve Rule.** Stamp red appears only on verdicts, destructive outlines, and negative washes.
**The Never Color-Only Rule.** Every state pairs legend plus text plus shape; dashed, dotted, and solid line styles stay distinct without hue.

## Typography

**Display Font:** System UI with Korean support (with Segoe UI and sans-serif fallback)
**Body Font:** System UI with Korean support (with Segoe UI and sans-serif fallback)
**Label/Mono Font:** System monospace stack for measures, tokens, and readouts

**Character:** Plain classroom speech in UI type, precise bench readouts in mono; tabular figures keep columns steady while prose stays loose and bright.

### Hierarchy
- **Display** (bold 700, large 1.5rem, tight 1.3): top-level plate titles and ledger headings.
- **Headline** (bold 700, medium 1.2rem, tight 1.3): section titles inside plates.
- **Body** (regular 400, base 1rem with 16px root, loose 1.6): explanations and hints, kept to a comfortable measure (68ch).
- **Label** (regular 400, small 0.85rem, loose 1.6): legends, hints, mission summaries, and status lines.
- **Mono-Measure** (regular 400, compact 0.9rem, tabular figures): readouts, metrics, table numerals, numeric entries, and plate tags with wide tracking (0.08em) and uppercase shape.

### Named Rules
**The Tabular Figures Rule.** Every measure, metric, table numeral, and numeric entry uses tabular figures so digits never jitter.
**The Tight Headline Rule.** Headings stay tight (1.3) with slight negative tracking (-0.02em); body prose stays loose (1.6).

## Layout

A centered wide sheet (76rem) with calm side padding (1rem) and deep bottom room (4rem) holds flat plates in a two-band instrument grid (7fr over 5fr) with even gaps (1rem). Ledger rows stack with small rhythm (0.9rem gaps, 0.6rem row padding) and thin dividers. The dark token strip pins to the top with wrapped pill steps; the sheet scrolls beneath it.

Narrow widths stack the bands into one column at the stack point (900px). Curves and tables scroll horizontally inside plates, never pushing the page; touch controls keep a generous minimum height (44px). Verified widths are narrow phones (320px and 360px), tablet (768px), and desktop (1280px).

### Named Rules
**The Stack At Narrow Rule.** The two-band grid becomes one stacked column at the stack point (900px); visuals precede controls in the stack.
**The No Page Push Rule.** Wide figures and tables scroll inside their plates; the page never gains horizontal scroll at narrow widths (320px).

## Elevation & Depth

Flat by default; depth comes from paper layering, thin borders, and quiet tinted washes, never shadows. White plates sit on warm paper with a single strong hairline edge (1px); recessed curve wells and orbit wells use a paler edge. Backdrops dim behind dialogs with a soft dark veil (45 percent).

### Named Rules
**The Flat-By-Default Rule.** Surfaces rest flat; no resting shadows anywhere in the system.
**The Border Or Shadow Rule.** Separation uses a border or a shadow, never both; this system chooses the border (1px).

## Shapes

Gently squared instruments: large plates take the full corner (12px), actions and cards take a middle corner (10px), fields, wells, and stamps take a small corner (8px), focus takes a tight corner (4px), and steps take the full pill (999px). Every plate carries small corner registration ticks (11px) at opposing corners. Borders stay thin (1px) with a stronger plate edge; verdict stamps add a heavier hand (2px) with a slight rotation (-2deg). Curve wells keep an inner soft corner (8px).

### Named Rules
**The Registration Tick Rule.** Instrument plates carry opposing corner ticks; they read as bench figures, not floating cards.
**The Pill For Steps Rule.** Only step tokens and the small update link use the pill (999px); everything else stays squared.

## Components

Ledger rows and instrument strips — calm, tabular, stamped.

### Buttons
- **Character:** Quiet bench keys with a firm edge; one signal key glows at a time.
- **Shape:** Middle corner (10px) with even padding (0.55rem 1rem) and generous height (44px).
- **Primary:** Dark ink ground with white text; deepens toward black on hover.
- **Hover / Focus:** Default keys warm toward deep paper on hover; signal keys deepen toward signal ink; every key shows a thick signal focus ring (3px) with slight offset (2px).
- **Secondary variants:** Signal keys use a blue ground with white text; danger keys keep a white ground with red text and redden their wash on hover; disabled keys fade (45 percent) and refuse the pointer.
- **Aura:** The next action may carry a soft expanding pulse ring (10px spread, 1.8s cycle); under reduced motion it becomes a static heavier border (3px) with no transitions.

### Mission Cards
- **Character:** Plain white choice tiles that select like instruments.
- **Shape:** Middle corner (10px) with comfortable padding (0.7rem 0.9rem), full width, left-aligned text.
- **State:** Hover firms the border toward ink; pressed selection uses a heavier signal edge (2px) over a signal wash.

### Ledger Fields
- **Character:** Ruled rows pairing a slider with a mono numeric entry and a faint hint line.
- **Shape:** Rows divided by pale rules (1px) with small vertical rhythm (0.6rem); entries use a small corner (8px) with even padding (0.5rem 0.6rem) and generous height (44px).
- **Range:** Flexible track (10rem basis) tinted by the signal accent with generous height (44px).
- **Numeric entry:** Fixed measure width (7.5rem) in mono tabular figures; caret takes the signal hue.

### Metric Chips
- **Character:** Small mono readouts that sit inline like instrument labels.
- **Shape:** Small corner (8px) with tight padding (0.35rem 0.6rem) over a paper ground with a pale edge.

### Notices
- **Character:** Soft washed banners, never loud; meaning comes from label plus wash, not hue alone.
- **Shape:** Middle corner (10px) with comfortable padding (0.7rem 0.9rem) at compact text size (0.92rem).
- **Variants:** Default rests on amber wash; informational rests on signal wash; positive rests on leaf wash; negative rests on stamp wash.

### Data Tables
- **Character:** Open ruled ledgers with right-aligned mono numerals.
- **Shape:** Full width with collapsed rules (1px), cell padding (0.45rem 0.5rem), compact text (0.88rem); headers stay small (0.78rem) with wide tracking (0.04em) in faint ink.
- **Behavior:** Numeric columns align right in mono tabular figures; wide tables scroll inside a wrapper, never the page.

### Verdict Stamps
- **Character:** Rotated rubber stamps that close the ledger with a verdict.
- **Shape:** Small corner (8px) with firm padding (0.3rem 0.8rem), heavy hand (2px), extra-bold weight (800), slight rotation (-2deg) on a white ground.
- **Variants:** Default verdict uses stamp red; hold uses amber earth; agreement uses quiet leaf.

### Instrument Plates
- **Character:** White bench figures with registration ticks and mono tags.
- **Shape:** Full corner (12px) with comfortable padding (1rem) and a strong hairline edge (1px); tags use a tight corner (4px) with wide tracking (0.08em) and uppercase shape at small size (0.7rem).
- **Legend:** Inline key pairing swatch plus text plus shape: solid ink dot for observations, solid blue line for the model, dashed amber line for residuals.

### Step Tokens
- **Character:** Dark strip pills that mark position without shouting.
- **Shape:** Full pill (999px) with even padding (0.35rem 0.7rem) at small size (0.85rem) and generous height (44px).
- **State:** Current step inverts to white ground with dark text and bold weight; hover firms the edge toward white.

### Dialog
- **Character:** A quiet centered sheet for the change log, dimmed behind.
- **Shape:** Full corner (12px) with comfortable padding (1.2rem) and a contained width (32rem) over a soft dark veil (45 percent).

### Named Rules
**The One Aura Rule.** At most one action carries the pulse aura at a time; reduced motion always swaps it for a static border (3px).
**The Generous Touch Rule.** Interactive controls keep a minimum height (44px); labels stay visible, never placeholder-only.

## Do's and Don'ts

### Do:
- Do keep grounds bright: paper pages, white plates, ink text, one blue for the model.
- Do pair every encoding with legend plus text plus shape, never color alone.
- Do keep numerals tabular and right-aligned in tables, metrics, and entries.
- Do keep plates flat with a single hairline border and corner ticks; use washes for emphasis.
- Do give every control a generous touch height (44px) with a visible label and a thick focus ring (3px).

### Don't:
- Don't use dark neon starfields, glow, gradients-as-content, or shadows for resting surfaces.
- Don't use generic gray card grids or dense hostile-brand packing; keep rows calm and tabular.
- Don't let stamp red or amber wander into decoration; red is for verdicts, amber for residuals and caution.
- Don't invent new radii, new hues, or color-only states outside this ledger.
- Don't place more than one pulse aura at once, and never animate it under reduced motion.
