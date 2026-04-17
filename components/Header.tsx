'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/lib/useLanguage';

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, isMounted } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('--:--:--');
  const [projectTitle, setProjectTitle] = useState('');
  const [showProjectTitleInHeader, setShowProjectTitleInHeader] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('pt-BR'));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Previne scroll quando menu está aberto e fecha menu ao mudar de página
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  // Fecha menu ao navegar e garante que está fechado ao montar
  useEffect(() => {
    setMenuOpen(false);
    // Reseta os estados do projeto quando sai de uma página de projeto
    if (!pathname.startsWith('/projects')) {
      setProjectTitle('');
      setShowProjectTitleInHeader(false);
      setShowCloseButton(false);
    }
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Mostra o close button e titulo na header para paginas de projetos
      if (pathname.startsWith('/projects')) {
        setShowCloseButton(window.scrollY > 200);

        // No mobile, detecta quando o titulo do projeto sai da viewport
        const projectTitleEl = document.getElementById('project-title');
        if (projectTitleEl && window.innerWidth <= 768) {
          const rect = projectTitleEl.getBoundingClientRect();
          // Detecta quando o titulo sai da viewport para mostrar o close
          setShowProjectTitleInHeader(rect.top < 0);
          if (!projectTitle && projectTitleEl.textContent) {
            setProjectTitle(projectTitleEl.textContent);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, projectTitle]);

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
          {/* Mobile menu - closed on initial render */}
          <div className="header-mobile-menu" style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: '#ffffff', borderBottom: '1px solid #e5e5e5', borderLeft: '1px solid #e5e5e5', padding: '16px', flexDirection: 'column', gap: '16px', minWidth: '200px' }}></div>
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
          <p style={{
            fontSize: '20px',
            fontWeight: 500,
            color: 'var(--fg)',
            margin: 0,
            padding: 0,
            height: showProjectTitleInHeader && showCloseButton ? 'auto' : 0,
            marginTop: showProjectTitleInHeader && showCloseButton ? '12px' : 0,
            opacity: showProjectTitleInHeader && showCloseButton ? 1 : 0,
            transform: showProjectTitleInHeader && showCloseButton ? 'translateY(0)' : 'translateY(-15px)',
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), height 0.6s cubic-bezier(0.16, 1, 0.3, 1), margin 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: showProjectTitleInHeader && showCloseButton ? 'auto' : 'none',
            overflow: 'hidden'
          }}>
            {projectTitle}
          </p>
          <p className="brand-meta">
            <span>Salvador — Bahia</span>
            <span className="dot">·</span>
            <span data-clock>{currentTime}</span>
          </p>
        </div>

        <div className="header-right">

          {/* Desktop menu */}
          <div className="header-desktop">
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
              <Link href="/" className={pathname === '/' ? 'is-current' : ''}>
                {translations[language].projetos}
              </Link>
              <Link href="/information" className={pathname === '/information' ? 'is-current' : ''}>
                {translations[language].informacoes}
              </Link>
            </nav>

            {showCloseButton && (
              <Link
                href="/"
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-light)',
                  padding: '4px 6px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  transition: 'background-color 0.3s ease',
                  marginLeft: '24px',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e5e5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              >
                ✕
              </Link>
            )}
          </div>

          {/* Mobile close button for projects - replaces hamburger */}
          {showProjectTitleInHeader && showCloseButton ? (
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                color: 'var(--fg)',
                fontSize: '16px',
                cursor: 'pointer',
                opacity: 1,
                transform: 'scale(1) translateY(0)',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              ✕
            </Link>
          ) : (
            <button
              className="header-menu-btn"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(!menuOpen);
              }}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--fg)',
                cursor: 'pointer',
                padding: 0,
                fontSize: '16px',
                width: '16px',
                height: '16px',
                lineHeight: '16px',
                opacity: 1,
                transform: 'scale(1)',
                transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          )}

          {/* Mobile menu */}
          <div
            className={`header-mobile-menu ${menuOpen ? 'open' : ''}`}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #e5e5e5',
              borderLeft: '1px solid #e5e5e5',
              padding: '16px',
              flexDirection: 'column',
              gap: '16px',
              minWidth: '200px'
            }}
          >
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    window.location.href = '/';
                  }}
                  style={{ fontSize: '16px', color: 'var(--fg)' }}
                  className={pathname === '/' ? 'is-current' : ''}
                >
                  {translations[language].projetos}
                </Link>
                <Link
                  href="/information"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    window.location.href = '/information';
                  }}
                  style={{ fontSize: '16px', color: 'var(--fg)' }}
                  className={pathname === '/information' ? 'is-current' : ''}
                >
                  {translations[language].informacoes}
                </Link>
              </nav>
              <div className="lang-switcher" style={{ borderTop: '1px solid #e5e5e5', paddingTop: '12px' }}>
                <button
                  onClick={() => {
                    setLanguage('pt');
                    setMenuOpen(false);
                  }}
                  className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
                >
                  PT
                </button>
                <span className="lang-divider">/</span>
                <button
                  onClick={() => {
                    setLanguage('en');
                    setMenuOpen(false);
                  }}
                  className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                >
                  EN
                </button>
              </div>
            </div>
        </div>
      </div>
    </header>
  );
}
