'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        setIsActive(true);
        setText('Ver');
      });

      card.addEventListener('mouseleave', () => {
        setIsActive(false);
        setText('');
      });
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      workCards.forEach((card) => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

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
