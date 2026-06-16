export interface JourneyMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  outcome: string;
  year: string;
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "REPORT-001",
    date: "AUG 2021",
    title: "FIRST CONTACT WITH CODE",
    description: "Enrolled in Govenrment Polytechnic Mumbai. First encounter with C programming, basic Data Structures, and the command line terminal.",
    outcome: "OBJECTIVE ACHIEVED",
    year: "2020",
  },
  {
    id: "REPORT-002",
    date: "MID 2022",
    title: "FULL STACK ARCHITECTURE",
    description: "Built first database-driven full-stack web applications. Implemented custom schema designs, authentication logic, and routing layers.",
    outcome: "OBJECTIVE ACHIEVED",
    year: "2022",
  },
  {
    id: "REPORT-003",
    date: "EARLY 2023",
    title: "FIRST PRODUCTION DEPLOYMENT",
    description: "Joined MediSage. Designed learning platform components, built core LMS functions, integrated payment gateways, and handled production deployment.",
    outcome: "OBJECTIVE ACHIEVED",
    year: "2023",
  },
  {
    id: "REPORT-004",
    date: "LATE 2023",
    title: "DECENTRALIZED IPFS DAPP",
    description: "Explored smart contracts and distributed storage networks. Engineered GDrive DApp utilizing Solidity, Hardhat, IPFS nodes, and Ethereum interfaces.",
    outcome: "OBJECTIVE ACHIEVED",
    year: "2023",
  },
  {
    id: "REPORT-005",
    date: "MID 2024",
    title: "JPMORGAN CHASE INTERNSHIP",
    description: "Secured SWE Intern role. Developed internal system dashboards, optimized batch data pipelines, and operated across complex enterprise stacks.",
    outcome: "OBJECTIVE ACHIEVED",
    year: "2025",
  },
  {
    id: "REPORT-006",
    date: "PRESENT",
    title: "ACTIVE SYSTEMS ENGINEERING",
    description: "Architecting highly optimized frontend UI, low-latency APIs, and customized developer tools. Operating under full-scale operational readiness.",
    outcome: "MISSION ACTIVE",
    year: "2026",
  },
];
