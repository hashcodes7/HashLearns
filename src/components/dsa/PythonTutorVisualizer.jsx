import React from 'react';

export default function PythonTutorVisualizer({
  code = `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n\nnumbers = [64, 34, 25, 12, 22]\nbubble_sort(numbers)\nprint(numbers)`,
  pyVersion = "3", // "3" or "2"
  height = "520px",
  title = "Python Code Execution Trace"
}) {
  const encodedCode = encodeURIComponent(code);
  const iframeSrc = `https://pythontutor.com/iframe-embed.html#code=${encodedCode}&py=${pyVersion}&curInstr=0`;

  return (
    <div style={{
      margin: '1.5rem 0',
      background: 'rgba(17, 24, 39, 0.65)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '1.25rem',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      color: '#f3f4f6'
    }}>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, color: '#00f0ff', fontSize: '1.1rem', fontWeight: '700' }}>
          🐍 {title} (Python {pyVersion})
        </h4>
        <span style={{ fontSize: '0.75rem', color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '12px' }}>
          Powered by PythonTutor
        </span>
      </div>

      <iframe
        src={iframeSrc}
        width="100%"
        height={height}
        style={{
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          background: '#ffffff'
        }}
        title="Python Tutor Embed"
      />
    </div>
  );
}
