export interface IntelChannel {
  id: string;
  name: string;
  purpose: string;
  description: string;
  status: "ACTIVE" | "INACTIVE" | "COMPLETED";
  link: string;
}

export interface CommunityOperation {
  id: string;
  operation: string;
  results: string[];
  status: "MISSION SUCCESSFUL" | "ONGOING" | "ACTIVE" | "COMPLETED";
}

export const publicChannels: IntelChannel[] = [
  {
    id: "INTEL-001",
    name: "X (FORMERLY TWITTER)",
    purpose: "PUBLIC TRANSMISSION CHANNEL",
    description: "Public transmission channel used for engineering observations, build logs, and technical findings.",
    status: "ACTIVE",
    link: "https://x.com/",
  },
  {
    id: "INTEL-002",
    name: "LINKEDIN",
    purpose: "BROADCAST NETWORK",
    description: "Professional network broadcast for deployment logs, project launches, and technical field reports.",
    status: "ACTIVE",
    link: "https://www.linkedin.com/in/aaditya-padte-40086a233/",
  },
  {
    id: "INTEL-003",
    name: "GITHUB",
    purpose: "OPEN SOURCE FORGE",
    description: "Central repository log tracking public assets, open-source deployments, and cryptographic contribution frequency.",
    status: "ACTIVE",
    link: "https://github.com/Aaditya8C",
  },
];

export const communityOperations: CommunityOperation[] = [
  {
    id: "OP-901",
    operation: "HACKTOBERFEST 2025",
    results: ["6 ACCEPTED CONTRIBUTIONS"],
    status: "MISSION SUCCESSFUL",
  },
  {
    id: "OP-902",
    operation: "OPEN SOURCE CONTRIBUTIONS",
    results: ["FEATURES", "BUG FIXES", "COMMUNITY SUPPORT"],
    status: "ONGOING",
  }
];
