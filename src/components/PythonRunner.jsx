import React, { useState } from 'react';
import CodeBlockOriginal from '@theme-original/CodeBlock';
import { PlayIcon, CopyIcon, CheckIcon, CloseIcon } from './Icons';

const DEFAULT_LAMBDA_URL = 'https://ufyrkfcenpikwczycbv3esozv40lxxik.lambda-url.ap-south-1.on.aws/';

export default function PythonRunner({
  code,
  children,
  type = 'python',
  lang,
  language,
  title = 'Code Block',
  lambdaUrl = DEFAULT_LAMBDA_URL,
  originalProps = null
}) {
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'running' | 'success' | 'error'
  const [execTime, setExecTime] = useState(null);
  const [copied, setCopied] = useState(false);

  // Determine normalized language type
  const targetType = String(type || lang || language || 'python').toLowerCase().trim();
  const isPython = targetType === 'python' || targetType === 'py';

  const rawCode = (code || (typeof children === 'string' ? children : '') || '').trim();

  const handleRunLambda = async () => {
    if (!isPython || status === 'running') return;

    setOutput('');
    setExecTime(null);
    setStatus('running');

    const startTime = performance.now();

    try {
      const res = await fetch(lambdaUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: rawCode })
      });

      if (!res.ok) {
        throw new Error(`AWS Lambda returned HTTP status ${res.status}`);
      }

      const data = await res.json();
      const duration = ((performance.now() - startTime) / 1000).toFixed(2);
      setExecTime(`${duration}s`);

      if (data.status === 'error') {
        setOutput(data.output || 'Execution Error occurred on AWS Lambda');
        setStatus('error');
      } else {
        setOutput(data.output || '(Code executed successfully with no output)');
        setStatus('success');
      }
    } catch (err) {
      console.error('AWS Lambda Execution Error:', err);
      setOutput(`Cloud Compute Error: ${err.message || String(err)}`);
      setStatus('error');
    }
  };

  const handleCopyCode = async () => {
    if (!rawCode) return;
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleClearOutput = () => {
    setOutput('');
    setStatus('idle');
    setExecTime(null);
  };

  const hasOutputOrRunning = Boolean(output || status === 'running');

  return (
    <div className="python-code-runner-wrapper" style={{ margin: '1.5rem 0' }}>
      {/* Code Block Header Bar */}
      <div className="code-block-header">
        <div className="code-block-header-title">
          {title}
        </div>

        <div className="code-block-actions">
          {/* 1. CLOSE / CLEAR OUTPUT BUTTON (X) */}
          <button
            onClick={handleClearOutput}
            disabled={!hasOutputOrRunning}
            className="code-block-circle-btn"
            title={hasOutputOrRunning ? "Clear output" : "No output to clear"}
          >
            <CloseIcon size={16} />
          </button>

          {/* 2. PLAY BUTTON (▷) - Runs code for Python, Disabled for non-Python */}
          <button
            onClick={handleRunLambda}
            disabled={!isPython || status === 'running'}
            className="code-block-circle-btn"
            title={
              !isPython
                ? 'Code execution available for Python only'
                : status === 'running'
                ? 'Running code on AWS Lambda...'
                : 'Run code'
            }
          >
            {status === 'running' ? (
              <span style={{ fontSize: '0.85rem' }}>⏳</span>
            ) : (
              <PlayIcon size={16} />
            )}
          </button>

          {/* 3. COPY BUTTON */}
          <button
            onClick={handleCopyCode}
            className="code-block-circle-btn"
            title={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
          </button>
        </div>
      </div>

      {/* Code Block Content */}
      <div className={`python-code-box ${!hasOutputOrRunning ? 'rounded-bottom' : ''}`}>
        {originalProps ? (
          <CodeBlockOriginal {...originalProps} />
        ) : (
          <CodeBlockOriginal language={targetType}>
            {rawCode}
          </CodeBlockOriginal>
        )}
      </div>

      {/* Clean Minimal Output Container (Matches User Screenshot) */}
      {hasOutputOrRunning && (
        <div className="clean-output-box">
          {execTime && (
            <div className="clean-output-time">
              {execTime}
            </div>
          )}

          <pre className={`clean-output-text ${status === 'error' ? 'is-error' : ''}`}>
            {status === 'running' ? 'Running...' : output}
          </pre>
        </div>
      )}
    </div>
  );
}
