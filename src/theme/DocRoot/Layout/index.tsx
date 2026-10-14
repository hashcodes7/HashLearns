import React, {type ReactNode, useState, useEffect, useCallback} from 'react';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import type {Props} from '@theme/DocRoot/Layout';
import styles from './styles.module.css';

const STORAGE_KEY = 'hashlearns_docs_sidebar_collapsed';

function getStoredSidebarCollapsed(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export default function DocRootLayout({children}: Props): ReactNode {
  const sidebar = useDocsSidebar();
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);

  useEffect(() => {
    if (getStoredSidebarCollapsed()) {
      setHiddenSidebarContainer(true);
    }
  }, []);

  const handleSetHiddenSidebarContainer = useCallback(
    (setter: boolean | ((val: boolean) => boolean)) => {
      setHiddenSidebarContainer((prev) => {
        const next = typeof setter === 'function' ? setter(prev) : setter;
        try {
          localStorage.setItem(STORAGE_KEY, next ? 'true' : 'false');
        } catch {}
        return next;
      });
    },
    [],
  );

  return (
    <div className={styles.docsWrapper}>
      <BackToTopButton />
      <div className={styles.docRoot}>
        {sidebar && (
          <DocRootLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={handleSetHiddenSidebarContainer}
          />
        )}
        <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocRootLayoutMain>
      </div>
    </div>
  );
}
