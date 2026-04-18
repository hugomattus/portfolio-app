'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProject, getAllProjects } from '@/lib/projects';
import { translations } from '@/lib/translations';
import { useLanguage } from '@/lib/useLanguage';
import type { Project } from '@/lib/projects';

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { language } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const heroImageRef = useRef<HTMLImageElement>(null);

  const getProjectTranslation = (key: string) => {
    const projectTranslations = translations[language as keyof typeof translations]?.projects?.[project?.slug as keyof any];
    return projectTranslations?.[key as keyof typeof projectTranslations] || project?.[key as keyof Project];
  };

  const getOtherProjectTranslation = (slug: string, key: string) => {
    const projectTranslations = translations[language as keyof typeof translations]?.projects?.[slug as keyof any];
    const otherProject = allProjects?.find(p => p.slug === slug);
    return projectTranslations?.[key as keyof typeof projectTranslations] || otherProject?.[key as keyof Project];
  };

  useEffect(() => {
    setIsExiting(false);
    const foundProject = getProject(slug);
    setProject(foundProject || null);
    setIsReady(false);
    document.documentElement.classList.add('hero-animating');
    document.body.classList.add('hero-animating');
    setTimeout(() => setIsReady(true), 50);
    setTimeout(() => {
      document.documentElement.classList.remove('hero-animating');
      document.body.classList.remove('hero-animating');
    }, 1500);
  }, [slug]);

  const handleProjectExit = () => {
    setIsExiting(true);
  };

  if (!project) {
    return <div>Project not found</div>;
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  return (
    <div className="project-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '96px' }}>
      <div className="project-header-section" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '48px' }}>
        <div className={isReady ? 'project-header-animate' : ''} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: '32px' }}>
          <h1 id="project-title" className="project-title" style={{ fontSize: '32px', fontWeight: 500, margin: 0, lineHeight: 1, letterSpacing: '-0.01em' }}>
            {getProjectTranslation('title')}
          </h1>
          <Link
            href="/"
            style={{
              fontSize: '16px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              backgroundColor: 'var(--bg-light)',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e5e5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          >
            ✕
          </Link>
        </div>
        <img ref={heroImageRef} src={project.images.hero} alt={project.title} className={isExiting ? 'hero-image-exit' : isReady ? 'hero-image-animate' : ''} style={{ width: '100%', height: '792px', objectFit: 'cover', borderRadius: '8px', marginTop: '32px' }} />
        <div className="project-grid-2col grid-2col">
          <div></div>
          <section className="card-stack" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 className="heading-section">{getProjectTranslation('secondaryTitle')}</h2>
            <p className="paragraph-muted">
              {getProjectTranslation('description')}
            </p>
            <div className="card-stack" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{language === 'pt' ? 'CLIENTE' : 'CLIENT'}</p>
                <p style={{ fontSize: '16px', color: 'var(--fg)' }}>{getProjectTranslation('client')}</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{language === 'pt' ? 'PAPEL' : 'ROLE'}</p>
                <p style={{ fontSize: '16px', color: 'var(--fg)' }}>{getProjectTranslation('role')}</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{language === 'pt' ? 'SERVIÇO' : 'SERVICE'}</p>
                <p style={{ fontSize: '16px', color: 'var(--fg)' }}>{getProjectTranslation('service')}</p>
              </div>
            </div>
            <section className="card-stack" style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '80px' }}>
              <h2 className="heading-section">{language === 'pt' ? 'Meu papel' : 'My Role'}</h2>
              <p className="paragraph-muted">
                {getProjectTranslation('myRoleDescription')}
              </p>
              <div style={{ marginTop: '24px' }}>
                <p style={{ fontSize: '16px', color: 'var(--fg)', fontWeight: 500, marginBottom: '16px' }}>{language === 'pt' ? 'Meu papel incluiu' : 'My role included'}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {(getProjectTranslation('myRoleIncluded') as string[] || []).map((item, index) => (
                    <li key={index} style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>• {item}</li>
                  ))}
                </ul>
              </div>
            </section>
          </section>
        </div>

        <div className="project-grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '80px' }}>
          {project.images.features.map((img, index) => (
            <img key={index} src={img} alt={`Feature ${index + 1}`} className="card-stack" style={{ width: '100%', height: '704px', borderRadius: '8px', objectFit: 'cover' }} />
          ))}
        </div>

        <div className="project-grid-2col grid-2col">
          <div></div>
          <div className="card-stack" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 className="heading-section">{language === 'pt' ? 'Resultados' : 'Results'}</h2>
            <p className="paragraph-muted">
              {getProjectTranslation('resultsDescription')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '24px' }}>
              <div>
                <h3 className="heading-subsection">{getProjectTranslation('discoveryTitle')}</h3>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {getProjectTranslation('discoveryText')}
                </p>
              </div>

              <div>
                <h3 className="heading-subsection">{getProjectTranslation('designTitle')}</h3>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {getProjectTranslation('designText')}
                </p>
              </div>

              <div>
                <h3 className="heading-subsection">{getProjectTranslation('finalTitle')}</h3>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {getProjectTranslation('finalText')}
                </p>
              </div>
            </div>

          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '80px' }}>
          <img src={project.images.results[0]} alt="Result 1" className="card-stack" style={{ width: '100%', height: '600px', borderRadius: '8px', objectFit: 'cover', gridColumn: '1 / -1' }} />
          <img src={project.images.results[1]} alt="Result 2" className="card-stack" style={{ width: '100%', height: '600px', borderRadius: '8px', objectFit: 'cover' }} />
          <img src={project.images.results[2]} alt="Result 3" className="card-stack" style={{ width: '100%', height: '600px', borderRadius: '8px', objectFit: 'cover' }} />
          <img src={project.images.results[3]} alt="Result 4" className="card-stack" style={{ width: '100%', height: '600px', borderRadius: '8px', objectFit: 'cover', gridColumn: '1 / -1' }} />
        </div>
      </div>

      <div className="project-grid-2col grid-2col">
        <div>
          <h2 className="heading-section">{language === 'pt' ? 'Explore' : 'Explore'}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 className="heading-section" style={{ color: 'var(--text-secondary)' }}>{language === 'pt' ? 'Outros projetos' : 'Other Projects'}</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0' }}>
            {allProjects.map((proj) => (
              proj.slug !== slug && (
                <li
                  key={proj.slug}
                  onMouseEnter={() => setHoveredProject(proj.slug)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', paddingTop: '24px', paddingBottom: '24px', borderBottom: '1px solid #e5e5e5' }}
                >
                  <Link href={`/projects/${proj.slug}`} className="project-list-link" onClick={handleProjectExit} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: 'var(--fg)', textDecoration: 'none' }}>
                    <span className="project-list-year" style={{ fontSize: '14px', color: 'var(--text-secondary)', marginRight: '80px' }}>{proj.year || '2025'}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
                      <div className="project-thumbnail" style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: 'var(--bg-light)',
                        borderRadius: '4px',
                        flexShrink: 0,
                        transform: hoveredProject === proj.slug ? 'translateX(calc(100% + 16px))' : 'translateX(0)',
                        transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        overflow: 'hidden'
                      }}>
                        {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                      </div>
                      <span style={{ transform: hoveredProject === proj.slug ? 'translateX(calc(-100% - 16px))' : 'translateX(0)', transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>{getOtherProjectTranslation(proj.slug, 'title')}</span>
                    </div>
                  </Link>
                  <p style={{ fontSize: '16px', color: 'var(--text-secondary)', textAlign: 'right', maxWidth: '300px', lineHeight: 1.5 }}>
                    {getOtherProjectTranslation(proj.slug, 'secondaryTitle')}
                  </p>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
