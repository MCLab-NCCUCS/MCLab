export interface TeamMember {
  id: string;
  name: string;
  role: "advisor" | "phd" | "master" | "undergraduate" | "alumni";
  photo?: string;
  email?: string;
  bio?: string;
  research?: string[];
  links?: {
    github?: string;
    scholar?: string;
    linkedin?: string;
    website?: string;
  };
  joinedYear?: number;
  graduatedYear?: number;
}

export interface Project {
  id: string;
  title: string;
  author: string;
  description: string;
  link: string;
  tags?: string[];
  year?: number;
  image?: string;
  status?: "active" | "completed" | "archived";
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon?: string;
  keywords?: string[];
  relatedProjects?: string[]; // Project IDs
  publications?: number;
  image?: string;
}

export interface SiteData {
  team: TeamMember[];
  projects: Project[];
  research: ResearchArea[];
}
