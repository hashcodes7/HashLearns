/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import IconLightMode from '@theme/Icon/LightMode';
import IconDarkMode from '@theme/Icon/DarkMode';
import styles from './styles.module.css';

function getNextColorMode(colorMode) {
  if (colorMode !== null) {
    return colorMode === 'dark' ? 'light' : 'dark';
  }
  // If it's system mode, check the currently applied theme
  if (typeof document !== 'undefined') {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    return currentTheme === 'dark' ? 'light' : 'dark';
  }
  return 'dark';
}

function getColorModeLabel(colorMode) {
  // If system mode, pretend it's whatever the effective mode is, or just return 'mode'
  return colorMode === 'dark'
    ? translate({ message: 'dark mode', id: 'theme.colorToggle.ariaLabel.mode.dark' })
    : translate({ message: 'light mode', id: 'theme.colorToggle.ariaLabel.mode.light' });
}

function getColorModeAriaLabel(colorMode) {
  return translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
    },
    { mode: getColorModeLabel(colorMode) },
  );
}

function CurrentColorModeIcon() {
  return (
    <>
      <IconLightMode aria-hidden className={clsx(styles.toggleIcon, styles.lightToggleIcon)} />
      <IconDarkMode aria-hidden className={clsx(styles.toggleIcon, styles.darkToggleIcon)} />
    </>
  );
}

function ColorModeToggle({ className, buttonClassName, value, onChange }) {
  const isBrowser = useIsBrowser();
  return (
    <div className={clsx(styles.toggle, className)}>
      <button
        className={clsx('clean-btn', styles.toggleButton, !isBrowser && styles.toggleButtonDisabled, buttonClassName)}
        type="button"
        onClick={() => onChange(getNextColorMode(value))}
        disabled={!isBrowser}
        title={getColorModeLabel(value)}
        aria-label={getColorModeAriaLabel(value)}>
        <CurrentColorModeIcon />
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);
