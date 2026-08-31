import React from 'react';
import { featuredProjects } from '../data/learningData';
import { GitHubIcon, ExternalLinkIcon, CodeIcon, SparklesIcon } from './Icons';

export function ProjectsSection() {
  return (
    <section id="projects" className="projects-section">
      <div className="section-header-block">
        <div className="section-eyebrow">
          <SparklesIcon size={16} />
          <span>Featured Implementations</span>
        </div>
        <h2 className="section-heading">Featured Projects & Repositories</h2>
        <p className="section-subtitle">
          Real-world applications showcasing enterprise Java backends, event-driven architectures, and modern interactive React frontends.
        </p>
      </div>

      <div className="projects-grid">
        {featuredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-card-top">
              <div className="project-badge">{project.badge}</div>
              <div className="project-links">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-icon-link"
                  title="View GitHub Repository"
                >
                  <GitHubIcon size={18} />
                </a>
              </div>
            </div>

            <h3 className="project-title">{project.title}</h3>
            <p className="project-tagline">{project.tagline}</p>
            <p className="project-description">{project.description}</p>

            <div className="project-tags-row">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="project-tag-pill">
                  {tag}
                </span>
              ))}
            </div>

            <div className="project-card-footer">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-project-link"
              >
                <span>View Source Code</span>
                <ExternalLinkIcon size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
