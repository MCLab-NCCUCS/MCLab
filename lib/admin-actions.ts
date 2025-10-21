"use server"

import { revalidatePath } from "next/cache";
import { TeamMember, Project, ResearchArea } from "./types";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Team Actions
export async function createTeamMember(member: Omit<TeamMember, "id">) {
  try {
    const filePath = path.join(DATA_DIR, "team.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const team: TeamMember[] = JSON.parse(fileContent);

    const newMember: TeamMember = {
      ...member,
      id: `member-${Date.now()}`,
    };

    team.push(newMember);
    await fs.writeFile(filePath, JSON.stringify(team, null, 2));

    revalidatePath("/team");
    revalidatePath("/admin/team");
    return { success: true, data: newMember };
  } catch (error) {
    console.error("Error creating team member:", error);
    return { success: false, error: "Failed to create team member" };
  }
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>) {
  try {
    const filePath = path.join(DATA_DIR, "team.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const team: TeamMember[] = JSON.parse(fileContent);

    const index = team.findIndex((m) => m.id === id);
    if (index === -1) {
      return { success: false, error: "Team member not found" };
    }

    team[index] = { ...team[index], ...updates };
    await fs.writeFile(filePath, JSON.stringify(team, null, 2));

    revalidatePath("/team");
    revalidatePath("/admin/team");
    return { success: true, data: team[index] };
  } catch (error) {
    console.error("Error updating team member:", error);
    return { success: false, error: "Failed to update team member" };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    const filePath = path.join(DATA_DIR, "team.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const team: TeamMember[] = JSON.parse(fileContent);

    const filtered = team.filter((m) => m.id !== id);
    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));

    revalidatePath("/team");
    revalidatePath("/admin/team");
    return { success: true };
  } catch (error) {
    console.error("Error deleting team member:", error);
    return { success: false, error: "Failed to delete team member" };
  }
}

// Project Actions
export async function createProject(project: Omit<Project, "id">) {
  try {
    const filePath = path.join(DATA_DIR, "projects.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const projects: Project[] = JSON.parse(fileContent);

    const newProject: Project = {
      ...project,
      id: `project-${Date.now()}`,
    };

    projects.unshift(newProject); // Add to beginning
    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true, data: newProject };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(id: string, updates: Partial<Project>) {
  try {
    const filePath = path.join(DATA_DIR, "projects.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const projects: Project[] = JSON.parse(fileContent);

    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) {
      return { success: false, error: "Project not found" };
    }

    projects[index] = { ...projects[index], ...updates };
    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true, data: projects[index] };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    const filePath = path.join(DATA_DIR, "projects.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const projects: Project[] = JSON.parse(fileContent);

    const filtered = projects.filter((p) => p.id !== id);
    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));

    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}

// Research Actions
export async function createResearchArea(research: Omit<ResearchArea, "id">) {
  try {
    const filePath = path.join(DATA_DIR, "research.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const researchAreas: ResearchArea[] = JSON.parse(fileContent);

    const newResearch: ResearchArea = {
      ...research,
      id: `research-${Date.now()}`,
    };

    researchAreas.push(newResearch);
    await fs.writeFile(filePath, JSON.stringify(researchAreas, null, 2));

    revalidatePath("/research");
    revalidatePath("/admin/research");
    return { success: true, data: newResearch };
  } catch (error) {
    console.error("Error creating research area:", error);
    return { success: false, error: "Failed to create research area" };
  }
}

export async function updateResearchArea(id: string, updates: Partial<ResearchArea>) {
  try {
    const filePath = path.join(DATA_DIR, "research.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const researchAreas: ResearchArea[] = JSON.parse(fileContent);

    const index = researchAreas.findIndex((r) => r.id === id);
    if (index === -1) {
      return { success: false, error: "Research area not found" };
    }

    researchAreas[index] = { ...researchAreas[index], ...updates };
    await fs.writeFile(filePath, JSON.stringify(researchAreas, null, 2));

    revalidatePath("/research");
    revalidatePath("/admin/research");
    return { success: true, data: researchAreas[index] };
  } catch (error) {
    console.error("Error updating research area:", error);
    return { success: false, error: "Failed to update research area" };
  }
}

export async function deleteResearchArea(id: string) {
  try {
    const filePath = path.join(DATA_DIR, "research.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const researchAreas: ResearchArea[] = JSON.parse(fileContent);

    const filtered = researchAreas.filter((r) => r.id !== id);
    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));

    revalidatePath("/research");
    revalidatePath("/admin/research");
    return { success: true };
  } catch (error) {
    console.error("Error deleting research area:", error);
    return { success: false, error: "Failed to delete research area" };
  }
}
