## 2024-03-24 — React Skip Link Adaptations
**Learning:** When recreating WordPress skip-link accessibility patterns in this Tailwind CSS setup, avoid toggling `sr-only` with `focus:not-sr-only` due to positioning conflicts.
**Action:** Instead, explicitly handle positioning and visibility on focus (e.g., `absolute -translate-y-full focus:translate-y-0 -left-[9999px] focus:left-4 top-4 z-[100000]`). Ensure the target `<main>` tag has `tabIndex={-1}` and `outline: none` on focus to maintain functionality without visible focus rings.
## 2024-05-28 — Global Accessibility Baseline with Tailwind CSS
**Learning:** In Tailwind, base layer styles are easily overwritten by component and utility classes. Because focus styles and reduced motion preferences are critical accessibility requirements, they must be consistently applied across the entire UI regardless of specific utility classes.
**Action:** Use `!important` as an intentional exception inside `@layer base` for `:focus-visible` outlines and `@media (prefers-reduced-motion: reduce)` resets to ensure they act as a true global baseline that cannot be unintentionally defeated by component-level utility classes.
