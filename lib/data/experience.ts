export interface ExperienceEntry {
  id: string;
  org: string;
  role: string;
  period: string;
  location: string;
  status: "ACTIVE" | "COMPLETED" | "ONGOING";
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "EXP-001",
    org: "JPMORGAN CHASE",
    role: "Software Engineering Intern",
    period: "2024 — PRESENT",
    location: "MUMBAI",
    status: "ACTIVE",
    bullets: [
      "Developed high-throughput data pipelines using Python, reducing batch processing execution cycles by 35%.",
      "Built diagnostic internal dashboard tools utilizing React and TypeScript for system telemetry auditing.",
      "Collaborated with a cross-functional team of 8 software engineers to support production financial services infrastructure.",
    ],
  },
  {
    id: "EXP-002",
    org: "MEDISAGE E-LEARNING",
    role: "Full Stack Developer",
    period: "2023 — 2024",
    location: "REMOTE",
    status: "COMPLETED",
    bullets: [
      "Built the core Learning Management System (LMS) codebase using Next.js and Node.js.",
      "Integrated automated payment channels and user authentication frameworks.",
      "Owned and deployed full-stack features, improving database retrieval latency by 20%.",
    ],
  },
  {
    id: "EXP-003",
    org: "VJTI MUMBAI",
    role: "B.Tech Computer Engineering",
    period: "2021 — 2025",
    location: "MUMBAI",
    status: "ONGOING",
    bullets: [
      "Final year undergraduate candidate in Computer Engineering.",
      "Thesis: Multimodal Depression Detection using BiLSTM models and audio feature classification.",
      "Engaged in advanced coursework covering Distributed Databases, Neural Networks, and Systems Engineering.",
    ],
  },
];
