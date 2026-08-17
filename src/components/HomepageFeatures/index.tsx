import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import { usePluginData } from '@docusaurus/useGlobalData';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';

type CourseItem = {
  title: string;
  link: string;
};

type FeatureItem = {
  title: string;
  icon: string;
  description: string;
  courses?: CourseItem[];
};

function Feature({ title, icon, description, courses }: FeatureItem) {
  return (
    <div className={clsx('col col--4')} style={{ marginBottom: '2rem' }}>
      <div className={styles.flipCard}>
        <div className={styles.flipCardInner}>
          {/* Front of the Card */}
          <div className={clsx(styles.flipCardFront, "card shadow--md")} style={{ padding: '2rem' }}>
            <div className="text--center">
              <img src={useBaseUrl(`/img/${icon}`)} className={styles.featureSvg} role="img" alt={title} />
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
  const FeatureList = usePluginData('feature-cards-plugin') as FeatureItem[];

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
