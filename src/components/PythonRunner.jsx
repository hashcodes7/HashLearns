import React, { useState, useEffect, useRef } from 'react';
import CodeBlockOriginal from '@theme-original/CodeBlock';
import { PlayIcon, CopyIcon, CheckIcon, CloseIcon } from './Icons';

const DEFAULT_LAMBDA_URL = 'https://ufyrkfcenpikwczycbv3esozv40lxxik.lambda-url.ap-south-1.on.aws/';

const COLOR_PALETTE = ['#38bdf8', '#f97316', '#22c55e', '#a855f7', '#ec4899', '#eab308'];

const MATPLOTLIB_SHIM = `import sys, types, json

class _MockPlotCollector:
    def __init__(self):
        self.datasets = []
        self.xlabel_val = ""
        self.ylabel_val = ""
        self.title_val = ""

    def _convert(self, x, y):
        try:
            x_lst = x.tolist() if hasattr(x, "tolist") else list(x)
            y_lst = y.tolist() if hasattr(y, "tolist") else list(y)
            return [{"x": float(px), "y": float(py)} for px, py in zip(x_lst, y_lst)]
        except Exception:
            return []

    def scatter(self, x, y, label=None, **k):
        lbl = str(label) if label is not None else f"Scatter Data"
        pts = self._convert(x, y)
        if pts:
            self.datasets.append({"type": "scatter", "label": lbl, "data": pts})

    def plot(self, x, y, label=None, **k):
        lbl = str(label) if label is not None else f"Fit Line"
        pts = self._convert(x, y)
        if pts:
            self.datasets.append({"type": "line", "label": lbl, "data": pts})

    def xlabel(self, s, **k):
        self.xlabel_val = str(s)

    def ylabel(self, s, **k):
        self.ylabel_val = str(s)

    def title(self, s, **k):
        self.title_val = str(s)

    def show(self):
        pass

_mp = _MockPlotCollector()
_fm = types.ModuleType("matplotlib")
_fp = types.ModuleType("matplotlib.pyplot")

_fp.scatter = _mp.scatter
_fp.plot = _mp.plot
_fp.xlabel = _mp.xlabel
_fp.ylabel = _mp.ylabel
_fp.title = _mp.title
_fp.show = _mp.show
_fp.datasets = _mp.datasets
_fp._mp_obj = _mp

def _fp_getattr(name):
    if hasattr(_mp, name):
        return getattr(_mp, name)
    return lambda *a, **k: None

_fp.__getattr__ = _fp_getattr
_fm.__getattr__ = lambda name: _fp if name == "pyplot" else (lambda *a, **k: None)

_fm.pyplot = _fp
sys.modules["matplotlib"] = _fm
sys.modules["matplotlib.pyplot"] = _fp
`;

import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';
import { Highlight, themes } from 'prism-react-renderer';


function ChartJSPlot({ datasets, meta = {} }) {
  const chartRef = useRef(null);
  const [ChartComponent, setChartComponent] = useState(null);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const gridColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(51, 65, 85, 0.25)';
  const tickColor = isDark ? '#94a3b8' : '#334155';
  const legendColor = isDark ? '#e2e8f0' : '#1e293b';
  const bgColor = isDark ? 'rgba(15, 23, 42, 0.6)' : '#f8fafc';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.12)';
  const btnBg = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.06)';
  const btnBorder = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.15)';
  const btnText = isDark ? '#cbd5e1' : '#1e293b';
  const headerColor = isDark ? '#94a3b8' : '#475569';

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      import('chart.js'),
      import('react-chartjs-2'),
      import('chartjs-plugin-zoom')
    ]).then(([ChartJSModule, ReactChartJS, ZoomPluginModule]) => {
      if (!isMounted) return;

      const {
        Chart: ChartJS,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      } = ChartJSModule;

      const zoomPlugin = ZoomPluginModule.default || ZoomPluginModule;

      ChartJS.register(
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        zoomPlugin
      );

      setChartComponent(() => ReactChartJS.Chart);
    }).catch((err) => {
      console.error('Failed to load Chart.js or zoom plugin:', err);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!ChartComponent || !datasets || datasets.length === 0) {
    return <div style={{ padding: '1rem', color: tickColor, fontSize: '0.85rem' }}>Loading 2D Graph Engine...</div>;
  }

  const chartData = {
    datasets: datasets.map((ds, idx) => {
      const color = COLOR_PALETTE[idx % COLOR_PALETTE.length];
      const isLine = ds.type === 'line';
      return {
        type: isLine ? 'line' : 'scatter',
        label: ds.label || (isLine ? `Fit Line ${idx + 1}` : `Data ${idx + 1}`),
        data: (ds.data || []).map((p) => ({ x: p.x, y: p.y })),
        borderColor: color,
        backgroundColor: color,
        borderWidth: isLine ? 3 : 2,
        pointRadius: isLine ? 0 : 5,
        pointHoverRadius: 8,
        showLine: isLine,
        tension: 0.1
      };
    })
  };

  const zeroAxisColor = isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(15, 23, 42, 0.5)';

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 15,
        top: 10,
        bottom: 10
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        suggestedMin: 0,
        grace: '5%',
        title: {
          display: Boolean(meta.xlabel),
          text: meta.xlabel || '',
          color: tickColor,
          font: { size: 12, weight: '700' },
          padding: { top: 6, bottom: 0 }
        },
        grid: {
          display: true,
          drawOnChartArea: true,
          color: (context) => (context.tick && context.tick.value === 0 ? zeroAxisColor : gridColor),
          lineWidth: (context) => (context.tick && context.tick.value === 0 ? 2 : 1),
          tickColor: gridColor
        },
        ticks: {
          color: tickColor,
          font: { family: 'monospace', size: 11, weight: '600' }
        }
      },
      y: {
        type: 'linear',
        suggestedMin: 0,
        grace: '5%',
        title: {
          display: Boolean(meta.ylabel),
          text: meta.ylabel || '',
          color: tickColor,
          font: { size: 12, weight: '700' },
          padding: { top: 0, bottom: 6 }
        },
        grid: {
          display: true,
          drawOnChartArea: true,
          color: (context) => (context.tick && context.tick.value === 0 ? zeroAxisColor : gridColor),
          lineWidth: (context) => (context.tick && context.tick.value === 0 ? 2 : 1),
          tickColor: gridColor
        },
        ticks: {
          color: tickColor,
          font: { family: 'monospace', size: 11, weight: '600' }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: legendColor,
          font: { weight: '700', size: 12 },
          usePointStyle: true,
          boxWidth: 8
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const x = context.parsed.x !== undefined ? context.parsed.x.toFixed(2) : '';
            const y = context.parsed.y !== undefined ? context.parsed.y.toFixed(2) : '';
            return `${label}: (${x}, ${y})`;
          }
        }
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy'
        },
        zoom: {
          wheel: {
            enabled: true
          },
          pinch: {
            enabled: true
          },
          mode: 'xy'
        }
      }
    }
  };

  const handleResetZoom = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  const displayTitle = meta.title || "📊 Interactive 2D Graph (Zoom & Pan Enabled)";

  return (
    <div className="python-plot-wrapper" style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: `1px solid ${borderColor}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ fontWeight: '700', fontSize: '0.78rem', color: headerColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {displayTitle}
        </span>
        <button
          onClick={handleResetZoom}
          style={{
            padding: '4px 10px',
            fontSize: '0.75rem',
            background: btnBg,
            border: `1px solid ${btnBorder}`,
            borderRadius: '6px',
            color: btnText,
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          title="Reset zoom and pan position"
        >
          🔍 Reset Zoom
        </button>
      </div>
      <div style={{ height: '300px', width: '100%', background: bgColor, borderRadius: '8px', border: `1px solid ${borderColor}`, padding: '12px', boxSizing: 'border-box' }}>
        <ChartComponent ref={chartRef} data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

function PlotRenderer({ datasets, meta }) {
  if (!datasets || !Array.isArray(datasets) || datasets.length === 0) return null;
  return (
    <BrowserOnly fallback={<div style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>Loading 2D Graph Engine...</div>}>
      {() => <ChartJSPlot datasets={datasets} meta={meta} />}
    </BrowserOnly>
  );
}

export default function PythonRunner({
  code,
  initialCode,
  children,
  type = 'python',
  lang,
  language,
  title = 'Code Block',
  editable = true,
  readonly = false,
  lambdaUrl = DEFAULT_LAMBDA_URL,
  originalProps = null
}) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const rawInitialCode = (code || initialCode || (typeof children === 'string' ? children : '') || '').trim();
  const [codeText, setCodeText] = useState(rawInitialCode);
  const [output, setOutput] = useState('');
  const [plotDatasets, setPlotDatasets] = useState([]);
  const [plotMeta, setPlotMeta] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'running' | 'success' | 'error'
  const [execTime, setExecTime] = useState(null);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  const handleScroll = (e) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.target.scrollTop;
      preRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  useEffect(() => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, [codeText]);

  useEffect(() => {
    setCodeText(rawInitialCode);
  }, [rawInitialCode]);

  const targetType = String(type || lang || language || 'python').toLowerCase().trim();
  const isPython = targetType === 'python' || targetType === 'py';
  const isEditable = Boolean(editable && !readonly);

  const handleRunLambda = async () => {
    if (!isPython || status === 'running') return;

    setOutput('');
    setPlotDatasets([]);
    setPlotMeta({});
    setExecTime(null);
    setStatus('running');

    const startTime = performance.now();

    let codeToSend = codeText;
    if (codeText.includes('matplotlib') || codeText.includes('plt.') || codeText.includes('scatter') || codeText.includes('plot(')) {
      const dumpCode = `\ntry:\n    if "matplotlib.pyplot" in sys.modules:\n        _plt_mod = sys.modules["matplotlib.pyplot"]\n        _mp_obj = getattr(_plt_mod, "_mp_obj", None)\n        _ds = getattr(_plt_mod, "datasets", [])\n        _xl = getattr(_mp_obj, "xlabel_val", "") if _mp_obj else ""\n        _yl = getattr(_mp_obj, "ylabel_val", "") if _mp_obj else ""\n        _tt = getattr(_mp_obj, "title_val", "") if _mp_obj else ""\n        if _ds:\n            _payload = {"datasets": _ds, "xlabel": _xl, "ylabel": _yl, "title": _tt}\n            print("__PLOT_DATA__:" + json.dumps(_payload) + "__END_PLOT_DATA__")\nexcept Exception:\n    pass\n`;
      codeToSend = `${MATPLOTLIB_SHIM}\n${codeText}${dumpCode}`;
    }

    try {
      const res = await fetch(lambdaUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToSend })
      });

      if (!res.ok) {
        throw new Error(`AWS Lambda returned HTTP status ${res.status}`);
      }

      const resData = await res.json();
      const duration = ((performance.now() - startTime) / 1000).toFixed(2);
      setExecTime(`${duration}s`);

      let payload = resData;
      if (resData && typeof resData.body === 'string') {
        try {
          payload = JSON.parse(resData.body);
        } catch (e) {
          payload = resData;
        }
      }

      let stdout = payload.stdout !== undefined ? payload.stdout : payload.output || '';
      const errorMsg = payload.error || null;
      let datasets = Array.isArray(payload.datasets) ? payload.datasets : [];
      let meta = {};

      const plotMatch = stdout.match(/__PLOT_DATA__:(.*?)__END_PLOT_DATA__/s);
      if (plotMatch) {
        try {
          const parsedPlot = JSON.parse(plotMatch[1]);
          if (Array.isArray(parsedPlot)) {
            datasets = parsedPlot;
          } else if (parsedPlot && typeof parsedPlot === 'object') {
            datasets = Array.isArray(parsedPlot.datasets) ? parsedPlot.datasets : [];
            meta = {
              xlabel: parsedPlot.xlabel || '',
              ylabel: parsedPlot.ylabel || '',
              title: parsedPlot.title || ''
            };
          }
        } catch (e) {
          console.error('Error parsing plot marker:', e);
        }
        stdout = stdout.replace(/__PLOT_DATA__:.*?__END_PLOT_DATA__/g, '').trim();
      }

      if (errorMsg) {
        setOutput(stdout ? `${stdout}\n${errorMsg}` : errorMsg);
        setStatus('error');
      } else {
        setOutput(stdout || (datasets.length > 0 ? '' : '(Code executed successfully with no output)'));
        setPlotDatasets(datasets);
        setPlotMeta(meta);
        setStatus('success');
      }
    } catch (err) {
      console.error('AWS Lambda Execution Error:', err);
      setOutput(`Cloud Compute Error: ${err.message || String(err)}`);
      setStatus('error');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;
      const newCode = val.substring(0, start) + '    ' + val.substring(end);
      setCodeText(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleCopyCode = async () => {
    if (!codeText) return;
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleClearOutput = () => {
    setOutput('');
    setPlotDatasets([]);
    setPlotMeta({});
    setStatus('idle');
    setExecTime(null);
  };

  const hasOutputOrRunning = Boolean(output || plotDatasets.length > 0 || status === 'running');
  const lineCount = codeText.split('\n').length;
  const textareaHeight = Math.max(120, Math.min(500, lineCount * 22 + 30));

  return (
    <div className="python-code-runner-wrapper" style={{ margin: '1.5rem 0' }}>
      <div className="code-block-header">
        <div className="code-block-header-title">
          {title}
        </div>

        <div className="code-block-actions">
          <button
            onClick={handleClearOutput}
            disabled={!hasOutputOrRunning}
            className="code-block-circle-btn"
            title={hasOutputOrRunning ? "Clear output" : "No output to clear"}
          >
            <CloseIcon size={16} />
          </button>

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

          <button
            onClick={handleCopyCode}
            className="code-block-circle-btn"
            title={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
          </button>
        </div>
      </div>

      <div className={`python-code-box ${!hasOutputOrRunning ? 'rounded-bottom' : ''}`} style={{ position: 'relative', overflow: 'hidden' }}>
        {isEditable ? (
          <div style={{ position: 'relative', width: '100%', minHeight: `${textareaHeight}px` }}>
            {/* 1. Live Syntax-Highlighted Code Layer */}
            <Highlight
              theme={isDark ? themes.vsDark : themes.github}
              code={codeText}
              language={targetType}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  ref={preRef}
                  className={className}
                  aria-hidden="true"
                  style={{
                    ...style,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    margin: 0,
                    padding: '1rem',
                    fontFamily: 'var(--ifm-font-family-monospace, monospace)',
                    fontSize: '0.88rem',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    background: isDark ? '#090e1a' : 'var(--bg-card, #ffffff)',
                    boxSizing: 'border-box'
                  }}
                >
                  {tokens.map((line, i) => {
                    const lineProps = getLineProps({ line });
                    const isLineEmpty = line.length === 0 || (line.length === 1 && (line[0].empty || line[0].content === ''));
                    return (
                      <div key={i} {...lineProps}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                        {isLineEmpty ? '\n' : null}
                      </div>
                    );
                  })}
                </pre>
              )}
            </Highlight>

            {/* 2. Transparent Editable Input Textarea Overlay */}
            <textarea
              ref={textareaRef}
              value={codeText}
              onChange={(e) => setCodeText(e.target.value)}
              onKeyDown={handleKeyDown}
              onScroll={handleScroll}
              spellCheck={false}
              className="code-editor-textarea"
              style={{ height: `${textareaHeight}px` }}
            />
          </div>
        ) : originalProps ? (
          <CodeBlockOriginal {...originalProps} />
        ) : (
          <CodeBlockOriginal language={targetType}>
            {codeText}
          </CodeBlockOriginal>
        )}
      </div>

      {hasOutputOrRunning && (
        <div className="clean-output-box">
          {execTime && (
            <div className="clean-output-time">
              {execTime}
            </div>
          )}

          {output && (
            <pre className={`clean-output-text ${status === 'error' ? 'is-error' : ''}`}>
              {status === 'running' ? 'Running...' : output}
            </pre>
          )}

          {status === 'running' && !output && (
            <pre className="clean-output-text">Running...</pre>
          )}

          <PlotRenderer datasets={plotDatasets} meta={plotMeta} />
        </div>
      )}
    </div>
  );
}

