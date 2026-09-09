import React from 'react';
import clsx from 'clsx';
import { filterDocCardListItems } from '@docusaurus/theme-common';
import DocCard from '@theme/DocCard';

export default function DocCardList(props) {
  const { items, className } = props;
  if (!items) {
    return null;
  }
  const filteredItems = filterDocCardListItems(items);
  return (
    <section className={clsx('row', 'chapter-card-grid', className)}>
      {filteredItems.map((item, index) => (
        <article key={index} className="col col--6 margin-bottom--lg">
          <DocCard item={item} index={index} />
        </article>
      ))}
    </section>
  );
}
