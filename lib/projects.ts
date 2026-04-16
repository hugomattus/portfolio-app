export interface Project {
  id: number;
  slug: string;
  title: string;
  secondaryTitle: string;
  description: string;
  client: string;
  role: string;
  service: string;
  images: string[];
  sections: ProjectSection[];
  results: string;
  lessonsLearned: string;
}

export interface ProjectSection {
  title: string;
  description: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'project-1',
    title: 'World Chat',
    secondaryTitle: 'Tools for Humanity',
    description: 'Project description',
    client: 'Client Name',
    role: 'Product Designer',
    service: 'Design + Interaction',
    images: [],
    sections: [
      {
        title: 'Section 1',
        description: 'Description here',
      },
    ],
    results: 'Results here',
    lessonsLearned: 'Lessons learned here',
  },
  {
    id: 2,
    slug: 'project-2',
    title: 'Smart Trades',
    secondaryTitle: 'Young Platform',
    description: 'Project description',
    client: 'Client Name',
    role: 'Product Designer',
    service: 'Design + Interaction',
    images: [],
    sections: [
      {
        title: 'Section 1',
        description: 'Description here',
      },
    ],
    results: 'Results here',
    lessonsLearned: 'Lessons learned here',
  },
  {
    id: 3,
    slug: 'project-3',
    title: 'Moneyboxes',
    secondaryTitle: 'Young Platform',
    description: 'Project description',
    client: 'Client Name',
    role: 'Product Designer',
    service: 'Design + Interaction',
    images: [],
    sections: [
      {
        title: 'Section 1',
        description: 'Description here',
      },
    ],
    results: 'Results here',
    lessonsLearned: 'Lessons learned here',
  },
  {
    id: 4,
    slug: 'project-4',
    title: 'Mini Apps',
    secondaryTitle: 'Young Platform',
    description: 'Project description',
    client: 'Client Name',
    role: 'Product Designer',
    service: 'Design + Interaction',
    images: [],
    sections: [
      {
        title: 'Section 1',
        description: 'Description here',
      },
    ],
    results: 'Results here',
    lessonsLearned: 'Lessons learned here',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}
