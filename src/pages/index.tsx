import type {ReactNode} from 'react';
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
  const {siteConfig} = useDocusaurusContext();
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
            <span className={styles.windowDot} style={{backgroundColor: '#ff5f56'}}></span>
            <span className={styles.windowDot} style={{backgroundColor: '#ffbd2e'}}></span>
            <span className={styles.windowDot} style={{backgroundColor: '#27c93f'}}></span>
            <span className={styles.windowTitle}>inference.py</span>
          </div>
          <div className={styles.windowBody}>
            <CodeBlock language="python">{codeSnippet}</CodeBlock>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
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
