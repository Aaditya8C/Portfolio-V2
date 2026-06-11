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
  logo?: string;
  bullets?: string[];
  role?: string;
  period?: string;
}

export const projects: Project[] = [
  {
    id: "CASE-001",
    title: "StudyNex – Real-Time Group Study Platform",
    objective: "Built a scalable real-time collaboration platform with WebSocket-based chat and Discord-like dynamic channels.",
    description: "Integrated gamified leaderboard using Recharts to drive engagement and retention, and supported multi-format file uploads via Cloudinary.",
    stack: [
      "Next.js",
      "Node.js",
      "Express.js",
      "WebSockets",
      "MongoDB",
      "Cloudinary",
      "Recharts",
    ],
    status: "COMPLETED",
    github: "https://github.com/COD-23/StudyNex---Frontend",
    live: "https://study-nex.vercel.app/",
    logo: "/projects/study.png",
    featured: true,
  },
  {
    id: "CASE-002",
    title: "DevTrace – Developer Contribution Analyzer",
    objective: "High-performance developer contribution analyzer and AI-powered resume/report generator scanning git repositories.",
    description: "Compiles deep analytics on commit frequency, file changes, tech footprint, and development patterns. Integrates Spring RestClient with LLMs to generate achievement bullet points.",
    stack: [
      "Next.js",
      "Spring Boot",
      "Java",
      "JGit",
      "OAuth2",
      "Framer Motion",
      "Recharts",
      "Gemini API"
    ],
    status: "COMPLETED",
    github: "https://github.com/Aaditya8C/DevTrace",
    live: "devx-devtrace.vercel.app",
    logo: "/projects/devtrace.png",
    featured: false,
  },
  {
    id: "CASE-003",
    title: "Multimodal Depression Detection System",
    objective: "Developed an AI-driven system to detect depression signals using multimodal inputs (facial expressions, speech patterns, and textual sentiment).",
    description: "Combined computer vision, NLP, and audio analysis to improve prediction robustness, with extensibility for future clinical-grade EEG analysis.",
    stack: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "OpenCV",
      "NLP",
      "Speech Processing",
      "Flask",
    ],
    status: "COMPLETED",
    github: "https://github.com/Aaditya8C/Depression_Detection_Using_Fusion_Models",
    live: "",
    featured: false,
  },
  {
    id: "CASE-004",
    title: "DSync – Decentralized File Sharing Platform",
    objective: "Engineered a blockchain-based file sharing system where users authenticate via MetaMask and upload files to IPFS.",
    description: "Implemented fine-grained access control (grant/revoke permissions) using smart contracts, eliminating reliance on centralized storage.",
    stack: [
      "Next.js",
      "TypeScript",
      "Solidity",
      "Ethers.js",
      "IPFS",
      "Pinata",
      "MetaMask",
    ],
    status: "COMPLETED",
    github: "https://github.com/Aaditya8C/GDrive-Dapp-Client",
    live: "https://gdrive-dapp.vercel.app/",
    logo: "/projects/gdrive.png",
    featured: false,
  },
  {
    id: "CASE-005",
    title: "Competitive Programming Analytics Platform",
    objective: "Built a centralized analytics platform for the college's CP club, aggregating data from LeetCode, Codeforces, and CodeChef.",
    description: "Implemented features such as global leaderboard, topic-wise analysis, heatmaps, and contest calendar. Optimized fetching using GraphQL.",
    stack: ["Next.js", "Tailwind CSS", "Axios", "GraphQL", "LocalStorage"],
    status: "COMPLETED",
    github: "https://github.com/Aaditya8C/CP-CLUB-Website",
    live: "https://cp-club-vjti.vercel.app/",
    logo: "/projects/cp-club.png",
    featured: false,
  },
  {
    id: "CASE-006",
    title: "NFT Auction Platform",
    objective: "Built a blockchain-based NFT auction system where users can mint, bid, and trade digital assets on-chain.",
    description: "Implemented smart contracts for bidding logic, ownership transfer, and auction lifecycle, ensuring transparency and trustless execution.",
    stack: ["Solidity", "Ethers.js", "Next.js", "IPFS", "MetaMask"],
    status: "COMPLETED",
    github: "https://github.com/Aaditya8C/COC_NFT_Auction",
    live: "https://eth-nft-auction.vercel.app/",
    logo: "/projects/nft-auction.png",
    featured: false,
  },
];

