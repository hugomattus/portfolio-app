'use client';

import { useEffect, useRef } from 'react';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.classList.add('ready');
    }
  }, []);

  return (
    <main className="page" ref={pageRef}>
      {children}
    </main>
  );
}
