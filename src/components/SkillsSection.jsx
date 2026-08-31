import React from 'react';
import { userProfile } from '../data/learningData';
import { SparklesIcon, CodeIcon } from './Icons';

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Backend & Systems",
      icon: "☕",
      skills: ["Java 21/17", "Spring Boot 3", "Spring Security", "Hibernate / JPA", "REST APIs", "Microservices"]
    },
    {
      title: "Frontend Engineering",
      icon: "⚛️",
      skills: ["React.js 19", "JavaScript (ES6+)", "Vite", "HTML5 / CSS3", "State Management", "Responsive UI"]
    },
    {
      title: "Databases & Architecture",
      icon: "🗄️",
      skills: ["PostgreSQL", "MySQL", "Redis Caching", "Apache Kafka", "System Design", "Distributed Systems"]
    },
    {
      title: "DevOps & Tooling",
      icon: "☁️",
      skills: ["Docker", "Kubernetes", "Git & GitHub", "GitHub Actions CI/CD", "Maven / Gradle", "Linux"]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="section-header-block">
        <div className="section-eyebrow">
          <CodeIcon size={16} />
          <span>Technical Competencies</span>
        </div>
        <h2 className="section-heading">Skills & Technology Arsenal</h2>
        <p className="section-subtitle">
          Engineered for scalable full-stack applications with high reliability, performance, and clean code principles.
        </p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="skill-category-card">
            <div className="skill-cat-header">
              <span className="skill-cat-icon">{cat.icon}</span>
              <h3 className="skill-cat-title">{cat.title}</h3>
            </div>
            <div className="skill-tags-group">
              {cat.skills.map((skill, sIdx) => (
                <span key={sIdx} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
