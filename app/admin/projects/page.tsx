"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getProjects } from "@/lib/data";
import { createProject, updateProject, deleteProject } from "@/lib/admin-actions";
import { Project } from "@/lib/types";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminProjectsPage() {
  const router = useRouter();
  const projects = getProjects();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const tags = formData.get("tags")?.toString().split(",").map(s => s.trim()).filter(Boolean);

    const newProject = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      description: formData.get("description") as string,
      link: formData.get("link") as string,
      tags: tags && tags.length > 0 ? tags : undefined,
      year: formData.get("year") ? parseInt(formData.get("year") as string) : undefined,
      status: (formData.get("status") as Project["status"]) || "active",
    };

    const result = await createProject(newProject);
    setIsSubmitting(false);

    if (result.success) {
      setIsCreateOpen(false);
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProject) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const tags = formData.get("tags")?.toString().split(",").map(s => s.trim()).filter(Boolean);

    const updates = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      description: formData.get("description") as string,
      link: formData.get("link") as string,
      tags: tags && tags.length > 0 ? tags : undefined,
      year: formData.get("year") ? parseInt(formData.get("year") as string) : undefined,
      status: (formData.get("status") as Project["status"]) || "active",
    };

    const result = await updateProject(editingProject.id, updates);
    setIsSubmitting(false);

    if (result.success) {
      setEditingProject(null);
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const result = await deleteProject(id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const ProjectForm = ({ defaultValues, onSubmit, submitText }: {
    defaultValues?: Project;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    submitText: string;
  }) => (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" defaultValue={defaultValues?.title} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author *</Label>
          <Input id="author" name="author" defaultValue={defaultValues?.author} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea id="description" name="description" defaultValue={defaultValues?.description} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">Project Link (URL) *</Label>
          <Input id="link" name="link" type="url" defaultValue={defaultValues?.link} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input id="year" name="year" type="number" defaultValue={defaultValues?.year} placeholder="2025" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue={defaultValues?.status || "active"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input id="tags" name="tags" defaultValue={defaultValues?.tags?.join(", ")} placeholder="Web Development, Next.js, React" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitText}
        </Button>
      </DialogFooter>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects Management</h1>
          <p className="text-muted-foreground">Manage lab projects</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
              <DialogDescription>Create a new project entry</DialogDescription>
            </DialogHeader>
            <ProjectForm onSubmit={handleCreate} submitText="Create Project" />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects ({projects.length})</CardTitle>
          <CardDescription>View and manage all lab projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium max-w-xs">
                    <div className="flex items-center gap-2">
                      <span className="truncate">{project.title}</span>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>{project.author}</TableCell>
                  <TableCell>{project.year || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={project.status === "active" ? "default" : "secondary"}>
                      {project.status || "active"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {project.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags && project.tags.length > 2 && (
                        <span className="text-xs text-muted-foreground">+{project.tags.length - 2}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingProject(project)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editingProject && (
        <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>Update project information</DialogDescription>
            </DialogHeader>
            <ProjectForm
              defaultValues={editingProject}
              onSubmit={handleUpdate}
              submitText="Save Changes"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
