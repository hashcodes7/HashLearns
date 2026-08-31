import React from 'react';
import { userProfile } from '../data/learningData';
import { GitHubIcon, LinkedInIcon } from './Icons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a 
            href={userProfile.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
          >
            <GitHubIcon size={16} />
            <span>GitHub</span>
          </a>

          <a 
            href={userProfile.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
          >
            <LinkedInIcon size={16} />
            <span>LinkedIn</span>
          </a>
        </div>

        <p className="footer-text">
          © {currentYear} {userProfile.name} • Built with React
        </p>
      </div>
    </footer>
  );
}
