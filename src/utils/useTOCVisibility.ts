import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'hashlearns_toc_visible';
const EVENT_NAME = 'hashlearns_toc_change';

function getStoredTOCVisible(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val !== 'false';
  } catch {
    return true;
  }
}

export function useTOCVisibility() {
  const [isTOCVisible, setIsTOCVisible] = useState<boolean>(true);

  useEffect(() => {
    const initial = getStoredTOCVisible();
    setIsTOCVisible(initial);
    if (!initial) {
      document.documentElement.setAttribute('data-hide-toc', 'true');
    } else {
      document.documentElement.removeAttribute('data-hide-toc');
    }

    const onTOCChange = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setIsTOCVisible(customEvent.detail);
    };

    window.addEventListener(EVENT_NAME, onTOCChange);
    return () => {
      window.removeEventListener(EVENT_NAME, onTOCChange);
    };
  }, []);

  const toggleTOC = useCallback(() => {
    setIsTOCVisible((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'true' : 'false');
      } catch {}
      if (next) {
        document.documentElement.removeAttribute('data-hide-toc');
      } else {
        document.documentElement.setAttribute('data-hide-toc', 'true');
      }
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: next }));
      return next;
    });
  }, []);

  return { isTOCVisible, toggleTOC };
}
