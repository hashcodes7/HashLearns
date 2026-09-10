import React from 'react';
import Link from '@docusaurus/Link';
import { useDocById, findFirstSidebarItemLink } from '@docusaurus/plugin-content-docs/client';
import { extractLeadingEmoji } from '@docusaurus/theme-common/internal';

const COLOR_PALETTES = [
  {
    name: 'orange',
    accent: '#ea580c',
    accentDark: '#f97316',
    glow: 'rgba(234, 88, 12, 0.18)',
    tagBg: '#fff7ed',
    tagColor: '#c2410c',
    tagBorder: '#ffedd5',
    tagBgDark: 'rgba(249, 115, 22, 0.15)',
    tagColorDark: '#fb923c',
    tagBorderDark: 'rgba(249, 115, 22, 0.3)'
  },
  {
    name: 'blue',
    accent: '#2563eb',
    accentDark: '#3b82f6',
    glow: 'rgba(37, 99, 235, 0.18)',
    tagBg: '#eff6ff',
    tagColor: '#1d4ed8',
    tagBorder: '#dbeafe',
    tagBgDark: 'rgba(59, 130, 246, 0.15)',
    tagColorDark: '#60a5fa',
    tagBorderDark: 'rgba(59, 130, 246, 0.3)'
  },
  {
    name: 'green',
    accent: '#16a34a',
    accentDark: '#22c55e',
    glow: 'rgba(22, 163, 74, 0.18)',
    tagBg: '#f0fdf4',
    tagColor: '#15803d',
    tagBorder: '#dcfce7',
    tagBgDark: 'rgba(34, 197, 94, 0.15)',
    tagColorDark: '#4ade80',
    tagBorderDark: 'rgba(34, 197, 94, 0.3)'
  },
  {
    name: 'purple',
    accent: '#9333ea',
    accentDark: '#a855f7',
    glow: 'rgba(147, 51, 234, 0.18)',
    tagBg: '#faf5ff',
    tagColor: '#7e22ce',
    tagBorder: '#f3e8ff',
    tagBgDark: 'rgba(168, 85, 247, 0.15)',
    tagColorDark: '#c084fc',
    tagBorderDark: 'rgba(168, 85, 247, 0.3)'
  },
  {
    name: 'teal',
    accent: '#0d9488',
    accentDark: '#14b8a6',
    glow: 'rgba(13, 148, 136, 0.18)',
    tagBg: '#f0fdfa',
    tagColor: '#0f766e',
    tagBorder: '#ccfbf1',
    tagBgDark: 'rgba(20, 184, 166, 0.15)',
    tagColorDark: '#2dd4bf',
    tagBorderDark: 'rgba(20, 184, 166, 0.3)'
  },
  {
    name: 'rose',
    accent: '#e11d48',
    accentDark: '#f43f5e',
    glow: 'rgba(225, 29, 72, 0.18)',
    tagBg: '#fff1f2',
    tagColor: '#be123c',
    tagBorder: '#fecdd3',
    tagBgDark: 'rgba(244, 63, 94, 0.15)',
    tagColorDark: '#fb7185',
    tagBorderDark: 'rgba(244, 63, 94, 0.3)'
  }
];

function extractTitle(label) {
  if (!label) return '';
  const extracted = extractLeadingEmoji(label);
  return extracted.rest.trim();
}

function getEmojiAndCleanTitle(label) {
  if (!label) return { emoji: null, title: '' };
  const extracted = extractLeadingEmoji(label);
  return {
    emoji: extracted.emoji || null,
    title: extracted.rest.trim()
  };
}

function deriveEmoji(title, index) {
  const lower = title.toLowerCase();
  if (lower.includes('hierarchy') || lower.includes('inheritance') || lower.includes('tree') || lower.includes('class')) return '🌲';
  if (lower.includes('dispatch') || lower.includes('polymorphism') || lower.includes('dynamic') || lower.includes('runtime')) return '⚡';
  if (lower.includes('token') || lower.includes('embed') || lower.includes('text')) return '🔤';
  if (lower.includes('attention') || lower.includes('transformer') || lower.includes('llm') || lower.includes('gpt')) return '🧠';
  if (lower.includes('architecture') || lower.includes('design') || lower.includes('system')) return '📐';
  if (lower.includes('ingestion') || lower.includes('chunk') || lower.includes('rag') || lower.includes('search')) return '🔍';
  if (lower.includes('guardrail') || lower.includes('security') || lower.includes('auth')) return '🛡️';
  if (lower.includes('activation') || lower.includes('norm') || lower.includes('layer') || lower.includes('function')) return '⚙️';
  if (lower.includes('train') || lower.includes('fine') || lower.includes('weight')) return '🚀';
  
  const fallbackEmojis = ['🌲', '⚡', '🧠', '📐', '🔍', '⚙️', '🚀', '📦', '🔑', '🛡️'];
  return fallbackEmojis[index % fallbackEmojis.length];
}

function deriveChapterNumber(label, fallbackIndex) {
  if (!label) return `1.${fallbackIndex + 1}`;
  const match = label.match(/^(?:chapter\s*)?(\d+(?:\.\d+)*)/i);
  if (match) return match[1];
  return `1.${fallbackIndex + 1}`;
}

function deriveTagBadge(title) {
  const lower = title.toLowerCase();
  if (lower.includes('hierarchy') || lower.includes('inheritance')) return 'HIERARCHIES';
  if (lower.includes('dispatch') || lower.includes('polymorphism')) return 'DYNAMIC DISPATCH';
  if (lower.includes('tokenizer') || lower.includes('tokenization')) return 'TOKENIZATION';
  if (lower.includes('embedding')) return 'EMBEDDINGS';
  if (lower.includes('attention')) return 'SELF ATTENTION';
  if (lower.includes('architecture')) return 'ARCHITECTURE';
  if (lower.includes('ingestion')) return 'DATA INGESTION';
  if (lower.includes('chunking')) return 'CHUNKING';
  if (lower.includes('retrieval')) return 'RETRIEVAL';
  if (lower.includes('generation')) return 'GENERATION';
  
  // Clean numbers or dashes from title to get first 1-2 words
  const clean = title.replace(/^[\d.\s-]+/, '').trim();
  const words = clean.split(/[\s&/:-]+/);
  if (words.length > 0 && words[0]) {
    const mainWord = words.slice(0, 2).join(' ').toUpperCase();
    return mainWord.length > 20 ? mainWord.substring(0, 18) + '...' : mainWord;
  }
  return 'CHAPTER';
}

function parseSubtopicText(text) {
  if (!text) return { prefixNum: null, contentParts: [], isIndented: false };
  
  let isIndented = false;
  let cleanText = text.trim();
  
  // Check if text starts with bullet or dash or sub-item marker
  if (text.startsWith('  ') || text.startsWith('\t') || cleanText.startsWith('- ') || cleanText.startsWith('* ')) {
    isIndented = true;
    cleanText = cleanText.replace(/^[-*]\s*/, '');
  }

  // Extract lead item number if present like "1. ", "2. ", "15.1 "
  let prefixNum = null;
  const numMatch = cleanText.match(/^(\d+(?:\.\d+)*\.?)\s+(.*)/);
  if (numMatch) {
    prefixNum = numMatch[1];
    cleanText = numMatch[2];
  }

  // Parse inline badges e.g. "( IS-A Relationship)" or "( HAS-A Relationship)" or "(Method Overloading)"
  // Matches uppercase tags or key phrases inside () or []
  const parts = [];
  const regex = /([\(\[]\s*([A-Z0-9_\-\s]{2,18})\s*[\)\]])/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(cleanText)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: cleanText.substring(lastIndex, match.index) });
    }
    parts.push({ type: 'badge', value: match[2].trim() });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < cleanText.length) {
    parts.push({ type: 'text', value: cleanText.substring(lastIndex) });
  }

  return { prefixNum, contentParts: parts, isIndented };
}

function DefaultCard({ title, description, href, icon, index = 0 }) {
  const colorScheme = COLOR_PALETTES[index % COLOR_PALETTES.length];

  return (
    <Link to={href} className="chapter-index-card" style={{
      '--card-accent': colorScheme.accentDark,
      '--card-glow': colorScheme.glow
    }}>
      <div className="chapter-card-top-bar">
        <span className="chapter-tag-pill" style={{
          '--tag-bg': colorScheme.tagBg,
          '--tag-color': colorScheme.tagColor,
          '--tag-border': colorScheme.tagBorder,
          '--tag-bg-dark': colorScheme.tagBgDark,
          '--tag-color-dark': colorScheme.tagColorDark,
          '--tag-border-dark': colorScheme.tagBorderDark
        }}>
          {deriveTagBadge(title)}
        </span>
        <span className="chapter-index-num">1.{index + 1}</span>
      </div>

      <span className="chapter-emoji-icon">{icon || '📄'}</span>

      <h3 className="chapter-card-title">{title}</h3>
      
      {description && (
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
          {description}
        </p>
      )}
    </Link>
  );
}

function CardCategory({ item, index = 0 }) {
  const { emoji, title } = getEmojiAndCleanTitle(item.label);
  const items = item.items || [];
  const href = findFirstSidebarItemLink(item);

  const displayEmoji = emoji || deriveEmoji(title, index);
  const chapterNum = deriveChapterNumber(item.label, index);
  const tagBadgeText = deriveTagBadge(title);
  const colorScheme = COLOR_PALETTES[index % COLOR_PALETTES.length];

  const isChapter = items.some(subItem => subItem.type === 'link' || subItem.type === 'category');

  if (!isChapter || items.length === 0) {
    return <DefaultCard title={title} description={`${items.length} items`} href={href} icon={displayEmoji} index={index} />;
  }

  return (
    <div 
      className="chapter-index-card"
      style={{
        '--card-accent': colorScheme.accentDark,
        '--card-glow': colorScheme.glow
      }}
    >
      {/* TOP BAR: Tag Pill Badge (Left) & Chapter Number (Right) */}
      <div className="chapter-card-top-bar">
        <span 
          className="chapter-tag-pill" 
          style={{
            '--tag-bg': colorScheme.tagBg,
            '--tag-color': colorScheme.tagColor,
            '--tag-border': colorScheme.tagBorder,
            '--tag-bg-dark': colorScheme.tagBgDark,
            '--tag-color-dark': colorScheme.tagColorDark,
            '--tag-border-dark': colorScheme.tagBorderDark
          }}
        >
          {tagBadgeText}
        </span>
        <span className="chapter-index-num">{chapterNum}</span>
      </div>

      {/* ICON / EMOJI */}
      <span className="chapter-emoji-icon">{displayEmoji}</span>

      {/* CHAPTER TITLE */}
      <h3 className="chapter-card-title">
        {href ? (
          <Link to={href}>{title}</Link>
        ) : (
          <span>{title}</span>
        )}
      </h3>

      {/* SUBTOPICS LIST */}
      <ul className="chapter-subtopics-list">
        {items.map((subItem, idx) => {
          const subRawTitle = extractTitle(subItem.label);
          const subHref = subItem.href || (subItem.type === 'category' ? findFirstSidebarItemLink(subItem) : undefined);
          const { prefixNum, contentParts, isIndented } = parseSubtopicText(subRawTitle);
          const displayNum = prefixNum || `${idx + 1}.`;

          if (isIndented) {
            return (
              <li key={idx} className="chapter-subtopic-indented">
                {subHref ? (
                  <Link to={subHref} className="chapter-subtopic-link">
                    {contentParts.map((part, pIdx) => 
                      part.type === 'badge' ? (
                        <span key={pIdx} className="chapter-inline-badge">{part.value}</span>
                      ) : (
                        <span key={pIdx}>{part.value}</span>
                      )
                    )}
                  </Link>
                ) : (
                  <span>
                    {contentParts.map((part, pIdx) => 
                      part.type === 'badge' ? (
                        <span key={pIdx} className="chapter-inline-badge">{part.value}</span>
                      ) : (
                        <span key={pIdx}>{part.value}</span>
                      )
                    )}
                  </span>
                )}
              </li>
            );
          }

          return (
            <li key={idx} className="chapter-subtopic-item">
              <span className="chapter-subtopic-num">{displayNum}</span>
              <div style={{ flex: 1 }}>
                {subHref ? (
                  <Link to={subHref} className="chapter-subtopic-link">
                    {contentParts.map((part, pIdx) => 
                      part.type === 'badge' ? (
                        <span key={pIdx} className="chapter-inline-badge">{part.value}</span>
                      ) : (
                        <span key={pIdx}>{part.value}</span>
                      )
                    )}
                  </Link>
                ) : (
                  <span>
                    {contentParts.map((part, pIdx) => 
                      part.type === 'badge' ? (
                        <span key={pIdx} className="chapter-inline-badge">{part.value}</span>
                      ) : (
                        <span key={pIdx}>{part.value}</span>
                      )
                    )}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CardLink({ item, index = 0 }) {
  const doc = useDocById(item.docId ?? undefined);
  const { emoji, title } = getEmojiAndCleanTitle(item.label);
  const displayEmoji = emoji || deriveEmoji(title, index);
  return <DefaultCard title={title} description={doc?.description} href={item.href} icon={displayEmoji} index={index} />;
}

export default function DocCard({ item, index = 0 }) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} index={index} />;
    case 'category':
      return <CardCategory item={item} index={index} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
