import React from 'react';
import PythonRunner from '@site/src/components/PythonRunner';

function getLanguage(props) {
  if (props.type) return props.type;
  if (props.language) return props.language;
  if (props.className) {
    const match = props.className.match(/language-([\w-]+)/);
    if (match) return match[1];
  }
  if (props.children && props.children.props) {
    const childProps = props.children.props;
    if (childProps.type) return childProps.type;
    if (childProps.language) return childProps.language;
    if (childProps.className) {
      const match = childProps.className.match(/language-([\w-]+)/);
      if (match) return match[1];
    }
  }
  return 'text';
}

function extractCodeText(props) {
  if (typeof props.code === 'string') return props.code;
  if (typeof props.children === 'string') return props.children;
  if (props.children && props.children.props && props.children.props.children) {
    const childCode = props.children.props.children;
    if (typeof childCode === 'string') return childCode;
    if (Array.isArray(childCode)) return childCode.join('');
  }
  if (Array.isArray(props.children)) {
    return props.children
      .map((c) => (typeof c === 'string' ? c : c?.props?.children || ''))
      .join('');
  }
  return String(props.children || '');
}

export default function CodeBlock(props) {
  const lang = getLanguage(props);
  const rawCode = extractCodeText(props).trim();

  return (
    <PythonRunner
      type={lang}
      code={rawCode}
      originalProps={props}
    />
  );
}
