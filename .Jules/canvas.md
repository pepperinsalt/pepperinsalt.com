## 2024-05-10 — React/Tailwind Skip-Links

**Learning:** When applying WordPress accessibility patterns (like the "Skip to content" link) in a React/Tailwind CSS stack, the standard WordPress `screen-reader-text` class is unavailable and can cause styling issues if blindly copied over.

**Action:** Instead of adding custom CSS for `screen-reader-text`, leverage Tailwind's built-in `sr-only` utility to hide the element visually. To reveal it upon keyboard focus, combine it with Tailwind's focus variants (e.g., `focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-primary focus:text-white`). The main content area must also have a matching ID (`id="main"`) and `tabIndex={-1}` for focus management.
