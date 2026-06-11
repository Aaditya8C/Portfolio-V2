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
      "Built a micro-frontend UI from the ground up, integrating it into the broader system architecture and consolidating duplicate functionality that was previously scattered across multiple internal projects.",
      "Designed and shipped a Spring Boot backend service, enabling seamless communication between the micro-frontend and existing internal APIs within a production-grade ecosystem.",
      "Independently deployed the entire service to an AWS ECS cluster using a Jenkins CI/CD pipeline and Terraform for Infrastructure as Code (IaC)."
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
      "Re-engineered the search front-end in Next.js for improved accuracy and consistent UI across the platform.",
      "Rolled out multi-language support for 2+ languages, expanding platform accessibility to over 10,000 users.",
      "Resolved 40% of live bugs within 72 hours in coordination with tech & testing teams.",
      "Integrated a suite of medical calculators actively used by 2,000+ healthcare professionals on the platform."
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
