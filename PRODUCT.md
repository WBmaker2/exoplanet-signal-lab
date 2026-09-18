# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + TypeScript static web app (Three.js rendering, pure-function engine/, Vitest). Chosen by user 2026-09-17 for P0. Deployable to any static host including sub-paths; asset paths and sub-path behavior verified at release per 00-principles.

## Users

Primary: Korean middle/high-school students in Earth-science / physics / statistics classes, teacher-led 30-minute activity (15–30 min activity + 5 min wrap per 00-principles).
Operator: classroom teacher running prediction → conditions → run/observe → evidence log → re-verify → transfer flow.
Confirmed scope excludes solo-homework tuning for P0; self-study reuse is not a driver.

## Product Purpose

让学生只凭“별빛이 어두워졌다”는 사실로 행성을 단정하지 않고, 밝기 시계열에 맞는 후보 모형을 만들고 추가 관측을 계획하게 한다. What it does: 3 synthetic light-curve missions → radius-ratio/period/inclination fitting → 3D geometry check → budget-limited follow-up window selection → candidate vs needs-verification report.
Success: learners distinguish repeatable transit candidates from noise/stellar variability, connect depth/period to model, justify follow-up, and file a hold-verdict when evidence is insufficient.

## Positioning

Unlike solar-system explorer apps that find known bodies, this lab infers an unseen body from its signal and its limits: every fit is labeled model-data agreement (χ²/RMSE), never proof; indistinguishable candidates are both accepted; single-dip discovery is explicitly rejected; imagined planet art is always labeled illustration, never observation.

## Operating Context

Classroom rituals: predict before seeing answer (short choice/prediction log, no long typing forced); separate conditions / results / interpretation; failed runs explain what blocked and what to change; no fabricated success numbers.
Environment: bright Korean UI, first screen one question + one start button; screens 320 / 360 / 768 / 1280px; desktop side-by-side (visual + condition panel), mobile stacked (visual → conditions → run → result); always-findable small ‘업데이트 내역’ button with real change dates.
Inputs: keyboard alternatives for all drags (numeric input, buttons, arrow keys), focus + dialog close/return checks, single gi-pulse aura on next action (static border under reduced-motion), 2D orbit/overlap diagram + table fallback when WebGL fails.

## Capabilities and Constraints

P0 physics (uniform spherical star, opaque spherical planet, circular orbit, single planet, M★=1 M☉, R★=1 R☉): P∈[2,20] d, k=Rp/Rs∈[0.03,0.2], i∈[85°,90°]; a=(G M★ P²/4π²)^(1/3) SI internally, displayed in days / R★; phase φ=2π(t−t0)/P; projected d=a√(sin²φ+cos²i cos²φ); only front half-orbit (cosφ>0) occults; F(t)=1−A_overlap(d,Rs,Rp)/(πRs²) with detached/included/partial cases; full central transit F=1−k²; continuity across contact boundaries.
Noise: normalized-flux σ=0.001–0.005 candidates, fixed seed; irregular times computed at true t; metrics χ²=Σ((Fobs−Fmodel)/σ)², RMSE when σ=0; small residuals are agreement, not existence proof.
Data: Star(massKg, radiusM, brightnessModel); Candidate(periodDays, radiusRatio, inclinationDeg, transitEpochDays); Observation(timesDays, fluxes, uncertainties, sourceType, seed, modelVersion); Window(startDay, durationDay, cost), budget starts at 3 windows; record format schemaVersion/appId/createdAt/scenarioId/parameters/seed/observations/prediction/explanation; localStorage holds only experiment records, no PII, with session + JSON export fallback.
Engineering: engine/ pure functions separated from renderer (no DOM/Three.js deps), files split before 500 lines (orbit.ts, overlap.ts, lightCurve.ts, fitMetrics.ts, observationWindows.ts, OrbitScene.tsx, CurveView.tsx); input ranges+units stated, NaN/Infinity/out-of-range/duplicate-run blocked; seeded runs reproducible (seed+engineVersion+scenarioVersion+inputs+trials); frame rate decoupled from numeric dt, pause when tab hidden; heavy compute considers Worker with cancel/stale-ignore/progress/retry.
Explicitly out: real discovery claims, auto paper conclusions, telescope booking, realtime search; limb-darkening / eccentricity / multi-planet / spots are alternative explanations only (P1 needs vetted real curves + license/version/preprocessing first).
Undecided: target device performance budget numbers (to be recorded during verification, not invented).

## Brand Commitments

Name: exoplanet-signal-lab / 07. 외계행성 신호 수사대. No binding palette, type, logo, or voice beyond Korean bright-classroom UI and strict imagined-vs-observed labeling. No testimonials, benchmarks, or pricing to preserve.

## Evidence on Hand

- 00-shared-design-principles.md and 07-exoplanet-signal-lab.md in repo root (design targets, not measured results).
- Verification examples from brief: k=0.1 central full overlap → F=0.99; d≥Rs+Rp → F=1; behind-star → no dip; φ ≡ φ+2π; arccos clamp + zero-radius edges; seed rerun identical; candidate change never mutates observation raw data.
- [NASA Exoplanet Watch resources](https://science.nasa.gov/citizen-science/exoplanet-watch/exoplanet-watch-resources/) (accessed during prior idea survey; version/terms must be re-checked before any real-data P1).
- Absences future work must not fabricate: no measured learning gains, no vetted real light curves yet, no generated imagery yet (image 2.5 availability/license/price to be confirmed at production; never silently substituted).

## Product Principles

1. Predict first, then observe — answers never precede a logged prediction.
2. Separate conditions, results, and interpretation — later condition edits never overwrite earlier results.
3. One dip is never a discovery — report candidates and hold-verdicts with reasons and limits.
4. Reproduce everything — seeds, versions, inputs, and windows travel with every record.
5. Teach the limit — noise, inclination misses, and indistinguishable models are first-class outcomes.

## Accessibility & Inclusion

Known needs: 44px+ touch inputs, visible labels (never placeholder-only), errors at field with recovery path, legend+text+shape (never color-only), keyboard time entry, reduced-motion static alternative, 320px no-horizontal-scroll tables/curves, focus-visible + dialog return.
Explicit exclusion per 00-principles: VoiceOver implementation/verification, TTS/voice recording/autoplay audio are out of scope and must not be claimed.
