import React, {type ReactNode} from 'react';
import {translate} from '@docusaurus/Translate';
import type {Props} from '@theme/DocSidebar/Desktop/CollapseButton';
import styles from './styles.module.css';

export default function CollapseButton({onClick}: Props): ReactNode {
  return (
    <div className={styles.collapseWrapper}>
      <button
        type="button"
        title={translate({
          id: 'theme.docs.sidebar.collapseButtonTitle',
          message: 'Collapse sidebar',
          description: 'The title attribute for collapse button of doc sidebar',
        })}
        aria-label={translate({
          id: 'theme.docs.sidebar.collapseButtonAriaLabel',
          message: 'Collapse sidebar',
          description: 'The title attribute for collapse button of doc sidebar',
        })}
        className={styles.collapseCircleButton}
        onClick={onClick}>
        <svg
          className={styles.collapseIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </div>
  );
}
