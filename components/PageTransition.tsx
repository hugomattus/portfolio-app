'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition() {
  const pathname = usePathname();

  useEffect(() => {
    const page = document.querySelector('.page');
    if (page) {
      page.classList.remove('ready');
      page.classList.add('transitioning');

      const timer = setTimeout(() => {
        page.classList.remove('transitioning');
        page.classList.add('ready');
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}
