import React, { useState, useEffect, useRef } from 'react';

const DEFAULT_LAMBDA_URL = 'https://ufyrkfcenpikwczycbv3esozv40lxxik.lambda-url.ap-south-1.on.aws/';

export default function PyScriptRunner({
  initialCode = `# Linear Regression using SciPy & NumPy
import numpy as np
from scipy import stats

# Training Data (House Sizes vs Prices)
X_train = np.array([1, 2, 3, 4]) # Sizes
y_train = np.array([2, 4, 6, 8]) # Prices

# Fit Linear Regression Model
res = stats.linregress(X_train, y_train)

# Predict price for house size = 5
prediction = res.slope * 5 + res.intercept
print(f"Predicted price for size 5: {prediction}")
print(f"Model Slope (m): {res.slope}")
print(f"Model Intercept (c): {res.intercept}")
print(f"R-squared: {res.rvalue**2:.4f}")
`,
  title = "Interactive Python Playground",
  height = "260px",
  autoRun = false,
  lambdaUrl = DEFAULT_LAMBDA_URL
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'running' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('Ready');
  const [executionTime, setExecutionTime] = useState(null);
  const textareaRef = useRef(null);

  const handleRun = async () => {
    if (status === 'running') return;

    setOutput('');
    setExecutionTime(null);
    setStatus('running');
    setStatusMessage('Sending code to AWS Lambda Cloud Engine...');

    const startTime = performance.now();

    try {
      const res = await fetch(lambdaUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      if (!res.ok) {
        throw new Error(`AWS Lambda returned HTTP status ${res.status}`);
      }

      const data = await res.json();
      const duration = ((performance.now() - startTime) / 1000).toFixed(2);
      setExecutionTime(`${duration}s`);

      if (data.status === 'error') {
        setOutput(data.output || 'Execution Error occurred on AWS Lambda');
        setStatus('error');
        setStatusMessage('Execution Error');
      } else {
        setOutput(data.output || '(Code executed successfully with no print output)');
        setStatus('success');
        setStatusMessage(`Executed in ${duration}s`);
      }
    } catch (err) {
      console.error('AWS Lambda Execution Error:', err);
      setOutput(`Cloud Compute Error: ${err.message || String(err)}`);
      setStatus('error');
      setStatusMessage('Network / Compute Error');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
    setStatus('idle');
    setStatusMessage('Ready');
    setExecutionTime(null);
  };

  const handleClearOutput = () => {
    setOutput('');
  };

  useEffect(() => {
    if (autoRun) {
      handleRun();
    }
  }, []);

  return (
    <div style={{
      margin: '1.5rem 0',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))',
      border: '1px solid rgba(0, 240, 255, 0.2)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 240, 255, 0.08)',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 1.25rem',
        background: 'rgba(15, 23, 42, 0.8)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🐍</span>
          <span style={{ fontWeight: '700', fontSize: '1rem', color: '#00f0ff', letterSpacing: '0.3px' }}>
            {title}
          </span>
          <span style={{
            fontSize: '0.7rem',
            padding: '2px 8px',
            borderRadius: '10px',
            background: 'rgba(56, 189, 248, 0.12)',
            color: '#38bdf8',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            ☁️ AWS Lambda Cloud Engine (ap-south-1)
          </span>
        </div>

        {/* Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            fontSize: '0.8rem',
            color: status === 'error' ? '#f87171' : status === 'success' ? '#4ade80' : '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: status === 'running'
                ? '#f59e0b'
                : status === 'error'
                ? '#ef4444'
                : status === 'success'
                ? '#22c55e'
                : '#64748b',
              boxShadow: status === 'running'
                ? '0 0 8px #f59e0b'
                : status === 'success'
                ? '0 0 8px #22c55e'
                : 'none'
            }} />
            {statusMessage}
          </span>
        </div>
      </div>

      {/* Code Editor Container */}
      <div style={{ position: 'relative', background: '#0b1329' }}>
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '12px',
          fontSize: '0.7rem',
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 2
        }}>
          Python 3.11 (AWS Cloud)
        </div>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          style={{
            width: '100%',
            height: height,
            padding: '1rem',
            background: 'transparent',
            color: '#e2e8f0',
            fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", Consolas, monospace',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            border: 'none',
            outline: 'none',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Action Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.65rem 1rem',
        background: 'rgba(15, 23, 42, 0.9)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleRun}
            disabled={status === 'running'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.45rem 1.1rem',
              background: status === 'running'
                ? 'rgba(56, 189, 248, 0.3)'
                : 'linear-gradient(135deg, #0284c7, #0369a1)',
              color: '#ffffff',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: status === 'running' ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 10px rgba(2, 132, 199, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            {status === 'running' ? (
              <>⏳ Running on AWS Lambda...</>
            ) : (
              <>⚡ Run Code on AWS</>
            )}
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: '0.45rem 0.85rem',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#cbd5e1',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Reset code to original snippet"
          >
            🔄 Reset
          </button>
        </div>

        {output && (
          <button
            onClick={handleClearOutput}
            style={{
              padding: '0.45rem 0.85rem',
              background: 'transparent',
              color: '#94a3b8',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            🧹 Clear Output
          </button>
        )}
      </div>

      {/* Terminal / Output Console */}
      {(output || status === 'running') && (
        <div style={{
          background: '#030712',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '1rem',
          fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
          fontSize: '0.85rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            color: '#64748b',
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            <span>Terminal Output [AWS Lambda Compute]</span>
            {executionTime && <span>Time: {executionTime}</span>}
          </div>

          {output && (
            <pre style={{
              margin: 0,
              padding: '0.75rem',
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              color: status === 'error' ? '#f87171' : '#38bdf8',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {output}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
