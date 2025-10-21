export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-bold text-primary">MCLab</h1>
            <p className="text-xl text-muted-foreground">Mobile Communication Lab</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* About Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6 pb-2 border-b border-border">About</h2>
          <div className="bg-card border-l-4 border-primary p-6 rounded-md">
            <p className="text-foreground leading-relaxed">
              Welcome to MCLab's project showcase. This is our space for experimenting with mobile
              communication technologies, sharing side projects, and exploring innovative ideas in
              the mobile computing space.
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6 pb-2 border-b border-border">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Card Example */}
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors">
              <h3 className="text-xl font-semibold text-primary mb-2">
                MCLab Website
              </h3>
              <div className="text-sm text-primary mb-4 flex items-center gap-2">
                <span>👤</span>
                <span>Allen Chen</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Create a website for our future side projects showcase. Using Github pages for hosting.
              </p>
              <a
                href="https://github.com/MCLab-NCCUCS/MCLab"
                className="text-primary hover:underline text-sm"
              >
                View Project →
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 MCLab. A collection of mobile communication experiments and side projects.</p>
        </div>
      </footer>
    </div>
  );
}
