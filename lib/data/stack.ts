export interface TechStackItem {
  name: string;
  rating: number; // Out of 10
  label: string;
}

export interface TechStackCategory {
  id: string;
  category: string;
  items: TechStackItem[];
}

export const techStack: TechStackCategory[] = [
  {
    id: "FRONTEND",
    category: "FRONTEND",
    items: [
      { name: "React.js", rating: 10, label: "EXPERT" },
      { name: "Next.js", rating: 10, label: "EXPERT" },
      { name: "TypeScript", rating: 9, label: "ADVANCED" },
      { name: "Tailwind CSS", rating: 8, label: "ADVANCED" },
    ],
  },
  {
    id: "BACKEND",
    category: "BACKEND",
    items: [
      { name: "Node.js", rating: 9, label: "ADVANCED" },
      { name: "Express", rating: 8, label: "ADVANCED" },
      { name: "PostgreSQL", rating: 7, label: "PROFICIENT" },
      { name: "MongoDB", rating: 7, label: "PROFICIENT" },
    ],
  },
  {
    id: "DEVOPS",
    category: "DEVOPS",
    items: [
      { name: "Docker", rating: 6, label: "PROFICIENT" },
      { name: "AWS EC2", rating: 5, label: "WORKING KNOWLEDGE" },
    ],
  },
  {
    id: "WEB3",
    category: "WEB3",
    items: [
      { name: "Solidity", rating: 7, label: "PROFICIENT" },
      { name: "IPFS", rating: 6, label: "FAMILIAR" },
    ],
  },
  {
    id: "MOBILE",
    category: "MOBILE",
    items: [
      { name: "React Native", rating: 8, label: "ADVANCED" },
      { name: "Flutter", rating: 6, label: "PROFICIENT" },
    ],
  },
];
