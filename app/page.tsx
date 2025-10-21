import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProjects, getStats } from "@/lib/data";
import { GraduationCap, Lightbulb, Users, BookOpen } from "lucide-react";

export default function Home() {
  const projects = getProjects();
  const stats = getStats();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-primary">
          MCLab
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground">
          Mobile Communication Lab
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          國立政治大學資訊科學系
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/projects">
            <Button size="lg">View Projects</Button>
          </Link>
          <Link href="/team">
            <Button size="lg" variant="outline">Meet Our Team</Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold text-primary">
              {stats.activeMembers}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Active Members
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold text-primary">
              {stats.activeProjects}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Active Projects
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold text-primary">
              {stats.researchAreas}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Research Areas
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold text-primary">
              {stats.totalPublications}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Publications
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* About Section */}
      <section className="py-12 space-y-4">
        <h2 className="text-3xl font-bold text-center">About MCLab</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
              MCLab (Mobile Communication Lab) 是政治大學資訊科學系的研究實驗室，
              專注於行動通訊、無線網路、物聯網等前沿技術的研究與應用開發。
              我們致力於透過創新研究和實務專案，培養學生在行動通訊領域的專業能力。
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Recent Projects */}
      <section className="py-12 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Recent Projects</h2>
          <Link href="/projects">
            <Button variant="ghost">View All →</Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  {project.status && (
                    <Badge variant={project.status === "active" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  )}
                </div>
                <CardDescription>by {project.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                {project.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full">
                    View Project →
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
