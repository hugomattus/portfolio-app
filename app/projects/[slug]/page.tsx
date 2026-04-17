'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProject, getAllProjects } from '@/lib/projects';
import type { Project } from '@/lib/projects';

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const foundProject = getProject(slug);
    setProject(foundProject || null);
  }, [slug]);

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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: '32px' }}>
          <h1 id="project-title" style={{ fontSize: '20px', fontWeight: 500, margin: 0, lineHeight: 1, letterSpacing: '-0.01em' }}>
            {project.title}
          </h1>
          <Link
            href="/"
            style={{
              fontSize: '16px',
              color: '#6b7280',
              cursor: 'pointer',
              backgroundColor: '#f3f4f6',
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
        <div style={{ width: '100%', height: '792px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginTop: '32px' }}></div>
        <div className="project-grid-2col grid-2col">
          <div></div>
          <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 className="heading-section">{project.secondaryTitle}</h2>
            <p className="paragraph-muted">
              {project.description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>CLIENT</p>
                <p style={{ fontSize: '16px', color: '#111111' }}>{project.client}</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>ROLE</p>
                <p style={{ fontSize: '16px', color: '#111111' }}>{project.role}</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>SERVICE</p>
                <p style={{ fontSize: '16px', color: '#111111' }}>{project.service}</p>
              </div>
            </div>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '80px' }}>
              <h2 className="heading-section">Meu papel</h2>
              <p className="paragraph-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div style={{ marginTop: '24px' }}>
                <p style={{ fontSize: '16px', color: '#111111', fontWeight: 500, marginBottom: '16px' }}>Meu papel incluiu</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ fontSize: '16px', color: '#6b7280' }}>• Atribuição 1</li>
                  <li style={{ fontSize: '16px', color: '#6b7280' }}>• Atribuição 2</li>
                  <li style={{ fontSize: '16px', color: '#6b7280' }}>• Atribuição 3</li>
                  <li style={{ fontSize: '16px', color: '#6b7280' }}>• Atribuição 4</li>
                  <li style={{ fontSize: '16px', color: '#6b7280' }}>• Atribuição 5</li>
                </ul>
              </div>
              <p className="paragraph-muted" style={{ marginTop: '24px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </section>
          </section>
        </div>

        <div className="project-grid-4img" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '80px' }}>
          <div className="project-img-400 placeholder-box-400"></div>
          <div className="project-img-400 placeholder-box-400"></div>
          <div className="project-img-400 placeholder-box-400"></div>
          <div className="project-img-400 placeholder-box-400"></div>
        </div>

        <div className="project-grid-2col grid-2col">
          <div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 className="heading-section">Resultados</h2>
            <p className="paragraph-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '24px' }}>
              <div>
                <h3 className="heading-subsection">Descoberta</h3>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.6 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div>
                <h3 className="heading-subsection">Design</h3>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.6 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div>
                <h3 className="heading-subsection">Final</h3>
                <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: 1.6 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '24px', marginTop: '80px' }}>
          <div className="project-img-600 placeholder-box-600"></div>
          <div className="project-img-600 placeholder-box-600"></div>
          <div className="project-img-600 placeholder-box-600"></div>
        </div>
      </div>

      <div className="project-grid-2col grid-2col">
        <div>
          <h2 className="heading-section">Explore</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 className="heading-section" style={{ color: '#6b7280' }}>Outros projetos</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0' }}>
            {allProjects.map((proj) => (
              proj.slug !== slug && (
                <li
                  key={proj.slug}
                  onMouseEnter={() => setHoveredProject(proj.slug)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', paddingTop: '24px', paddingBottom: '24px', borderBottom: '1px solid #e5e5e5' }}
                >
                  <Link href={`/projects/${proj.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '16px', color: '#111111', textDecoration: 'none' }}>
                    <span className="project-list-year" style={{ fontSize: '14px', color: '#6b7280', marginRight: '80px' }}>2025</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
                      <div className="project-thumbnail" style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '4px',
                        flexShrink: 0,
                        transform: hoveredProject === proj.slug ? 'translateX(calc(100% + 16px))' : 'translateX(0)',
                        transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      }}></div>
                      <span style={{ transform: hoveredProject === proj.slug ? 'translateX(calc(-100% - 16px))' : 'translateX(0)', transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>{proj.title}</span>
                    </div>
                  </Link>
                  <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'right', maxWidth: '200px' }}>
                    {proj.description}
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
