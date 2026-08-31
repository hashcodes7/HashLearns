import React, { useState, useEffect } from 'react';
import { CloseIcon, CopyIcon, CheckIcon, SparklesIcon, ClockIcon, CodeIcon } from './Icons';

export function ChapterModal({ chapter, topic, isOpen, onClose, isCompleted, onToggleComplete }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !chapter) return null;

  const handleCopyCode = () => {
    if (chapter.codeSnippet) {
      navigator.clipboard.writeText(chapter.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const difficultyColors = {
    Fundamental: 'badge-easy',
    Intermediate: 'badge-medium',
    Advanced: 'badge-hard'
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header" style={{ borderTopColor: topic?.color || '#6366f1' }}>
          <div className="modal-header-meta">
            <span className="modal-topic-badge" style={{ backgroundColor: topic?.glowColor || 'rgba(99,102,241,0.2)', color: topic?.color || '#6366f1' }}>
              {topic?.title}
            </span>
            <span className={`modal-difficulty-badge ${difficultyColors[chapter.difficulty] || 'badge-medium'}`}>
              {chapter.difficulty}
            </span>
            <span className="modal-time-badge">
              <ClockIcon size={14} />
              {chapter.duration}
            </span>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <h2 className="modal-chapter-title">{chapter.title}</h2>
          
          <p className="modal-summary">{chapter.summary}</p>

          {/* Key Concepts */}
          {chapter.keyPoints && (
            <div className="modal-section">
              <h4 className="modal-section-title">
                <SparklesIcon size={16} className="sparkle-icon" />
                Key Concepts to Master
              </h4>
              <ul className="modal-keypoints-list">
                {chapter.keyPoints.map((point, idx) => (
                  <li key={idx} className="keypoint-item">
                    <span className="keypoint-bullet"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Code Snippet Box */}
          {chapter.codeSnippet && (
            <div className="modal-section">
              <div className="code-header-bar">
                <div className="code-label">
                  <CodeIcon size={14} />
                  <span>Interactive Code Example / Architecture Note</span>
                </div>
                <button className="copy-code-btn" onClick={handleCopyCode}>
                  {copied ? <CheckIcon size={14} className="copied" /> : <CopyIcon size={14} />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="code-block-container">
                <code>{chapter.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Interview & Architecture Tip */}
          {chapter.interviewTip && (
            <div className="interview-tip-card">
              <div className="tip-header">
                <span className="tip-icon">💡</span>
                <span className="tip-title">Interview Favorite & Production Tip</span>
              </div>
              <p className="tip-content">{chapter.interviewTip}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button 
            className={`btn-toggle-complete ${isCompleted ? 'completed' : ''}`}
            onClick={() => onToggleComplete(chapter.id)}
          >
            {isCompleted ? (
              <>
                <CheckIcon size={16} />
                <span>Completed! (Click to unmark)</span>
              </>
            ) : (
              <>
                <span className="circle-checkbox"></span>
                <span>Mark Chapter as Mastered</span>
              </>
            )}
          </button>

          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
