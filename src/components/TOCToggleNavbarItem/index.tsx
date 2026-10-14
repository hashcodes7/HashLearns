import React from 'react';
import clsx from 'clsx';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { useTOCVisibility } from '@site/src/utils/useTOCVisibility';
import styles from './styles.module.css';

interface Props {
  className?: string;
}

export default function TOCToggleNavbarItem({ className }: Props): React.JSX.Element {
  const { isTOCVisible, toggleTOC } = useTOCVisibility();

  const titleText = isTOCVisible
    ? 'Hide Table of Contents (Maximize Content)'
    : 'Show Table of Contents';

  return (
    <div className={clsx(styles.toggleWrapper, className)}>
      <button
        type="button"
        className={clsx('clean-btn', styles.toggleBtn)}
        onClick={toggleTOC}
        title={titleText}
        aria-label={titleText}
      >
        <span className={styles.icon}>
          {isTOCVisible ? (
            <PanelRightClose size={19} strokeWidth={2} />
          ) : (
            <PanelRightOpen size={19} strokeWidth={2} />
          )}
        </span>
      </button>
    </div>
  );
}
