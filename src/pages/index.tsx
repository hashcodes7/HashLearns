import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';

import styles from './index.module.css';

const snippets = [
  "while True:\n    coffee.drink()\n    code.write()",
  "if bug.found():\n    panic()\nelse:\n    say_its_a_feature()",
  "def success():\n    return passion + persistence",
  "import future\n\nmy_career = future.bright()"
];

function TypewriterCode() {
  const [text, setText] = useState('');
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSnippet = snippets[snippetIndex];

    if (!isDeleting && text === currentSnippet) {
      const timeout = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setSnippetIndex((prev) => (prev + 1) % snippets.length);
      const timeout = setTimeout(() => { }, 500);
      return () => clearTimeout(timeout);
    }

    const typingSpeed = isDeleting ? 30 : Math.random() * 50 + 50;

    const timeout = setTimeout(() => {
      setText(currentSnippet.substring(0, text.length + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, snippetIndex]);

  return (
    <div style={{ minHeight: '135px' }}>
      <CodeBlock language="python">{text + (isDeleting ? '' : '█')}</CodeBlock>
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroText}>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="#features"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}>
              Get Started
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="https://hashcodes.pages.dev">
              See who I am
            </Link>
          </div>
        </div>

        <div className={styles.heroCodeWindow}>
          <div className={styles.windowHeader}>
            <span className={styles.windowDot} style={{ backgroundColor: '#ff5f56' }}></span>
            <span className={styles.windowDot} style={{ backgroundColor: '#ffbd2e' }}></span>
            <span className={styles.windowDot} style={{ backgroundColor: '#27c93f' }}></span>
            <span className={styles.windowTitle}>career.py</span>
          </div>
          <div className={styles.windowBody}>
            <TypewriterCode />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main id="features">
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
