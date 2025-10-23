import { TeamMember, Project, ResearchArea } from './types';
import teamData from '@/data/team.json';
import projectsData from '@/data/projects.json';
import researchData from '@/data/research.json';

export function getTeamMembers(): TeamMember[] {
  return teamData as TeamMember[];
}

export function getTeamMembersByRole(role: TeamMember['role']): TeamMember[] {
  return teamData.filter((member: any) => member.role === role) as TeamMember[];
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectById(id: string): Project | undefined {
  return projectsData.find((project: any) => project.id === id) as Project | undefined;
}

export function getResearchAreas(): ResearchArea[] {
  return researchData as ResearchArea[];
}

export function getResearchById(id: string): ResearchArea | undefined {
  return researchData.find((area: any) => area.id === id) as ResearchArea | undefined;
}

// Statistics
export function getStats() {
  const team = getTeamMembers();
  const projects = getProjects();
  const research = getResearchAreas();

  return {
    totalMembers: team.length,
    activeMembers: team.filter(m => m.role !== 'alumni').length,
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    researchAreas: research.length,
    totalPublications: research.reduce((sum, area) => sum + (area.publications || 0), 0),
  };
}
