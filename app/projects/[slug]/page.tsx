'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  };

  const getProjectTranslation = (key: string) => {
    const projectTranslations = (translations as any)[language]?.projects?.[(project?.slug as any)];
    return getNestedValue(projectTranslations, key) || getNestedValue(project, key);
  };

  const getOtherProjectTranslation = (slug: string, key: string) => {
    const projectTranslations = (translations as any)[language]?.projects?.[slug as any];
    const otherProject = allProjects?.find(p => p.slug === slug);
    return (projectTranslations as any)?.[key] || (otherProject as any)?.[key];
  };

  const getResponsiveImagePath = (imagePath: string) => {
    const pathParts = imagePath.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const folder = pathParts.slice(0, -1).join('/');
    const fileNameWithoutExt = fileName.replace('.png', '');
    const mobileFile = `${fileNameWithoutExt} mobile.png`;
    const mobilePath = `${folder}/${mobileFile}`;
    const encodeUrl = (path: string) => path.replace(/ /g, '%20');
    return { mobile: encodeUrl(mobilePath), desktop: encodeUrl(imagePath) };
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
        {project.images.hero && (() => {
          if (slug === 'Freela') {
            const paths = getResponsiveImagePath(project.images.hero);
            return <Image ref={heroImageRef} src={paths.desktop} alt={project.title} width={1200} height={792} priority sizes="(max-width: 600px) 100vw, 1200px" className={isExiting ? 'hero-image-exit' : isReady ? 'hero-image-animate' : ''} style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 792px)', objectFit: 'cover', borderRadius: '8px', marginTop: '32px' }} />;
          }
          return <Image ref={heroImageRef} src={project.images.hero} alt={project.title} width={1200} height={792} priority sizes="(max-width: 768px) 100vw, 1200px" className={isExiting ? 'hero-image-exit' : isReady ? 'hero-image-animate' : ''} style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 792px)', objectFit: 'cover', borderRadius: '8px', marginTop: '32px' }} />;
        })()}
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
                {(project as any).liveLink && (
                  <div style={{ marginTop: '80px' }}>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{language === 'pt' ? 'PROJETO AO VIVO' : 'LIVE PROJECT'}</p>
                    <a href={(project as any).liveLink} target="_blank" rel="noopener noreferrer" className="contact-link">
                      {language === 'pt' ? 'Veja agora' : 'View now'}
                    </a>
                  </div>
                )}
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

        {(project as any).introImage && (
          <img src={(project as any).introImage} alt="Project intro" loading="lazy" style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '8px', marginTop: '80px' }} />
        )}

        {project.apps && project.apps.length > 0 ? (
          project.apps.map((app, appIndex) => (
            <div key={appIndex}>
              <div className="project-grid-2col grid-2col" style={{ marginTop: '80px' }}>
                <div></div>
                <section className="card-stack" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <h2 className="heading-section">{getProjectTranslation(`apps.${appIndex}.title`) || app.title}</h2>
                  {app.description && (
                    <p className="paragraph-muted">{getProjectTranslation(`apps.${appIndex}.description`) || app.description}</p>
                  )}
                </section>
              </div>

              {slug === 'Freela' && appIndex === 0 && (
                <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                  {(() => { const paths = getResponsiveImagePath('/assets/Freela/Card 2 results.png'); return <img srcSet={`${paths.mobile} 600w, ${paths.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths.desktop} alt={`${app.title} Result 1`} loading="lazy" className="card-stack" style={{ width: '100%', borderRadius: '8px', gridColumn: '1 / -1' }} />; })()}
                </div>
              )}


              {slug === 'Freela' && appIndex === 1 && (
                <div className="grid-2col" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '80px' }}>
                  {(() => { const paths = getResponsiveImagePath('/assets/Freela/card 4 results.png'); return <img srcSet={`${paths.mobile} 600w, ${paths.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths.desktop} alt="Dashboard Result" loading="lazy" className="card-stack" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 600px)', borderRadius: '8px', objectFit: 'cover' }} />; })()}
                  {(() => { const paths = getResponsiveImagePath('/assets/Freela/card 3 results.png'); return <img srcSet={`${paths.mobile} 600w, ${paths.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths.desktop} alt="Dashboard Result" loading="lazy" className="card-stack" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 600px)', borderRadius: '8px', objectFit: 'cover' }} />; })()}
                  {(() => { const paths = getResponsiveImagePath('/assets/Freela/card 5 results.png'); return <img srcSet={`${paths.mobile} 600w, ${paths.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths.desktop} alt="Dashboard Result" loading="lazy" className="card-stack" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 600px)', borderRadius: '8px', objectFit: 'cover' }} />; })()}
                  {(() => { const paths = getResponsiveImagePath('/assets/Freela/card 6 results.png'); return <img srcSet={`${paths.mobile} 600w, ${paths.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths.desktop} alt="Dashboard Result" loading="lazy" className="card-stack" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 600px)', borderRadius: '8px', objectFit: 'cover' }} />; })()}
                  {(() => { const paths = getResponsiveImagePath('/assets/Freela/card 7 results.png'); return <img srcSet={`${paths.mobile} 600w, ${paths.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths.desktop} alt="Dashboard Result" loading="lazy" className="card-stack" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 600px)', borderRadius: '8px', objectFit: 'cover' }} />; })()}
                </div>
              )}

              {app.images.hero && (
                <img src={app.images.hero} alt={app.title} loading="lazy" style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '8px', marginTop: '80px' }} />
              )}

              {app.images.features.some(img => img) && (
                <div className="project-grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '80px' }}>
                  {app.images.features.map((img, index) => {
                    const paths = getResponsiveImagePath(img);
                    return img && <img key={index} srcSet={`${paths.mobile} 600w, ${paths.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths.desktop} alt={`${app.title} Feature ${index + 1}`} loading="lazy" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.7, 704px)', borderRadius: '8px', objectFit: 'cover' }} />;
                  })}
                </div>
              )}

              {app.images.results.some(img => img) && (
                <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '80px' }}>
                  {(() => {
                    const paths0 = getResponsiveImagePath(app.images.results[0]);
                    return <img srcSet={`${paths0.mobile} 600w, ${paths0.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths0.desktop} alt={`${app.title} Result 1`} loading="lazy" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 600px)', borderRadius: '8px', gridColumn: '1 / -1', objectFit: 'cover' }} />;
                  })()}
                  {app.images.results[1] && (() => {
                    const paths1 = getResponsiveImagePath(app.images.results[1]);
                    const isMotorista = appIndex === 1;
                    return <img srcSet={`${paths1.mobile} 600w, ${paths1.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths1.desktop} alt={`${app.title} Result 2`} loading="lazy" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 600px)', borderRadius: '8px', gridColumn: isMotorista ? '1 / -1' : 'auto', objectFit: 'cover' }} />;
                  })()}
                  {app.images.results[2] && (() => {
                    const paths2 = getResponsiveImagePath(app.images.results[2]);
                    return <img srcSet={`${paths2.mobile} 600w, ${paths2.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths2.desktop} alt={`${app.title} Result 3`} loading="lazy" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 600px)', borderRadius: '8px', objectFit: 'cover' }} />;
                  })()}
                  {app.images.results[3] && (() => {
                    const paths3 = getResponsiveImagePath(app.images.results[3]);
                    const isMotorista = appIndex === 1;
                    return <img srcSet={`${paths3.mobile} 600w, ${paths3.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths3.desktop} alt={`${app.title} Result 4`} loading="lazy" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 600px)', borderRadius: '8px', gridColumn: isMotorista ? 'auto' : '1 / -1', objectFit: 'cover' }} />;
                  })()}
                </div>
              )}
            </div>
          ))
        ) : (
          project.images.features.some(img => img) && (
            <div className="project-grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '80px' }}>
              {project.images.features.map((img, index) => {
                const paths = getResponsiveImagePath(img);
                return img && <img key={index} srcSet={`${paths.mobile} 600w, ${paths.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths.desktop} alt={`Feature ${index + 1}`} loading="lazy" className="card-stack" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.7, 704px)', borderRadius: '8px', objectFit: 'cover' }} />;
              })}
            </div>
          )
        )}

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
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {getProjectTranslation('designText')}
                </p>
              </div>

              <div>
                <h3 className="heading-subsection">{getProjectTranslation('finalTitle')}</h3>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {getProjectTranslation('finalText')}
                </p>
              </div>
            </div>

          </div>
        </div>

        {!project.apps && (
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '80px' }}>
            {(() => {
              const paths0 = getResponsiveImagePath(project.images.results[0]);
              return <img srcSet={`${paths0.mobile} 600w, ${paths0.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths0.desktop} alt="Result 1" loading="lazy" className="card-stack" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 600px)', borderRadius: '8px', objectFit: 'cover', gridColumn: '1 / -1' }} />;
            })()}
            {project.images.results[1] && (() => {
              const paths1 = getResponsiveImagePath(project.images.results[1]);
              return <img srcSet={`${paths1.mobile} 600w, ${paths1.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths1.desktop} alt="Result 2" loading="lazy" className="card-stack" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 600px)', borderRadius: '8px', objectFit: 'cover' }} />;
            })()}
            {project.images.results[2] && (() => {
              const paths2 = getResponsiveImagePath(project.images.results[2]);
              return <img srcSet={`${paths2.mobile} 600w, ${paths2.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths2.desktop} alt="Result 3" loading="lazy" className="card-stack" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 600px)', borderRadius: '8px', objectFit: 'cover' }} />;
            })()}
            {project.images.results[3] && (() => {
              const paths3 = getResponsiveImagePath(project.images.results[3]);
              return <img srcSet={`${paths3.mobile} 600w, ${paths3.desktop} 1256w`} sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" src={paths3.desktop} alt="Result 4" loading="lazy" className="card-stack" style={{ width: '100%', height: 'clamp(300px, 100vw * 0.56, 600px)', borderRadius: '8px', objectFit: 'cover', gridColumn: '1 / -1' }} />;
            })()}
          </div>
        )}
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
                        {proj.thumbnail && <img src={proj.thumbnail} alt={proj.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
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
