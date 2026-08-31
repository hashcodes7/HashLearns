import React from 'react';
import { userProfile } from '../data/learningData';
import { MoonIcon, SunIcon, GitHubIcon, LinkedInIcon } from './Icons';

export function Navbar({ theme, toggleTheme }) {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <a href="#" className="nav-brand">
            <span className="brand-dot"></span>
            {userProfile.handle}
          </a>

          {/* 2 Navigation Links: About and Docs */}
          <nav className="nav-menu">
            <a href="#about" className="nav-menu-link">About</a>
            <a href="#docs" className="nav-menu-link">Docs</a>
          </nav>
        </div>

        <div className="nav-actions">
          <a 
            href={userProfile.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-link-btn"
            title="GitHub"
            aria-label="GitHub"
          >
            <GitHubIcon size={18} />
          </a>

          <a 
            href={userProfile.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-link-btn"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={18} />
          </a>

          <button 
            onClick={toggleTheme} 
            className="theme-btn"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
