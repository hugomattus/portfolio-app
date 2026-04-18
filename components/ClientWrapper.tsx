'use client';

import dynamic from 'next/dynamic';

const FloatingButton = dynamic(() => import('./FloatingButton'), { ssr: false });
const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });

export function ClientWrapper() {
  return (
    <>
      <CustomCursor />
      <FloatingButton />
    </>
  );
}
