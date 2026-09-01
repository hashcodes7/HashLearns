import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { About } from '../components/About.jsx';
import { LearningSection } from '../components/LearningSection.jsx';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={siteConfig.tagline}
      wrapperClassName="index-grid-bg"
    >
      <main className="content-wrap">
        <About />
        <LearningSection />
      </main>
    </Layout>
  );
}
