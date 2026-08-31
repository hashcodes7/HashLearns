import React, { useState, useMemo } from 'react';
import { learningTopics } from '../data/learningData';
import { TopicCard } from './TopicCard';
import { ChapterModal } from './ChapterModal';
import { SearchIcon, BookOpenIcon, SparklesIcon, CheckIcon, CloseIcon } from './Icons';

export function StudyHub({ completedChapters, onToggleChapterComplete, onResetProgress }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const categories = [
    { id: 'all', label: 'All Domains' },
    { id: 'backend', label: 'Java & Backend' },
    { id: 'dsa', label: 'DSA & Algorithms' },
    { id: 'frontend', label: 'React & Frontend' },
    { id: 'system-design', label: 'System Design & DB' },
    { id: 'devops', label: 'DevOps & Cloud' }
  ];

  // Calculate total chapters
  const totalChapters = useMemo(() => {
    return learningTopics.reduce((acc, topic) => acc + topic.chapters.length, 0);
  }, []);

  const completedCount = completedChapters.length;
  const overallPercentage = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;

  // Filter topics based on search & category
  const filteredTopics = useMemo(() => {
    return learningTopics
      .filter(topic => {
        if (activeCategory !== 'all' && topic.category !== activeCategory) {
          return false;
        }
        return true;
      })
      .map(topic => {
        if (!searchQuery.trim()) return topic;

        const query = searchQuery.toLowerCase();
        const matchesTopic = topic.title.toLowerCase().includes(query) ||
                             topic.description.toLowerCase().includes(query) ||
                             topic.badge.toLowerCase().includes(query);

        // Filter chapters that match query
        const matchingChapters = topic.chapters.filter(ch => 
          ch.title.toLowerCase().includes(query) ||
          ch.summary.toLowerCase().includes(query) ||
          ch.difficulty.toLowerCase().includes(query) ||
          (ch.keyPoints && ch.keyPoints.some(p => p.toLowerCase().includes(query)))
        );

        if (matchesTopic) return topic;
        if (matchingChapters.length > 0) {
          return { ...topic, chapters: matchingChapters };
        }
        return null;
      })
      .filter(Boolean);
  }, [searchQuery, activeCategory]);

  const handleSelectChapter = (chapter, topic) => {
    setSelectedChapter(chapter);
    setSelectedTopic(topic);
  };

  const handleCloseModal = () => {
    setSelectedChapter(null);
    setSelectedTopic(null);
  };

  return (
    <section id="study-hub" className="study-hub-section">
      <div className="section-header-block">
        <div className="section-eyebrow">
          <BookOpenIcon size={16} />
          <span>Structured Learning Hub</span>
        </div>
        <h2 className="section-heading">
          Curated Roadmaps & Deep-Dive Notes
        </h2>
        <p className="section-subtitle">
          Explore structured chapters across core engineering domains. Select any chapter to study key concepts, interview tips, and interactive code examples.
        </p>
      </div>

      {/* Global Progress Dashboard Card */}
      <div className="study-progress-card">
        <div className="progress-card-left">
          <div className="progress-icon-badge">
            <SparklesIcon size={24} className="sparkle-gold" />
          </div>
          <div>
            <h4 className="progress-card-title">
              Your Learning Velocity: <span className="highlight-text">{completedCount} of {totalChapters} Chapters</span>
            </h4>
            <p className="progress-card-sub">
              {overallPercentage === 100 
                ? "🎉 Incredible! You have mastered the entire study vault!"
                : overallPercentage > 50 
                ? "🔥 Outstanding progress! More than halfway through the mastery path!"
                : "⚡ Track your knowledge retention by marking chapters as completed."}
            </p>
          </div>
        </div>

        <div className="progress-card-right">
          <div className="global-progress-circle">
            <span className="global-progress-num">{overallPercentage}%</span>
          </div>
          {completedCount > 0 && (
            <button 
              className="btn-reset-progress"
              onClick={onResetProgress}
              title="Reset all completed checkboxes"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="study-controls-bar">
        {/* Search Bar */}
        <div className="search-input-wrapper">
          <SearchIcon size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search topics, chapters, or concepts (e.g. Multithreading, Redux, JWT, B-Tree)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="search-clear-btn" 
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
            >
              <CloseIcon size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="category-pills-row">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`cat-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      {filteredTopics.length > 0 ? (
        <div className="topics-grid">
          {filteredTopics.map(topic => (
            <TopicCard 
              key={topic.id}
              topic={topic}
              completedChapters={completedChapters}
              onSelectChapter={handleSelectChapter}
              onToggleChapterComplete={onToggleChapterComplete}
            />
          ))}
        </div>
      ) : (
        <div className="no-results-box">
          <p className="no-results-title">No matching chapters or topics found</p>
          <p className="no-results-sub">Try searching for different keywords or clear the category filters.</p>
          <button 
            className="btn btn-secondary"
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Modal Drawer for Chapter Details */}
      <ChapterModal 
        isOpen={Boolean(selectedChapter)}
        chapter={selectedChapter}
        topic={selectedTopic}
        onClose={handleCloseModal}
        isCompleted={selectedChapter ? completedChapters.includes(selectedChapter.id) : false}
        onToggleComplete={onToggleChapterComplete}
      />
    </section>
  );
}
