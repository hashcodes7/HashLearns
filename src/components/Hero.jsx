import React, { useState } from 'react';
import { userProfile } from '../data/learningData';
import { SparklesIcon, GitHubIcon, LinkedInIcon, BookOpenIcon, CopyIcon, CheckIcon, CodeIcon } from './Icons';

export function Hero({ completedCount, totalChapters }) {
  const [copiedCode, setCopiedCode] = useState(false);

  const heroCode = `// Sarvy.java - Developer & Educator Profile
public class DeveloperInfo {
    public final String name = "Sarvy";
    public final String role = "Full-Stack Engineer & Tech Mentor";
    public final String[] coreStack = {
        "Java 21", "Spring Boot", "React.js", 
        "Kafka", "PostgreSQL", "Docker", "DSA"
    };
    public final String mission = "Demystifying complex concepts into actionable notes.";
    
    public boolean isOpenForHire() {
        return true;
    }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(heroCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="about" className="hero-section">
      {/* Background ambient lighting */}
      <div className="hero-glow-blob blob-1"></div>
      <div className="hero-glow-blob blob-2"></div>

      <div className="hero-content-grid">
        {/* Left Column: Intro & Bio */}
        <div className="hero-text-col">
          <div className="status-badge">
            <span className="pulse-dot"></span>
            <span>{userProfile.status}</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">{userProfile.name}</span>
            <br />
            <span className="sub-title-text">Building Systems & Sharing Knowledge.</span>
          </h1>

          <p className="hero-bio">
            {userProfile.bio}
          </p>

          {/* Key highlights tags */}
          <div className="tech-tags-wrapper">
            <span className="tag-pill">☕ Java & Spring Boot</span>
            <span className="tag-pill">⚛️ React.js</span>
            <span className="tag-pill">🧩 DSA Masterclass</span>
            <span className="tag-pill">🗄️ System Architecture</span>
            <span className="tag-pill">☁️ Docker & Cloud</span>
          </div>

          {/* Action CTAs */}
          <div className="hero-cta-group">
            <a href="#study-hub" className="btn btn-primary">
              <BookOpenIcon size={18} />
              <span>Explore Study Hub</span>
            </a>
            
            <a 
              href={userProfile.socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              <LinkedInIcon size={18} />
              <span>LinkedIn</span>
            </a>

            <a 
              href={userProfile.socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline"
            >
              <GitHubIcon size={18} />
              <span>GitHub</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-stats-bar">
            <div className="stat-item">
              <span className="stat-number">6+</span>
              <span className="stat-label">Core Domains</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{totalChapters}</span>
              <span className="stat-label">Detailed Chapters</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{completedCount}</span>
              <span className="stat-label">Mastered by You</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free & Interactive</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Terminal Preview */}
        <div className="hero-preview-col">
          <div className="code-window-card">
            <div className="code-window-header">
              <div className="window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="window-title">
                <CodeIcon size={14} />
                <span>SarvyProfile.java</span>
              </div>
              <button 
                onClick={handleCopy} 
                className="code-copy-btn"
                title="Copy snippet"
              >
                {copiedCode ? <CheckIcon size={14} className="copied" /> : <CopyIcon size={14} />}
                <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="code-window-body">
              <pre className="code-content">
                <code>
                  <span className="token-comment">// Sarvy.java - Developer & Educator Profile</span>{'\n'}
                  <span className="token-keyword">public class</span> <span className="token-class">DeveloperInfo</span> {'{\n'}
                  {'    '}<span className="token-keyword">public final</span> <span className="token-type">String</span> name = <span className="token-string">"Sarvy"</span>;{'\n'}
                  {'    '}<span className="token-keyword">public final</span> <span className="token-type">String</span> role = <span className="token-string">"Full-Stack Java & React Engineer"</span>;{'\n'}
                  {'    '}<span className="token-keyword">public final</span> <span className="token-type">String</span>[] coreStack = {'{\n'}
                  {'        '}<span className="token-string">"Java 21"</span>, <span className="token-string">"Spring Boot 3"</span>, <span className="token-string">"React.js"</span>,{'\n'}
                  {'        '}<span className="token-string">"Kafka"</span>, <span className="token-string">"PostgreSQL"</span>, <span className="token-string">"Docker"</span>, <span className="token-string">"DSA"</span>{'\n'}
                  {'    '}{'}'};{'\n'}
                  {'    '}<span className="token-keyword">public final</span> <span className="token-type">String</span> mission = <span className="token-string">"Demystifying complex concepts."</span>;{'\n'}
                  {'\n'}
                  {'    '}<span className="token-keyword">public boolean</span> <span className="token-function">isOpenForHire</span>() {'{\n'}
                  {'        '}<span className="token-keyword">return</span> <span className="token-boolean">true</span>;{'\n'}
                  {'    '}{'}\n'}
                  {'}'}
                </code>
              </pre>
            </div>

            {/* Quick interactive footer on card */}
            <div className="code-window-footer">
              <div className="card-quick-tip">
                <SparklesIcon size={14} className="sparkle-gold" />
                <span>Scroll down to dive into 30+ structured learning chapters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
