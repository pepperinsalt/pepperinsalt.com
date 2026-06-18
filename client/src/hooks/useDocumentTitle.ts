import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} | Kacy Culpepper` : "Kacy Culpepper | Email Marketing Specialist";
  }, [title]);
}
