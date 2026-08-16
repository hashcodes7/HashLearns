import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type CourseItem = {
  title: string;
  link: string;
};

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  courses?: CourseItem[];
};

const FeatureList: FeatureItem[] = [
  {
    title: 'AI Applications & Orchestration',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Projects & frameworks for AI Applications built on top of LLMs.
      </>
    ),
    courses: [
      { title: 'Frameworks', link: '/docs/ai-applications-orchestration/frameworks' },
      { title: 'RAG Architecture', link: '/docs/ai-applications-orchestration/rag-architecture' },
      { title: 'Recommendation Systems', link: '/docs/ai-applications-orchestration/recommendation-systems' },
    ],
  },
  {
    title: 'LLMs from Scratch',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Build large language models entirely from scratch and understand their components.
      </>
    ),
    courses: [
      { title: 'LLM Components', link: '/docs/llms-from-scratch/llm-components' },
      { title: 'Modern Qwen end to end', link: '/docs/llms-from-scratch/modern-qwen-end-to-end' },
      { title: 'GPT 2 end to end', link: '/docs/llms-from-scratch/gpt2-architecture-end-to-end' },
    ],
  },
  {
    title: 'QnA & Interview',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Prepare for your next technical AI interview with comprehensive QnA.
      </>
    ),
    courses: [
      { title: 'Interview Questions', link: '/docs/qna-interview/interview-questions' },
    ],
  },
  {
    title: 'Data Structures & Algorithms',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Master core computer science concepts to ace technical interviews.
      </>
    ),
    courses: [
      { title: 'Algorithms', link: '/docs/algo/algorithms' },
      { title: 'Data Structures', link: '/docs/algo/datastructures' },
    ],
  },
  {
    title: 'System Design',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Learn to design scalable, distributed, and highly available systems.
      </>
    ),
    courses: [
      { title: 'Deploy', link: '/docs/sys/deploy' },
      { title: 'Static Website Deployment', link: '/docs/sys/static-website-deployment/Chapter-1-Cloudflare-Pages/deploy-docusaurus' },
      { title: 'Dockerization Manually', link: '/docs/sys/dockerization-manually' },
      { title: 'Dockerization using CI/CD', link: '/docs/sys/dockerization-using-ci-cd' },
    ],
  },
  {
    title: 'Computer Vision',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Dive deep into image processing, object detection, and vision models.
      </>
    ),
    courses: [
      { title: 'Core Vision Concepts', link: '/docs/vision/core-vision-concepts' },
    ],
  },
  {
    title: 'Flutter',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Build natively compiled applications for mobile, web, and desktop from a single codebase.
      </>
    ),
    courses: [
      { title: 'Core Framework', link: '/docs/flutter/core-framework' },
    ],
  },
  {
    title: 'Templates',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Explore pre-built templates and authoring guidelines for your documentation.
      </>
    ),
    courses: [
      { title: 'Docusaurus', link: '/docs/templates/docusaurus' },
      { title: 'Custom Components Made', link: '/docs/templates/custom-components-made' },
    ],
  },
];

import Link from '@docusaurus/Link';

function Feature({ title, Svg, description, courses }: FeatureItem) {
  return (
    <div className={clsx('col col--4')} style={{ marginBottom: '2rem' }}>
      <div className={styles.flipCard}>
        <div className={styles.flipCardInner}>
          {/* Front of the Card */}
          <div className={clsx(styles.flipCardFront, "card shadow--md")} style={{ padding: '2rem' }}>
            <div className="text--center">
              <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md" style={{ marginTop: '1rem' }}>
              <Heading as="h3">{title}</Heading>
              <p>{description}</p>
            </div>
          </div>

          {/* Back of the Card */}
          <div className={clsx(styles.flipCardBack, "card shadow--md")}>
            <Heading as="h4" style={{ marginBottom: '1rem' }}>{title} Courses</Heading>
            {courses && courses.length > 0 ? (
              <ul style={{ listStyleType: 'none', padding: 0, width: '100%' }}>
                {courses.map((course, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem' }}>
                    <Link to={course.link} className="button button--secondary button--block">
                      {course.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>More courses coming soon!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
