// MCLab Projects Data
// Add or modify projects in this array for easy maintenance

// Add new projects in the front of this array
const projects = [
    {
        title: "The MCLab side projects showcase website",
        author: "Allen Chen",
        description: "Create a website for our future side projects showcase. Using Github pages for hosting.",
        link: "https://github.com/MCLab-NCCUCS/MCLab"
    },
    {
        title: "Project 2",
        author: "Author Name",
        description: "Add your project description here. What problem does it solve? What technologies does it use?",
        link: "#"
    },
    {
        title: "Project 3",
        author: "Author Name",
        description: "Add your project description here. What problem does it solve? What technologies does it use?",
        link: "#"
    }
];

// Function to render projects
function renderProjects() {
    const projectsContainer = document.querySelector('.projects');

    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }

    // Clear existing content
    projectsContainer.innerHTML = '';

    // Render each project
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        projectCard.innerHTML = `
            <h3>${escapeHtml(project.title)}</h3>
            <div class="project-author">${escapeHtml(project.author)}</div>
            <p>${escapeHtml(project.description)}</p>
            <a href="${escapeHtml(project.link)}" class="project-link">View Project →</a>
        `;

        projectsContainer.appendChild(projectCard);
    });
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize projects when DOM is ready
document.addEventListener('DOMContentLoaded', renderProjects);
