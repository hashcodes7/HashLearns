import React from 'react';
import {translate} from '@docusaurus/Translate';
import type {Props} from '@theme/DocRoot/Layout/Sidebar/ExpandButton';
import styles from './styles.module.css';

export default function DocRootLayoutSidebarExpandButton({
  toggleSidebar,
}: Props): React.JSX.Element {
  return (
    <div
      className={styles.expandButton}
      title={translate({
        id: 'theme.docs.sidebar.expandButtonTitle',
        message: 'Expand sidebar',
        description:
          'The ARIA label and title attribute for expand button of doc sidebar',
      })}
      aria-label={translate({
        id: 'theme.docs.sidebar.expandButtonAriaLabel',
        message: 'Expand sidebar',
        description:
          'The ARIA label and title attribute for expand button of doc sidebar',
      })}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleSidebar();
        }
      }}
      onClick={toggleSidebar}>
      <div className={styles.expandContent}>
        <span className={styles.expandArrow}>&gt;&gt;</span>
        <span className={styles.expandText}>Expand</span>
      </div>
    </div>
  );
}
