'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { translations } from '@/lib/translations';
import { getAllProjects } from '@/lib/projects';
import { useLanguage } from '@/lib/useLanguage';

export default function Home() {
  const { language, isMounted } = useLanguage();
  const [availabilityDate, setAvailabilityDate] = useState('');
  const projects = getAllProjects();

  const months = {
    pt: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  useEffect(() => {
    const now = new Date();
    const monthName = months[language][now.getMonth()];
    const year = now.getFullYear();
    setAvailabilityDate(`${monthName} de ${year}`);
  }, [language]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastToggleTime = 0;
    const throttle = 600;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastToggleTime < throttle) return;

      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      const videoElement = document.querySelector('.hero-video') as HTMLElement;
      if (!videoElement) return;

      const isExpanded = videoElement.classList.contains('expanded');

      if (isScrollingDown && !isExpanded) {
        videoElement.classList.add('expanded');
        lastToggleTime = now;
      } else if (!isScrollingDown && isExpanded) {
        videoElement.classList.remove('expanded');
        lastToggleTime = now;
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section className="intro intro-section">
        <div className="intro-header">
          <h1 className="title">{translations[language].freelancerTitle}</h1>
          <div className="availability">
            <div>
              <div className="availability-status">
                <span className="availability-dot"></span>
                <span className="availability-text">{translations[language].disponivel}</span>
              </div>
              <div className="availability-date">{availabilityDate}</div>
            </div>
          </div>
        </div>
        <div className="intro-bottom">
          <p className="lede">{translations[language].freelancerBio}</p>
          <a href="https://wa.me/5571999999999" className="contact-link">
            {translations[language].entrarEmContato}
          </a>
        </div>
        <div className="hero-video">
          <video width="1320" height="792" autoPlay muted loop playsInline>
            <source src="/assets/345137_medium.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="work">
        <h2 className="section-label">{translations[language].projetosSelecionados}</h2>
        <div className="work-grid">
          {projects.map((project) => (
            <div key={project.id} className="work-card-wrapper" style={{ opacity: project.comingSoon ? 0.6 : 1 }}>
              <Link href={project.comingSoon ? '#' : `/projects/${project.slug}`} title={project.comingSoon ? 'Em breve' : ''} className="work-card" style={{ overflow: 'hidden', borderRadius: '8px', pointerEvents: project.comingSoon ? 'none' : 'auto' }} onClick={(e) => project.comingSoon && e.preventDefault()}>
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
                  {project.cover && <img src={project.cover} alt={project.title} style={{ width: '100%', height: '400px', objectFit: 'cover', transition: 'transform 0.3s ease-out', cursor: project.comingSoon ? 'default' : 'pointer' }} onMouseEnter={(e) => !project.comingSoon && (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={(e) => !project.comingSoon && (e.currentTarget.style.transform = 'scale(1)')} />}
                  {project.comingSoon && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', color: 'white', fontSize: '18px', fontWeight: 500 }}>
                      Em breve
                    </div>
                  )}
                </div>
              </Link>
              <h3 className="work-card-title">{project.title}</h3>
              <p className="work-card-description">{project.secondaryTitle}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
