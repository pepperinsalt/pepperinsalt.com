import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const defaultTitle = "Kacy Culpepper | Email Marketing Specialist";
    if (title) {
      document.title = `${title} | Kacy Culpepper`;
    } else {
      document.title = defaultTitle;
    }
  }, [title]);
}
