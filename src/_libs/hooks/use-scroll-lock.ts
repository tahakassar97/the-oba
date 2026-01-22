'use client';

import { useEffect, useRef } from 'react';

export const useScrollLock = (isOpen: boolean) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const body = document.body;

    if (isOpen) {
      const prev = body.style.overflow;
      body.style.overflow = 'hidden';
      return () => {
        body.style.overflow = prev;
      };
    } else {
      // Ensure unlock when toggled off
      body.style.overflow = '';
    }
  }, [isOpen]);

  return isMounted;
};
