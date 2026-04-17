export interface Project {
  id: number;
  slug: string;
  title: string;
  secondaryTitle: string;
  description: string;
  client: string;
  role: string;
  service: string;
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
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}
