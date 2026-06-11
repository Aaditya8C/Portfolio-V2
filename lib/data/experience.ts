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
    org: "CONTRALL",
    role: "Freelance Full Stack Developer",
    period: "MAY 2025 — PRESENT",
    location: "REMOTE",
    status: "ACTIVE",
    bullets: [
      "Built a cross-platform construction site management application using Flutter, Node.js, PostgreSQL, and AWS S3, supporting multi-site DPR, material, machinery, and expense tracking.",
      "Architected a real-time communication system featuring site-wise chat, FCM push notifications, media sharing, and unread message tracking.",
      "Designed a scalable localization architecture supporting English, Hindi, and Hinglish with persistent user preferences.",
      "Implemented secured backend modules utilizing a Service–Repository architecture, role-based access control, and OTP authentication workflows."
    ],
  },
  {
    id: "EXP-002",
    org: "JPMORGAN CHASE",
    role: "Software Engineering Intern",
    period: "JUNE 2025 — AUG 2025",
    location: "MUMBAI",
    status: "COMPLETED",
    bullets: [
      "Developed high-throughput data pipelines using Python, reducing batch processing execution cycles by 35%.",
      "Built diagnostic internal dashboard tools utilizing React and TypeScript for system telemetry auditing.",
      "Collaborated with a cross-functional team of 8 software engineers to support production financial services infrastructure.",
    ],
  },
  {
    id: "EXP-003",
    org: "MEDISAGE E-LEARNING",
    role: "Full Stack Developer",
    period: "JAN 2023 — JUNE 2023",
    location: "MUMBAI",
    status: "COMPLETED",
    bullets: [
      "Built the core Learning Management System (LMS) codebase using Next.js and Node.js.",
      "Integrated automated payment channels and user authentication frameworks.",
      "Owned and deployed full-stack features, improving database retrieval latency by 20%.",
    ],
  },
  {
    id: "EXP-004",
    org: "VJTI MUMBAI",
    role: "B.Tech Computer Engineering",
    period: "SEPT 2023 — MAY 2026",
    location: "MUMBAI",
    status: "COMPLETED",
    bullets: [
      "Final year undergraduate candidate in Computer Engineering.",
      "Thesis: Multimodal Depression Detection using BiLSTM models and audio feature classification.",
      "Engaged in advanced coursework covering Distributed Databases, Neural Networks, and Systems Engineering.",
    ],
  },
];
