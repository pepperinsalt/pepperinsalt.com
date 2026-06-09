## 2024-03-24 — React Skip Link Adaptations

**Learning:** When recreating WordPress skip-link accessibility patterns in this Tailwind CSS setup, avoid toggling `sr-only` with `focus:not-sr-only` due to positioning conflicts.
**Action:** Instead, explicitly handle positioning and visibility on focus (e.g., `absolute -translate-y-full focus:translate-y-0 -left-[9999px] focus:left-4 top-4 z-[100000]`). Ensure the target `<main>` tag has `tabIndex={-1}` and `outline: none` on focus to maintain functionality without visible focus rings.

## 2026-06-01 — Global Focus-Visible Baseline

**Learning:** Establishing a global, high-contrast `:focus-visible` outline is critical for WCAG AA keyboard accessibility compliance, particularly in themes styled to appear like a CMS where standard focus outlines might be stripped by normalizer stylesheets.
**Action:** Append a baseline `:focus-visible` rule using the theme's core accent variable (`var(--kc-link)`) directly in the CSS root or base layer (`@layer base`) to catch all interactive elements without explicit focus states defined. The use of `!important` here is an acceptable exception to enforce this global accessibility safeguard against conflicting component styles.

## 2026-06-05 — Refactoring JS Hover States & Adding Reduced Motion

**Learning:** Replicating `:hover` states via inline React JS events (`onMouseEnter`/`onMouseLeave`) creates inconsistencies with `:focus-visible` accessibility, making elements unpredictable for keyboard-only users.
**Action:** Always move interaction states back to standard CSS classes. Additionally, enforcing `prefers-reduced-motion: reduce` in the `@layer base` prevents dizzying animations on custom theme sites while still supporting default utility configurations.
## 2025-10-09 — SPA Accessibility Title Fixes

**Learning:** In a Single Page Application styled like a CMS, navigation events don't naturally trigger screen reader announcements for the new page title (unlike standard multi-page PHP architectures using `wp_title()`).
**Action:** Implemented a `useDocumentTitle` React hook and applied it directly across all top-level page components (`Home`, `About`, `Experience`, etc.) to dynamically update `document.title` on mount, ensuring parity with basic WCAG AA expectations for navigation context.
