export interface Project {
  id: number;
  slug: string;
  title: string;
  secondaryTitle: string;
  description: string;
  client: string;
  role: string;
  service: string;
  myRoleDescription: string;
  myRoleIncluded: string[];
  resultsDescription: string;
  discoveryTitle: string;
  discoveryText: string;
  designTitle: string;
  designText: string;
  finalTitle: string;
  finalText: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'project-1',
    title: 'M5',
    secondaryTitle: 'O Banco que investe em resultados',
    description: 'A M5 é um banco digital pensado para quem vive de tráfego pago. Aqui, você abre sua conta em minutos, cria cartões dedicados para cada campanha e acompanha seus gastos com anúncios em tempo real, sem depender de banco tradicional, sem burocracia, sem limite travado.',
    client: 'M5',
    role: 'Product Designer',
    service: 'UX/UI Design',
    myRoleDescription: 'Nesse projeto atue como UX/UI Designer, responsável por conduzir pesquisas, criar wireframes, protótipos e colaborar com times de desenvolvimento e produto para entregar uma experiência digital intuitiva e centrada no usuário.',
    myRoleIncluded: ['UI', 'Wireframes', 'Protótipos', 'Fluxos do usuário', 'Pesquisa de usuário', 'Colaboração com times de desenvolvimento e produto'],
    resultsDescription: 'Resultados alcançados com o projeto, como aumento de conversões, melhoria na experiência do usuário, feedback positivo dos clientes, uso fácil do produto para alcançar os objetivos do usuario e assim conseguindo aumentar a satisfação do cliente e o sucesso do produto.',
    discoveryTitle: 'Descoberta',
    discoveryText: 'Começamos o projeto com uma fase de descoberta, onde realizamos pesquisas para entender as necessidades dos usuários, o mercado e os concorrentes. Isso nos ajudou a definir as principais funcionalidades e a direção do design.',
    designTitle: 'Design',
    designText: 'Fizemos a criação de wireframes e protótipos para validar as ideias de design, garantindo que a experiência fosse intuitiva e centrada no usuário. Colaboramos estreitamente com os times de desenvolvimento e produto para iterar e refinar o design com base no feedback contínuo. Assim chegando a um resultado final que atendeu às necessidades dos usuários e aos objetivos do negócio.',
    finalTitle: 'Final',
    finalText: 'Ao final do projeto, entregamos uma experiência digital que foi bem recebida pelos usuários, resultando em um aumento significativo nas conversões e na satisfação do cliente. O produto se destacou no mercado por sua facilidade de uso e por atender às necessidades específicas dos usuários de tráfego pago, contribuindo para o sucesso geral do banco digital M5. Ainda estamos em processo de acompanhamento dos resultados e iterando com base no feedback dos usuários para continuar melhorando a experiência ao longo do tempo.',
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
    myRoleDescription: 'Descrição do meu papel neste projeto',
    myRoleIncluded: ['Atribuição 1', 'Atribuição 2', 'Atribuição 3', 'Atribuição 4', 'Atribuição 5'],
    resultsDescription: 'Descrição dos resultados alcançados',
    discoveryTitle: 'Descoberta',
    discoveryText: 'Texto sobre a fase de descoberta do projeto',
    designTitle: 'Design',
    designText: 'Texto sobre a fase de design do projeto',
    finalTitle: 'Final',
    finalText: 'Texto sobre a fase final do projeto',
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
    myRoleDescription: 'Descrição do meu papel neste projeto',
    myRoleIncluded: ['Atribuição 1', 'Atribuição 2', 'Atribuição 3', 'Atribuição 4', 'Atribuição 5'],
    resultsDescription: 'Descrição dos resultados alcançados',
    discoveryTitle: 'Descoberta',
    discoveryText: 'Texto sobre a fase de descoberta do projeto',
    designTitle: 'Design',
    designText: 'Texto sobre a fase de design do projeto',
    finalTitle: 'Final',
    finalText: 'Texto sobre a fase final do projeto',
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
    myRoleDescription: 'Descrição do meu papel neste projeto',
    myRoleIncluded: ['Atribuição 1', 'Atribuição 2', 'Atribuição 3', 'Atribuição 4', 'Atribuição 5'],
    resultsDescription: 'Descrição dos resultados alcançados',
    discoveryTitle: 'Descoberta',
    discoveryText: 'Texto sobre a fase de descoberta do projeto',
    designTitle: 'Design',
    designText: 'Texto sobre a fase de design do projeto',
    finalTitle: 'Final',
    finalText: 'Texto sobre a fase final do projeto',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return projects;
}
