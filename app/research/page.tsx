import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getResearchAreas } from "@/lib/data";
import { BookOpen } from "lucide-react";

export default function ResearchPage() {
  const researchAreas = getResearchAreas();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Research Areas</h1>
          <p className="text-lg text-muted-foreground">
            Exploring the frontiers of mobile communication technology
          </p>
        </div>

        {/* Research Areas Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {researchAreas.map((area) => (
            <Card key={area.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{area.icon || "📡"}</div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{area.title}</CardTitle>
                    {area.publications !== undefined && area.publications > 0 && (
                      <CardDescription className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        {area.publications} Publications
                      </CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{area.description}</p>

                {area.keywords && area.keywords.length > 0 && (
                  <div>
                    <p className="text-xs font-medium mb-2 text-muted-foreground">
                      Keywords:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {area.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-bold mb-2">Interested in Our Research?</h3>
            <p className="text-muted-foreground mb-4">
              We are always looking for motivated students to join our lab.
            </p>
            <p className="text-sm text-muted-foreground">
              If you are interested in mobile communication research, feel free to contact us.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
