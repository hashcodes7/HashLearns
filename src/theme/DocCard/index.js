import React from 'react';
import Link from '@docusaurus/Link';
import { useDocById, findFirstSidebarItemLink } from '@docusaurus/plugin-content-docs/client';
import { extractLeadingEmoji } from '@docusaurus/theme-common/internal';

function extractTitle(label) {
  if (!label) return '';
  const extracted = extractLeadingEmoji(label);
  return extracted.rest.trim();
}

function DefaultCard({ title, description, href, icon }) {
  return (
    <Link to={href} style={{
      background: 'var(--bg-card, #111827)',
      border: '1px solid var(--border-subtle, rgba(255,255,255,0.06))',
      borderRadius: '10px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      textDecoration: 'none',
      color: 'inherit',
      boxShadow: 'var(--card-shadow, 0 4px 6px rgba(0,0,0,0.1))'
    }}>
      <h3 style={{
        color: 'var(--ifm-color-primary-light, #38bdf8)',
        fontSize: '1.15rem',
        margin: description ? '0 0 16px 0' : '0',
        fontWeight: '700',
        lineHeight: '1.4',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span>{icon}</span>
        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
      </h3>
      
      {description && (
        <>
          <div style={{ 
            borderBottom: '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
            marginBottom: '20px',
            width: '100%'
          }} />
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
            {description}
          </p>
        </>
      )}
    </Link>
  );
}

function CardCategory({item}) {
  const title = extractTitle(item.label);
  const items = item.items || [];
  const href = findFirstSidebarItemLink(item);

  // If this category contains ONLY other categories (like a root folder containing courses),
  // we render the default simple card.
  // We ONLY render the detailed list card if this category contains links (like a chapter containing files).
  const isChapter = items.some(subItem => subItem.type === 'link');

  if (!isChapter || items.length === 0) {
    return <DefaultCard title={title} description={`${items.length} items`} href={href} icon="📁" />;
  }

  // Detailed Chapter List Design (for Course Index pages)
  return (
    <div style={{
      background: 'var(--bg-card, #111827)',
      border: '1px solid var(--border-subtle, rgba(255,255,255,0.06))',
      borderRadius: '10px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxShadow: 'var(--card-shadow, 0 4px 6px rgba(0,0,0,0.1))'
    }}>
      <h3 style={{
        color: 'var(--ifm-color-primary-light, #38bdf8)',
        fontSize: '1.15rem',
        margin: '0 0 16px 0',
        fontWeight: '700',
        lineHeight: '1.4'
      }}>
        {href ? <Link to={href} style={{ color: 'inherit', textDecoration: 'none' }}>{title}</Link> : title}
      </h3>
      
      <div style={{ 
        borderBottom: '1px solid var(--border-subtle, rgba(255,255,255,0.1))',
        marginBottom: '20px',
        width: '100%'
      }} />

      <ul style={{ 
        listStyle: 'none', 
        padding: 0, 
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {items.map((subItem, idx) => {
          const subTitle = extractTitle(subItem.label);
          const subHref = subItem.href || (subItem.type === 'category' ? findFirstSidebarItemLink(subItem) : undefined);
          return (
            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px' }}>○</span>
              {subHref ? (
                <Link to={subHref} className="hover-underline-link" style={{ color: 'var(--ifm-color-primary-light, #38bdf8)', fontSize: '0.95rem', textDecoration: 'none', fontWeight: '500', lineHeight: '1.5' }}>
                  {subTitle}
                </Link>
              ) : (
                <span style={{ color: 'var(--ifm-color-primary-light, #38bdf8)', fontSize: '0.95rem', fontWeight: '500', lineHeight: '1.5' }}>
                  {subTitle}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CardLink({item}) {
  const doc = useDocById(item.docId ?? undefined);
  const title = extractTitle(item.label);
  return <DefaultCard title={title} description={doc?.description} href={item.href} icon="📄" />;
}

export default function DocCard({item}) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
