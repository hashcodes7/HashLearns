import React, { useState, useMemo } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import { TopicCard } from './TopicCard.jsx';
import { SearchIcon, CloseIcon } from './Icons.jsx';

export function LearningSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All'];

  // Fetch dynamically generated categories/courses from feature-cards-plugin
  const pluginData = usePluginData('feature-cards-plugin') || [];
  
  const topics = pluginData.map((item, idx) => {
    // Attempt to map graphic from title
    const t = item.title.toLowerCase();
    let graphic = 'dsa';
    let color = '#38bdf8';
    
    if (t.includes('system design')) { graphic = 'system-design'; color = '#a855f7'; }
    else if (t.includes('devops') || t.includes('cloud')) { graphic = 'devops'; color = '#f43f5e'; }
    else if (t.includes('java')) { graphic = 'java'; color = '#f59e0b'; }
    else if (t.includes('react') || t.includes('frontend')) { graphic = 'react'; color = '#06b6d4'; }
    else if (t.includes('spring')) { graphic = 'spring'; color = '#10b981'; }

    return {
      id: item.title,
      title: item.title,
      tag: 'All',
      description: item.description,
      graphic: graphic,
      color: color,
      docCategory: item.courses && item.courses.length > 0 ? item.courses[0].link.split('/').slice(0, 3).join('/') : '/docs',
      chapters: item.courses ? item.courses.map(course => ({
        title: course.title,
        docPath: course.link
      })) : []
    };
  });

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
