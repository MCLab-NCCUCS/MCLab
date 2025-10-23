"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getResearchAreas } from "@/lib/data";
import { createResearchArea, updateResearchArea, deleteResearchArea } from "@/lib/admin-actions";
import { ResearchArea } from "@/lib/types";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminResearchPage() {
  const router = useRouter();
  const research = getResearchAreas();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingResearch, setEditingResearch] = useState<ResearchArea | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const keywords = formData.get("keywords")?.toString().split(",").map(s => s.trim()).filter(Boolean);

    const newResearch = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string || undefined,
      keywords: keywords && keywords.length > 0 ? keywords : undefined,
      publications: formData.get("publications") ? parseInt(formData.get("publications") as string) : undefined,
    };

    const result = await createResearchArea(newResearch);
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
    if (!editingResearch) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const keywords = formData.get("keywords")?.toString().split(",").map(s => s.trim()).filter(Boolean);

    const updates = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon: formData.get("icon") as string || undefined,
      keywords: keywords && keywords.length > 0 ? keywords : undefined,
      publications: formData.get("publications") ? parseInt(formData.get("publications") as string) : undefined,
    };

    const result = await updateResearchArea(editingResearch.id, updates);
    setIsSubmitting(false);

    if (result.success) {
      setEditingResearch(null);
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this research area?")) return;

    const result = await deleteResearchArea(id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const ResearchForm = ({ defaultValues, onSubmit, submitText }: {
    defaultValues?: ResearchArea;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    submitText: string;
  }) => (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3 space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" name="title" defaultValue={defaultValues?.title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <Input id="icon" name="icon" defaultValue={defaultValues?.icon} placeholder="📡" maxLength={2} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea id="description" name="description" defaultValue={defaultValues?.description} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords (comma-separated)</Label>
          <Input id="keywords" name="keywords" defaultValue={defaultValues?.keywords?.join(", ")} placeholder="5G, 6G, mmWave" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="publications">Number of Publications</Label>
          <Input id="publications" name="publications" type="number" defaultValue={defaultValues?.publications} placeholder="0" />
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
          <h1 className="text-3xl font-bold">Research Management</h1>
          <p className="text-muted-foreground">Manage research areas</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Research Area
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Research Area</DialogTitle>
              <DialogDescription>Create a new research area</DialogDescription>
            </DialogHeader>
            <ResearchForm onSubmit={handleCreate} submitText="Create Research Area" />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Research Areas ({research.length})</CardTitle>
          <CardDescription>View and manage all research areas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Publications</TableHead>
                <TableHead>Keywords</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {research.map((area) => (
                <TableRow key={area.id}>
                  <TableCell className="text-2xl">{area.icon || "📡"}</TableCell>
                  <TableCell className="font-medium">{area.title}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="truncate text-sm text-muted-foreground">{area.description}</p>
                  </TableCell>
                  <TableCell>{area.publications || 0}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {area.keywords?.slice(0, 3).map((keyword) => (
                        <Badge key={keyword} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                      {area.keywords && area.keywords.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{area.keywords.length - 3}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingResearch(area)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(area.id)}
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
      {editingResearch && (
        <Dialog open={!!editingResearch} onOpenChange={() => setEditingResearch(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Research Area</DialogTitle>
              <DialogDescription>Update research area information</DialogDescription>
            </DialogHeader>
            <ResearchForm
              defaultValues={editingResearch}
              onSubmit={handleUpdate}
              submitText="Save Changes"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
