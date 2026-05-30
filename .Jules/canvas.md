## 2024-03-24 — React Skip Link Adaptations
**Learning:** When recreating WordPress skip-link accessibility patterns in this Tailwind CSS setup, avoid toggling `sr-only` with `focus:not-sr-only` due to positioning conflicts.
**Action:** Instead, explicitly handle positioning and visibility on focus (e.g., `absolute -translate-y-full focus:translate-y-0 -left-[9999px] focus:left-4 top-4 z-[100000]`). Ensure the target `<main>` tag has `tabIndex={-1}` and `outline: none` on focus to maintain functionality without visible focus rings.
## 2024-03-24 — Global Accessibility Baseline with Tailwind CSS
**Learning:** When defining a global accessibility baseline in Tailwind CSS (e.g., `:focus-visible` and `prefers-reduced-motion` in `client/src/index.css` `@layer base`), `!important` may be used as an exception to the 'no !important' rule to ensure these critical styles are not unintentionally overridden by component-specific utility classes.
**Action:** Use this pattern to enforce non-negotiable accessibility standards like WCAG 2.1 AA focus states and motion preferences across the entire application without needing to manually add utility classes to every interactive element.
