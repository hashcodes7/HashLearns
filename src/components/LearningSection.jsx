import React, { useState, useMemo } from 'react';
import { learningTopics } from '../data/learningData.js';
import { TopicCard } from './TopicCard.jsx';
import { SearchIcon, CloseIcon } from './Icons.jsx';

export function LearningSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Backend', 'Core CS', 'Frontend', 'Architecture', 'DevOps'];
  const topics = learningTopics || [];

  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      if (!topic) return false;
      // Filter tab match
      const tag = topic.tag || '';
      const matchesFilter = activeFilter === 'All' || tag.toLowerCase().includes(activeFilter.toLowerCase());
      if (!matchesFilter) return false;

      // Search query match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = (topic.title || '').toLowerCase().includes(q);
      const matchDesc = (topic.description || '').toLowerCase().includes(q);
      const matchChapter = (topic.chapters || []).some(ch => (ch.title || '').toLowerCase().includes(q));
      return matchTitle || matchDesc || matchChapter;
    });
  }, [topics, searchQuery, activeFilter]);

  return (
    <section id="docs" className="learning-section-wide">
      <div className="learning-section-header">
        <div className="header-text-block">
          <h2 className="section-main-heading">Learning</h2>
        </div>

        {/* Dynamic Controls: Filter Pills & Search */}
        <div className="learning-controls">
          <div className="filter-pills-row">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-pill-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="search-bar-wrap">
            <SearchIcon size={16} className="search-input-icon" />
            <input 
              type="text"
              placeholder="Search topics or chapters (e.g. multithreading, react, redis)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="learning-search-input"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                <CloseIcon size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3-Column Wide Topic Grid */}
      {filteredTopics.length > 0 ? (
        <div className="topics-grid-wide">
          {filteredTopics.map((topic) => (
            <TopicCard 
              key={topic.id} 
              topic={topic}
            />
          ))}
        </div>
      ) : (
        <div className="empty-results-box">
          <p className="empty-title">No topics or chapters found for "{searchQuery}"</p>
          <button className="reset-btn" onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}>
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
