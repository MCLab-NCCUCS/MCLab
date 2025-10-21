export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MCLab - Mobile Communication Lab</p>
          <p className="mt-2">
            A collection of mobile communication experiments and side projects
          </p>
        </div>
      </div>
    </footer>
  );
}
