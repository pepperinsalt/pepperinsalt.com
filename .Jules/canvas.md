## 2024-03-24 — React Skip Link Adaptations
**Learning:** When recreating WordPress skip-link accessibility patterns in this Tailwind CSS setup, avoid toggling `sr-only` with `focus:not-sr-only` due to positioning conflicts.
**Action:** Instead, explicitly handle positioning and visibility on focus (e.g., `absolute -translate-y-full focus:translate-y-0 -left-[9999px] focus:left-4 top-4 z-[100000]`). Ensure the target `<main>` tag has `tabIndex={-1}` and `outline: none` on focus to maintain functionality without visible focus rings.
## 2026-05-24 — Global Focus & Reduced Motion in React/Tailwind
**Learning:** Replicating WordPress theme global accessibility baselines (like strict `:focus-visible` and `prefers-reduced-motion`) in a React/Tailwind application requires inserting them cleanly into the CSS baseline layer (e.g., `@layer base`) with `!important` to ensure utility classes do not unintentionally override them.
**Action:** When building custom React/Tailwind setups, always ensure a robust global focus and reduced-motion baseline is explicitly defined to prevent component-specific accessibility drift.
