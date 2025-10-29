import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTeamMembers } from "@/lib/data";
import { Mail, Github, Globe, GraduationCap } from "lucide-react";

export default function TeamPage() {
  const team = getTeamMembers();

  const roleOrder = ["advisor", "phd", "master", "undergraduate", "alumni"];
  const roleLabels = {
    advisor: "Advisor",
    phd: "PhD Students",
    master: "Master Students",
    undergraduate: "Undergraduate Students",
    alumni: "Alumni",
  };

  const groupedTeam = roleOrder.reduce((acc, role) => {
    acc[role] = team.filter((member) => member.role === role);
    return acc;
  }, {} as Record<string, typeof team>);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Our Team</h1>
          <p className="text-lg text-muted-foreground">
            Meet the researchers and students of MCLab
          </p>
        </div>

        {/* Team Sections by Role */}
        {roleOrder.map((role) => {
          const members = groupedTeam[role];
          if (members.length === 0) return null;

          return (
            <section key={role} className="space-y-4">
              <h2 className="text-2xl font-bold">{roleLabels[role as keyof typeof roleLabels]}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                  <Card key={member.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        {/* Avatar placeholder */}
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-bold text-primary">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl">{member.name}</CardTitle>
                          <CardDescription className="capitalize">
                            {member.role.replace('_', ' ')}
                          </CardDescription>
                          {member.joinedYear && !member.graduatedYear && (
                            <Badge variant="outline" className="mt-2">
                              Since {member.joinedYear}
                            </Badge>
                          )}
                          {member.graduatedYear && (
                            <Badge variant="secondary" className="mt-2">
                              Graduated {member.graduatedYear}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {member.bio && (
                        <p className="text-sm text-muted-foreground">{member.bio}</p>
                      )}
                      {member.research && member.research.length > 0 && (
                        <div>
                          <p className="text-xs font-medium mb-2">Research Interests:</p>
                          <div className="flex flex-wrap gap-1">
                            {member.research.map((topic) => (
                              <Badge key={topic} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {member.links && (
                        <div className="flex gap-2 pt-2">
                          {member.email && (
                            <a href={`mailto:${member.email}`}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          {member.links.github && (
                            <a href={member.links.github} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Github className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          {member.links.website && (
                            <a href={member.links.website} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Globe className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          {member.links.scholar && (
                            <a href={member.links.scholar} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <GraduationCap className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
