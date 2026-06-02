## 2024-03-24 — React Skip Link Adaptations
**Learning:** When recreating WordPress skip-link accessibility patterns in this Tailwind CSS setup, avoid toggling `sr-only` with `focus:not-sr-only` due to positioning conflicts.
**Action:** Instead, explicitly handle positioning and visibility on focus (e.g., `absolute -translate-y-full focus:translate-y-0 -left-[9999px] focus:left-4 top-4 z-[100000]`). Ensure the target `<main>` tag has `tabIndex={-1}` and `outline: none` on focus to maintain functionality without visible focus rings.
## 2024-03-25 — Global Accessibility Baseline & Focus States
**Learning:** React elements sometimes rely on inline JavaScript events (`onMouseEnter`/`onMouseLeave`) to handle hover states, which breaks CSS `:hover` standard behaviors and prevents inheriting focus management.
**Action:** Replace inline JS hover events with standard CSS classes to ensure uniform `:hover` and `:focus-visible` states. Define a global `:focus-visible` and `prefers-reduced-motion` baseline in the CSS layer using `!important` to prevent component-specific utility classes from accidentally stripping crucial accessibility focus indicators.
