import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';

import styles from './index.module.css';

const codeSnippet = `import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Initialize the HashLearn AI Model
model_id = "hashlearn/SuperIntelligence-v1"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)

# Generate an insight
inputs = tokenizer("Explain quantum computing", return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=50)

print(tokenizer.decode(outputs[0]))`;

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
            <span className={styles.windowTitle}>inference.py</span>
          </div>
          <div className={styles.windowBody}>
            <CodeBlock language="python">{codeSnippet}</CodeBlock>
          </div>
        </div>
      </div>

      {/* Scroll down prompt centered at the bottom of the hero */}
      <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', width: '100%', textAlign: 'center' }}>
        <Link
          to="#features"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            color: 'var(--ifm-color-emphasis-600)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            transition: 'color 0.2s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--ifm-color-primary)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--ifm-color-emphasis-600)'}
        >
          (or scroll down to get started
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="4" x2="12" y2="20"></line>
            <polyline points="18 14 12 20 6 14"></polyline>
          </svg>
          )
        </Link>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main id="features">
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
