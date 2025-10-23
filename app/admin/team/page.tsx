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
import { getTeamMembers } from "@/lib/data";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/admin-actions";
import { TeamMember } from "@/lib/types";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminTeamPage() {
  const router = useRouter();
  const team = getTeamMembers();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const research = formData.get("research")?.toString().split(",").map(s => s.trim()).filter(Boolean);

    const newMember = {
      name: formData.get("name") as string,
      role: formData.get("role") as TeamMember["role"],
      email: formData.get("email") as string || undefined,
      bio: formData.get("bio") as string || undefined,
      research: research && research.length > 0 ? research : undefined,
      joinedYear: formData.get("joinedYear") ? parseInt(formData.get("joinedYear") as string) : undefined,
      links: {
        github: formData.get("github") as string || undefined,
        scholar: formData.get("scholar") as string || undefined,
        linkedin: formData.get("linkedin") as string || undefined,
        website: formData.get("website") as string || undefined,
      }
    };

    const result = await createTeamMember(newMember);
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
    if (!editingMember) return;
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const research = formData.get("research")?.toString().split(",").map(s => s.trim()).filter(Boolean);

    const updates = {
      name: formData.get("name") as string,
      role: formData.get("role") as TeamMember["role"],
      email: formData.get("email") as string || undefined,
      bio: formData.get("bio") as string || undefined,
      research: research && research.length > 0 ? research : undefined,
      joinedYear: formData.get("joinedYear") ? parseInt(formData.get("joinedYear") as string) : undefined,
      links: {
        github: formData.get("github") as string || undefined,
        scholar: formData.get("scholar") as string || undefined,
        linkedin: formData.get("linkedin") as string || undefined,
        website: formData.get("website") as string || undefined,
      }
    };

    const result = await updateTeamMember(editingMember.id, updates);
    setIsSubmitting(false);

    if (result.success) {
      setEditingMember(null);
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    const result = await deleteTeamMember(id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">Manage lab members</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleCreate}>
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogDescription>Add a new team member to the lab</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select name="role" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="advisor">Advisor</SelectItem>
                        <SelectItem value="phd">PhD Student</SelectItem>
                        <SelectItem value="master">Master Student</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="alumni">Alumni</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" name="bio" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="research">Research Interests (comma-separated)</Label>
                  <Input id="research" name="research" placeholder="5G, IoT, Machine Learning" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joinedYear">Joined Year</Label>
                  <Input id="joinedYear" name="joinedYear" type="number" placeholder="2024" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input id="github" name="github" type="url" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scholar">Google Scholar URL</Label>
                    <Input id="scholar" name="scholar" type="url" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input id="linkedin" name="linkedin" type="url" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input id="website" name="website" type="url" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Member"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Members ({team.length})</CardTitle>
          <CardDescription>View and manage all lab members</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Research</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell className="capitalize">{member.role.replace('_', ' ')}</TableCell>
                  <TableCell>{member.email || "-"}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {member.research?.slice(0, 2).map((topic) => (
                        <span key={topic} className="text-xs bg-secondary px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                      {member.research && member.research.length > 2 && (
                        <span className="text-xs text-muted-foreground">+{member.research.length - 2}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingMember(member)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(member.id)}
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
      {editingMember && (
        <Dialog open={!!editingMember} onOpenChange={() => setEditingMember(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleUpdate}>
              <DialogHeader>
                <DialogTitle>Edit Member</DialogTitle>
                <DialogDescription>Update member information</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Name *</Label>
                    <Input id="edit-name" name="name" defaultValue={editingMember.name} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-role">Role *</Label>
                    <Select name="role" defaultValue={editingMember.role} required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="advisor">Advisor</SelectItem>
                        <SelectItem value="phd">PhD Student</SelectItem>
                        <SelectItem value="master">Master Student</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="alumni">Alumni</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" name="email" type="email" defaultValue={editingMember.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-bio">Bio</Label>
                  <Textarea id="edit-bio" name="bio" defaultValue={editingMember.bio} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-research">Research Interests (comma-separated)</Label>
                  <Input id="edit-research" name="research" defaultValue={editingMember.research?.join(", ")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-joinedYear">Joined Year</Label>
                  <Input id="edit-joinedYear" name="joinedYear" type="number" defaultValue={editingMember.joinedYear} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-github">GitHub URL</Label>
                    <Input id="edit-github" name="github" type="url" defaultValue={editingMember.links?.github} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-scholar">Google Scholar URL</Label>
                    <Input id="edit-scholar" name="scholar" type="url" defaultValue={editingMember.links?.scholar} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-linkedin">LinkedIn URL</Label>
                    <Input id="edit-linkedin" name="linkedin" type="url" defaultValue={editingMember.links?.linkedin} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-website">Website URL</Label>
                    <Input id="edit-website" name="website" type="url" defaultValue={editingMember.links?.website} />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditingMember(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
