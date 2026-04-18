'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const pathname = usePathname();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const listenerMapRef = useRef<Map<Element, { enter: () => void; leave: () => void }>>(new Map());

  // Detect mobile and mark as mounted
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    setIsMounted(true);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset cursor state when pathname changes
  useEffect(() => {
    setIsActive(false);
    setText('');
  }, [pathname]);

  useEffect(() => {
    if (!isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const attachListeners = () => {
      const clickableElements = document.querySelectorAll('a, button, [onclick], [role="button"]');

      clickableElements.forEach((element) => {
        if (listenerMapRef.current.has(element)) return;

        const handleMouseEnter = () => {
          setIsActive(true);
          const workCard = element.classList.contains('work-card') ? element : element.closest('.work-card');
          if (workCard) {
            const isComingSoon = workCard.getAttribute('data-coming-soon') === 'true' || workCard.classList.contains('coming-soon');
            console.log('Work card hover:', { element, workCard, isComingSoon, attr: workCard.getAttribute('data-coming-soon'), classList: workCard.className });
            setText(isComingSoon ? 'Em breve' : 'Ver');
          } else {
            setText('');
          }
        };

        const handleMouseLeave = () => {
          setIsActive(false);
          setText('');
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        listenerMapRef.current.set(element, { enter: handleMouseEnter, leave: handleMouseLeave });
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();

      listenerMapRef.current.forEach((listeners, card) => {
        card.removeEventListener('mouseenter', listeners.enter);
        card.removeEventListener('mouseleave', listeners.leave);
      });
      listenerMapRef.current.clear();
    };
  }, [isMounted]);

  if (!isMounted || isMobile) {
    return null;
  }

  return (
    <div
      className={`custom-cursor ${isActive ? 'active' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {text}
    </div>
  );
}
