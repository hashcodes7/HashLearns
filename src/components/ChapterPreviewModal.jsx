import React, { useState, useEffect } from 'react';
import { CloseIcon, CopyIcon, CheckIcon, BookOpenIcon, CodeIcon } from './Icons';

export function ChapterPreviewModal({ chapter, topic, isOpen, onClose }) {
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

  const handleCopy = () => {
    if (chapter.snippet) {
      navigator.clipboard.writeText(chapter.snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" style={{ borderTopColor: topic?.color || '#38bdf8' }}>
          <div className="modal-header-left">
            <span className="modal-topic-pill" style={{ color: topic?.color || '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.1)' }}>
              {topic?.title}
            </span>
            <span className="modal-file-badge">{chapter.id}.md</span>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-title-row">
            <BookOpenIcon size={20} style={{ color: topic?.color || '#38bdf8' }} />
            <h2 className="modal-chapter-title">{chapter.title}</h2>
          </div>

          <p className="modal-note-sub">
            Markdown document preview. Full detailed notes and code benchmarks will load directly from your <code>{chapter.id}.md</code> documentation file.
          </p>

          {chapter.snippet && (
            <div className="modal-code-section">
              <div className="code-top-bar">
                <div className="code-tag">
                  <CodeIcon size={14} />
                  <span>Key Syntax & Architecture Reference</span>
                </div>
                <button className="copy-btn" onClick={handleCopy}>
                  {copied ? <CheckIcon size={14} className="copied-icon" /> : <CopyIcon size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="code-box">
                <code>{chapter.snippet}</code>
              </pre>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <span className="modal-footer-hint">Press <strong>ESC</strong> to close</span>
          <button className="btn-close-modal" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
