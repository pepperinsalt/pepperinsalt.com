import { useEffect } from "react";

/**
 * Custom hook to dynamically update the document title.
 * Essential for single-page applications to announce page changes to screen readers.
 *
 * @param title - The title to set for the current page
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
