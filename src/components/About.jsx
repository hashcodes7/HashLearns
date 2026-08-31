import React from 'react';
import { userProfile } from '../data/learningData.js';
import { CodeTypingCard } from './CodeTypingCard.jsx';

export function About() {
  const profile = userProfile || {};

  return (
    <section id="about" className="hero-simple-section">
      <div className="hero-simple-grid">
        {/* Left Column: Bold Title, Tagline & Action Buttons */}
        <div className="hero-text-col">
          <h1 className="hero-brand-title">
            HashLearns
          </h1>

          <p className="hero-quote-text">
            "People call me RobinHood, I learn things and Distribute the knowledge for free, forever. You just have to be smart enough to understand it"
          </p>

          <div className="hero-buttons-row">
            <a 
              href="#docs" 
              className="btn-hero-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started
            </a>

            <a 
              href={profile.github || 'https://github.com/hashcodes7'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-hero-secondary"
            >
              See who I am
            </a>
          </div>
        </div>

        {/* Right Column: Sleek Minimal Terminal */}
        <div className="hero-terminal-col">
          <CodeTypingCard />
        </div>
      </div>
    </section>
  );
}
