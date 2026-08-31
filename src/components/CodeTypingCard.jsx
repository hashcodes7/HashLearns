import React, { useState, useEffect } from 'react';

const SNIPPETS = [
  {
    filename: 'career.py',
    lines: [
      {
        text: 'import future',
        render: () => (
          <span>
            <span className="token-py-kw">import</span> <span className="token-py-plain">future</span>
          </span>
        )
      },
      {
        text: '',
        render: () => <span>&nbsp;</span>
      },
      {
        text: 'my_career = future',
        render: () => (
          <span>
            <span className="token-py-plain">my_career</span> <span className="token-py-op">=</span> <span className="token-py-plain">future</span>
          </span>
        )
      }
    ]
  },
  {
    filename: 'architect.java',
    lines: [
      {
        text: 'import java.util.concurrent.*;',
        render: () => (
          <span>
            <span className="token-py-kw">import</span> <span className="token-py-plain">java.util.concurrent.*;</span>
          </span>
        )
      },
      {
        text: '',
        render: () => <span>&nbsp;</span>
      },
      {
        text: 'Career sarvy = Future.achieve();',
        render: () => (
          <span>
            <span className="token-py-type">Career</span> <span className="token-py-plain">sarvy = </span><span className="token-py-func">Future.achieve();</span>
          </span>
        )
      }
    ]
  },
  {
    filename: 'vault.ts',
    lines: [
      {
        text: 'const distribute = (knowledge) => {',
        render: () => (
          <span>
            <span className="token-py-kw">const</span> <span className="token-py-func">distribute</span> <span className="token-py-op">=</span> <span className="token-py-plain">(knowledge) =&gt; {'{'}</span>
          </span>
        )
      },
      {
        text: '  return "Free Forever 🚀";',
        render: () => (
          <span>
            <span className="token-py-kw">&nbsp;&nbsp;return</span> <span className="token-py-str">"Free Forever 🚀";</span>
          </span>
        )
      },
      {
        text: '};',
        render: () => <span>{'}'};</span>
      }
    ]
  }
];

export function CodeTypingCard() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  const snippet = SNIPPETS[snippetIdx];

  useEffect(() => {
    setLineIdx(0);
    setCharIdx(0);

    let lIdx = 0;
    let cIdx = 0;
    let timer;

    const tick = () => {
      if (lIdx >= snippet.lines.length) {
        // Pause at the end of snippet, then switch
        timer = setTimeout(() => {
          setSnippetIdx((prev) => (prev + 1) % SNIPPETS.length);
        }, 3200);
        return;
      }

      const targetLine = snippet.lines[lIdx].text;

      if (cIdx < targetLine.length) {
        cIdx++;
        setCharIdx(cIdx);
        setLineIdx(lIdx);
        const speed = Math.floor(Math.random() * 20) + 30;
        timer = setTimeout(tick, speed);
      } else {
        lIdx++;
        cIdx = 0;
        setLineIdx(lIdx);
        setCharIdx(0);
        timer = setTimeout(tick, 180);
      }
    };

    timer = setTimeout(tick, 400);

    return () => clearTimeout(timer);
  }, [snippetIdx]);

  return (
    <div className="mini-terminal-wrapper">
      <div className="mini-terminal-card">
        {/* Terminal Header */}
        <div className="mini-terminal-header">
          <div className="mini-traffic-dots">
            <span className="mini-dot mini-dot-red" />
            <span className="mini-dot mini-dot-yellow" />
            <span className="mini-dot mini-dot-green" />
          </div>
          <div className="mini-terminal-title">{snippet.filename}</div>
          <div className="mini-header-spacer" />
        </div>

        {/* Terminal Code Body */}
        <div className="mini-terminal-body">
          {snippet.lines.map((line, idx) => {
            if (idx < lineIdx) {
              return (
                <div key={idx} className="mini-code-line">
                  {line.render()}
                </div>
              );
            } else if (idx === lineIdx) {
              const partial = line.text.slice(0, charIdx);
              return (
                <div key={idx} className="mini-code-line">
                  <span className="token-py-plain">{partial}</span>
                  <span className="mini-cursor">|</span>
                </div>
              );
            } else {
              return (
                <div key={idx} className="mini-code-line placeholder-line">
                  &nbsp;
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
