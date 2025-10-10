# MCLab - Mobile Communication Lab

A showcase of mobile communication side projects and experiments.

🌐 **Website**: [https://mclab-nccucs.github.io/MCLab/](https://mclab-nccucs.github.io/MCLab/)

## About

This repository hosts our GitHub Pages site showcasing MCLab's mobile communication projects. It's a simple, dark-themed website for displaying our side projects and experiments.

## Maintenance Guide

### Adding New Projects

Projects are now managed in a separate `projects.js` file for easier maintenance.

1. Edit `projects.js`
2. Find the `projects` array
3. Add a new project object as the first element of the array:

```javascript
{
    title: "Your Project Name",
    author: "Your Name",
    description: "Brief description of your project. What does it do? What technologies does it use?",
    link: "https://github.com/your-repo"
}
```

**Example:**

```javascript
const projects = [
    {
        title: "The MCLab side projects showcase website",
        author: "Allen Chen",
        description: "Create a website for our future side projects showcase. Using Github pages for hosting.",
        link: "https://github.com/MCLab-NCCUCS/MCLab"
    },
    {
        title: "Your New Project",
        author: "Your Name",
        description: "Your project description here.",
        link: "https://github.com/your-repo"
    }
];
```

**Note**:
- The author field will automatically display with a user icon (👤) before the name
- Projects are rendered dynamically when the page loads
- No need to edit HTML anymore!

### Updating Content

- **About section**: Edit the text inside `<div class="about">` in `index.html`
- **Title/Subtitle**: Modify the `<header>` section
- **Footer**: Update the `<footer>` section

### Customizing Colors

The dark theme uses these CSS variables in the `<style>` section:

- Background: `#0d1117`
- Card background: `#161b22`
- Text: `#c9d1d9`
- Accent blue: `#58a6ff`
- Borders: `#30363d`

### Publishing Changes

After making changes:

```bash
git add .
git commit -m "Update website"
git push
```

GitHub Pages will automatically update within a few minutes.

### Enabling GitHub Pages

If not already enabled:

1. Go to repository Settings
2. Navigate to "Pages" section
3. Under "Source", select the `main` branch
4. Click "Save"
5. Your site will be available at `https://YOUR_USERNAME.github.io/MCLab`

## Repository Structure

```
MCLab/
├── index.html          # Main website file
├── projects.js         # Projects data (edit this to add/update projects)
├── README.md          # This file
└── .github/
    └── DESCRIPTION.md # Repository description
```

## License

This is a personal project showcase. Individual projects may have their own licenses.

## Contributing

This is a lab project site. If you're a lab member and want to add your project, please submit a pull request with your project card added to `index.html`.
