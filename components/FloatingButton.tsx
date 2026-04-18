'use client';

import { useEffect, useRef, useState } from 'react';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/lib/useLanguage';

export default function FloatingButton() {
  const [visible, setVisible] = useState(false);
  const { language, isMounted } = useLanguage();
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    const intro = document.querySelector('.intro-section');
    if (intro) observer.observe(intro);

    return () => observer.disconnect();
  }, []);

  if (!isMounted) {
    return (
      <>
        <div className="intro-section" ref={targetRef} />
        <a href="https://wa.me/5575998855521" className="floating-button">
          <span className="floating-dot"></span>
          <span>Entre em contato</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="floating-arrow">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </>
    );
  }

  return (
    <>
      <div className="intro-section" ref={targetRef} />
      <a
        href="https://wa.me/5575998855521"
        className={`floating-button ${visible ? 'visible' : ''}`}
      >
        <span className="floating-dot"></span>
        <span>{translations[language].entrarEmContato}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="floating-arrow"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </>
  );
}
