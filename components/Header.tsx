'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/lib/useLanguage';

export default function Header() {
  const { language, setLanguage, isMounted } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('--:--:--');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('pt-BR'));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) {
    return (
      <header className="site-header">
        <div className="site-header-inner">
          <div className="brand-group">
            <Link href="/" className="brand">Hugo Mello</Link>
            <p className="brand-meta">
              <span>Salvador — Bahia</span>
              <span className="dot">·</span>
              <span>--:--:--</span>
            </p>
          </div>
          <div className="header-right">
            <div className="lang-switcher">
              <button className="lang-btn active">PT</button>
              <span className="lang-divider">/</span>
              <button className="lang-btn">EN</button>
            </div>
            <nav className="nav">
              <Link href="/" className="is-current">Projetos</Link>
              <Link href="/information">Informações</Link>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="site-header-inner">
        <div className="brand-group">
          <Link href="/" className="brand">
            Hugo Mello
          </Link>
          <p className="brand-meta">
            <span>Salvador — Bahia</span>
            <span className="dot">·</span>
            <span data-clock>{currentTime}</span>
          </p>
        </div>

        <div className="header-right">
          <div className="lang-switcher">
            <button
              onClick={() => setLanguage('pt')}
              className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
            >
              PT
            </button>
            <span className="lang-divider">/</span>
            <button
              onClick={() => setLanguage('en')}
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            >
              EN
            </button>
          </div>

          <nav className="nav">
            <Link href="/" className={language ? 'is-current' : ''}>
              {translations[language].projetos}
            </Link>
            <Link href="/information" className={!language ? 'is-current' : ''}>
              {translations[language].informacoes}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
