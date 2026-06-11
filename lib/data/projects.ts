export interface Project {
  id: string;
  title: string;
  objective: string;
  description: string;
  stack: string[];
  status: "ACTIVE" | "COMPLETED";
  github: string;
  live: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "CASE-005",
    title: "MARATHA HISTORY PLATFORM",
    objective: "Interactive history documentation platform utilizing immersive visual tracks.",
    description: "Developed an interactive educational portal utilizing Three.js and GSAP for scroll-driven historical timelines and assets cataloging. Implemented custom WebGL rendering layers.",
    stack: ["Three.js", "GSAP", "React", "Tailwind CSS", "Vite"],
    status: "ACTIVE",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: "CASE-001",
    title: "GDRIVE DAPP",
    objective: "Decentralized file storage eliminating centralized cloud control points.",
    description: "Deployed smart contracts on Ethereum for access control. IPFS for distributed file storage. React frontend with MetaMask integration.",
    stack: ["Solidity", "IPFS", "React", "Ethers.js", "Hardhat"],
    status: "COMPLETED",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: "CASE-002",
    title: "STUDYNEX",
    objective: "High-performance virtual classroom platform for academic tracking.",
    description: "Designed real-time LMS capabilities with multi-role permissions. Built robust streaming frameworks and integrated assessment portals.",
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "Socket.io"],
    status: "COMPLETED",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: "CASE-003",
    title: "SMARTCHAT",
    objective: "Encrypted communication service utilizing real-time data sync.",
    description: "Implemented a collaborative chat portal utilizing GraphQL subscriptions. Integrated secure user sessions via GitHub OAuth integrations.",
    stack: ["GraphQL", "React", "Apollo Client", "Node.js", "GitHub OAuth"],
    status: "COMPLETED",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: "CASE-004",
    title: "INSTAGRAM CLONE",
    objective: "Native social platform mockup focusing on low memory footprints.",
    description: "Built cross-platform social feeds using React Native. Developed custom layout caching systems and camera feed integrations.",
    stack: ["React Native", "Expo", "Redux Toolkit", "Firebase API"],
    status: "COMPLETED",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    id: "CASE-006",
    title: "DEPRESSION DETECTION AI",
    objective: "Multimodal screening system classifying mental health markers.",
    description: "Engineered deep learning classifier utilizing BiLSTM neural nets. Processed audio frequencies and text sequences for screen validation.",
    stack: ["Python", "BiLSTM", "TensorFlow", "NLP", "Librosa"],
    status: "COMPLETED",
    github: "#",
    live: "#",
    featured: false,
  },
];
