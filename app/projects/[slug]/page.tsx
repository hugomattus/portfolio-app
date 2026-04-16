'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProject, getAllProjects } from '@/lib/projects';
import type { Project } from '@/lib/projects';

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);

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
    <div className="flex flex-col gap-24">
      <div className="flex flex-col gap-8 pt-20">
        <h1 className="text-5xl font-medium leading-tight tracking-tight">
          {project.title}
        </h1>
        <div className="grid grid-cols-3 gap-8 py-8 border-t border-b border-gray-300">
          <div>
            <p className="font-mono text-xs text-gray-600 mb-2">CLIENT</p>
            <p className="font-mono text-sm">{project.client}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-gray-600 mb-2">ROLE</p>
            <p className="font-mono text-sm">{project.role}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-gray-600 mb-2">SERVICE</p>
            <p className="font-mono text-sm">{project.service}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-gray-200 aspect-video overflow-hidden">
        <div className="w-full h-full bg-gray-300"></div>
      </div>

      <section className="flex flex-col gap-8">
        <h2 className="text-3xl font-medium tracking-tight">{project.secondaryTitle}</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          {project.description}
        </p>
      </section>

      {project.sections.map((section, index) => (
        <section key={index} className="flex flex-col gap-8">
          {section.title && (
            <h2 className="text-3xl font-medium tracking-tight">{section.title}</h2>
          )}
          {section.description && (
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              {section.description}
            </p>
          )}
          {section.images && section.images.length > 0 && (
            <div className="grid grid-cols-2 gap-6">
              {section.images.map((image, imgIndex) => (
                <div key={imgIndex} className="rounded-lg bg-gray-200 aspect-square overflow-hidden">
                  <div className="w-full h-full bg-gray-300"></div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      <section className="flex flex-col gap-8">
        <h2 className="text-3xl font-medium tracking-tight">Results</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          {project.results}
        </p>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-3xl font-medium tracking-tight">Lessons Learned</h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          {project.lessonsLearned}
        </p>
      </section>

      <div className="flex justify-between items-end py-12 border-t border-gray-300">
        <Link href={`/projects/${prevProject.slug}`} className="font-mono text-sm font-medium hover:underline">
          ← Previous
        </Link>
        <Link href="/" className="font-mono text-sm font-medium text-gray-600 hover:text-black">
          All Projects
        </Link>
        <Link href={`/projects/${nextProject.slug}`} className="font-mono text-sm font-medium hover:underline">
          Next →
        </Link>
      </div>
    </div>
  );
}
