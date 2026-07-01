## 2024-03-24 — React Skip Link Adaptations

**Learning:** When recreating WordPress skip-link accessibility patterns in this Tailwind CSS setup, avoid toggling `sr-only` with `focus:not-sr-only` due to positioning conflicts.
**Action:** Instead, explicitly handle positioning and visibility on focus (e.g., `absolute -translate-y-full focus:translate-y-0 -left-[9999px] focus:left-4 top-4 z-[100000]`). Ensure the target `<main>` tag has `tabIndex={-1}` and `outline: none` on focus to maintain functionality without visible focus rings.

## 2026-06-01 — Global Focus-Visible Baseline

**Learning:** Establishing a global, high-contrast `:focus-visible` outline is critical for WCAG AA keyboard accessibility compliance, particularly in themes styled to appear like a CMS where standard focus outlines might be stripped by normalizer stylesheets.
**Action:** Append a baseline `:focus-visible` rule using the theme's core accent variable (`var(--kc-link)`) directly in the CSS root or base layer (`@layer base`) to catch all interactive elements without explicit focus states defined. The use of `!important` here is an acceptable exception to enforce this global accessibility safeguard against conflicting component styles.

## 2026-06-05 — Refactoring JS Hover States & Adding Reduced Motion

**Learning:** Replicating `:hover` states via inline React JS events (`onMouseEnter`/`onMouseLeave`) creates inconsistencies with `:focus-visible` accessibility, making elements unpredictable for keyboard-only users.
**Action:** Always move interaction states back to standard CSS classes. Additionally, enforcing `prefers-reduced-motion: reduce` in the `@layer base` prevents dizzying animations on custom theme sites while still supporting default utility configurations.

## 2026-06-10 — Form Input Accessibility in React

**Learning:** Just like in standard WordPress template forms, custom React form inputs built without a library require explicit pairing between `<label>` elements and their inputs to maintain WCAG 2.1 AA accessibility compliance.
**Action:** Always ensure `<label>` elements have an `htmlFor` attribute that strictly matches the `id` of the corresponding `<input>`, `<textarea>`, or `<select>`. For standalone inputs without a visible label, ensure an `aria-label` is provided. This guarantees that screen readers properly associate the labels, matching the accessibility baseline expected in standard WordPress form plugins.
