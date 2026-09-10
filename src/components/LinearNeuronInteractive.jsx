import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LinearNeuronInteractive() {
  const [weight, setWeight] = useState(1);
  const [bias, setBias] = useState(0);
  const chartRef = useRef(null);

  // Targets
  const target1 = { x: -5, y: -10 };
  const target2 = { x: 5, y: 7 };

  // Calculate if targets are hit
  const y1 = weight * target1.x + bias;
  const y2 = weight * target2.x + bias;
  const t1Hit = Math.abs(y1 - target1.y) < 0.1;
  const t2Hit = Math.abs(y2 - target2.y) < 0.1;
  const isSuccess = t1Hit && t2Hit;

  const xValues = Array.from({ length: 21 }, (_, i) => i - 10);
  const yValues = xValues.map(x => weight * x + bias);

  const data = {
    labels: xValues,
    datasets: [
      {
        label: `Prediction Line`,
        data: yValues,
        borderColor: isSuccess ? '#eebb00' : '#25c2a0',
        borderWidth: 3,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 6,
        fill: false, // removed shade
        order: 2
      },
      {
        label: 'Targets',
        data: [
          { x: target1.x, y: target1.y },
          { x: target2.x, y: target2.y }
        ],
        type: 'line',
        backgroundColor: '#ff4d4f',
        borderColor: 'transparent',
        pointBackgroundColor: '#ff4d4f',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: false,
        order: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Input (x)', color: '#888888', font: { size: 12, weight: 'bold' } },
        min: -10,
        max: 10,
        type: 'linear',
        grid: { display: false },
        ticks: { color: '#888888', font: { size: 10 } }
      },
      y: {
        title: { display: true, text: 'Output (y)', color: '#888888', font: { size: 12, weight: 'bold' } },
        min: -15,
        max: 15,
        grid: { display: false },
        ticks: { color: '#888888', font: { size: 10 } }
      }
    },
    animation: {
      duration: 0
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.datasetIndex === 1) return `Target: (${context.parsed.x}, ${context.parsed.y})`;
            return `y = ${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    }
  };

  return (
    <div style={{
      border: '1px solid var(--ifm-color-emphasis-300)',
      padding: '1rem',
      borderRadius: '8px',
      margin: '1rem 0',
      background: 'linear-gradient(145deg, var(--ifm-background-surface-color), var(--ifm-color-emphasis-100))',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        .neuron-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: var(--ifm-color-emphasis-300);
          outline: none;
          opacity: 0.8;
          transition: opacity .2s;
        }
        .neuron-slider:hover {
          opacity: 1;
        }
        .neuron-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${isSuccess ? '#eebb00' : '#25c2a0'};
          cursor: pointer;
          box-shadow: 0 0 8px ${isSuccess ? 'rgba(238,187,0,0.5)' : 'rgba(37,194,160,0.5)'};
          transition: background 0.3s;
        }
        .neuron-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: ${isSuccess ? '#eebb00' : '#25c2a0'};
          cursor: pointer;
          box-shadow: 0 0 8px ${isSuccess ? 'rgba(238,187,0,0.5)' : 'rgba(37,194,160,0.5)'};
          transition: background 0.3s;
        }
      `}} />

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div style={{ flex: '1 1 150px', backgroundColor: 'var(--ifm-background-color)', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-200)' }}>
          <label style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--ifm-font-color-base)' }}>Weight (w)</span>
              <span style={{ background: isSuccess ? 'rgba(238,187,0,0.2)' : 'rgba(37,194,160,0.2)', color: isSuccess ? '#eebb00' : '#25c2a0', padding: '0.1rem 0.6rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 'bold' }}>{weight.toFixed(1)}</span>
            </div>
            <input
              type="range"
              className="neuron-slider"
              min="-5" max="5" step="0.1"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </label>
        </div>
        <div style={{ flex: '1 1 150px', backgroundColor: 'var(--ifm-background-color)', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--ifm-color-emphasis-200)' }}>
          <label style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--ifm-font-color-base)' }}>Bias (b)</span>
              <span style={{ background: isSuccess ? 'rgba(238,187,0,0.2)' : 'rgba(37,194,160,0.2)', color: isSuccess ? '#eebb00' : '#25c2a0', padding: '0.1rem 0.6rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 'bold' }}>{bias.toFixed(1)}</span>
            </div>
            <input
              type="range"
              className="neuron-slider"
              min="-10" max="10" step="0.1"
              value={bias}
              onChange={(e) => setBias(parseFloat(e.target.value))}
            />
          </label>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.8rem' }}>
        <div style={{ display: 'inline-block', padding: '0.3rem 1rem', background: isSuccess ? '#eebb00' : '#25c2a0', color: '#fff', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.95rem', boxShadow: isSuccess ? '0 2px 8px rgba(238,187,0,0.3)' : '0 2px 8px rgba(37,194,160,0.3)', transition: 'background 0.3s' }}>
          y = {weight.toFixed(1)}x {bias >= 0 ? '+' : '-'} {Math.abs(bias).toFixed(1)}
        </div>
        {isSuccess && <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#eebb00' }}>🎉 Hit! You trained the neuron</span>}
      </div>

      <div style={{ height: '200px', width: '100%', position: 'relative', backgroundColor: 'var(--ifm-background-color)', borderRadius: '8px', padding: '0.5rem', border: '1px solid var(--ifm-color-emphasis-200)' }}>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
}
