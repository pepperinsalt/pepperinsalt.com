## 2025-05-05 — Keyboard Accessibility Audit
**Learning:** This Neo-Editorial React theme lacks fundamental keyboard accessibility patterns required for WCAG 2.1 AA, specifically missing a universal focus indicator (`:focus-visible`) and a "Skip to content" link for keyboard users.
**Action:** Implemented a global `:focus-visible` outline using the primary accent color (`var(--kc-link)`) and added a WordPress-standard `.screen-reader-text` skip link pattern in the main Layout component to anchor to `#main-content`.
