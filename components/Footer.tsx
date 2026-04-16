'use client';

import { translations } from '@/lib/translations';
import { useLanguage } from '@/lib/useLanguage';

export default function Footer() {
  const { language, isMounted } = useLanguage();

  if (!isMounted) return null;

  return (
    <>
      <div className="footer-section footer-social">
        <span className="footer-section-title">{translations[language].redesSociais}</span>
        <nav className="social">
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
        </nav>
      </div>

      <div className="footer-section footer-design">
        <span className="footer-section-title">Design</span>
        <nav className="social">
          <a href="#">Behance</a>
          <a href="#">Dribbble</a>
        </nav>
      </div>

      <div className="footer-section footer-email">
        <span className="footer-section-title">{translations[language].entrarEmContato}</span>
        <nav className="social">
          <a href="mailto:contatoxmello@gmail.com">contatoxmello@gmail.com</a>
        </nav>
      </div>
    </>
  );
}
