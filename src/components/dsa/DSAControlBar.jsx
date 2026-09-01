import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Shuffle, Sliders } from 'lucide-react';

export default function DSAControlBar({
  title = "Algorithm Visualizer",
  description = "",
  inputLabel = "Custom Data (comma separated):",
  rawInputString = "",
  onInputChange = () => {},
  onRandomize = () => {},
  controller = {},
  allowCustomInput = true
}) {
  const {
    isPlaying,
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
    speed,
    setSpeed,
    currentStep,
    totalSteps,
    activeSnapshot
  } = controller;

  const [inputVal, setInputVal] = useState(rawInputString);

  const handleApplyInput = (e) => {
    e.preventDefault();
    onInputChange(inputVal);
  };

  const explanation = activeSnapshot?.explanation || "Ready to execute.";

  return (
    <div style={{
      background: 'rgba(17, 24, 39, 0.65)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '1.25rem',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      color: '#f3f4f6',
      marginBottom: '1.5rem'
    }}>
      {/* Title & Description */}
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h4 style={{ margin: 0, color: 'var(--ifm-color-primary, #00f0ff)', fontSize: '1.15rem', fontWeight: '700', letterSpacing: '0.02em' }}>
            ⚡ {title}
          </h4>
          {description && (
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#9ca3af' }}>
              {description}
            </p>
          )}
        </div>

        {/* Step Indicator Badge */}
        <div style={{
          background: 'rgba(0, 240, 255, 0.1)',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          color: '#00f0ff',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: '600'
        }}>
          Step {totalSteps > 0 ? currentStep + 1 : 0} of {totalSteps}
        </div>
      </div>

      {/* Editable Input Row */}
      {allowCustomInput && (
        <form onSubmit={handleApplyInput} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: '500' }}>
            {inputLabel}
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="e.g. 45, 12, 89, 32, 6"
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '6px 12px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '6px 14px',
              background: 'linear-gradient(135deg, #00f0ff, #3b82f6)',
              color: '#090d16',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Apply Data
          </button>
          <button
            type="button"
            onClick={() => {
              const randStr = onRandomize();
              if (randStr) setInputVal(randStr);
            }}
            style={{
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: '#cbd5e1',
              fontWeight: '500',
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Shuffle size={14} /> Randomize
          </button>
        </form>
      )}

      {/* Main Control Panel (Playback buttons + Speed Slider) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        background: 'rgba(30, 41, 59, 0.5)',
        padding: '10px 16px',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        {/* Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={reset}
            title="Reset"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={stepBackward}
            disabled={currentStep <= 0}
            title="Step Back"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: currentStep <= 0 ? '#555' : '#fff',
              padding: '8px',
              borderRadius: '8px',
              cursor: currentStep <= 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <SkipBack size={16} />
          </button>

          <button
            onClick={isPlaying ? pause : play}
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              border: 'none',
              color: '#fff',
              padding: '8px 20px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem'
            }}
          >
            {isPlaying ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Play</>}
          </button>

          <button
            onClick={stepForward}
            disabled={currentStep >= totalSteps - 1}
            title="Step Forward"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: currentStep >= totalSteps - 1 ? '#555' : '#fff',
              padding: '8px',
              borderRadius: '8px',
              cursor: currentStep >= totalSteps - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Speed Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={14} style={{ color: '#9ca3af' }} />
          <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Speed:</span>
          <input
            type="range"
            min="100"
            max="1200"
            step="50"
            value={1300 - speed} // inverted so right is faster
            onChange={(e) => setSpeed(1300 - parseInt(e.target.value))}
            style={{ width: '90px', cursor: 'pointer', accentColor: '#00f0ff' }}
          />
          <span style={{ fontSize: '0.75rem', color: '#00f0ff', minWidth: '40px' }}>
            {speed}ms
          </span>
        </div>
      </div>

      {/* Explanation Box */}
      <div style={{
        marginTop: '1rem',
        padding: '10px 14px',
        background: 'rgba(0, 240, 255, 0.04)',
        borderLeft: '4px solid var(--ifm-color-primary, #00f0ff)',
        borderRadius: '0 8px 8px 0',
        fontSize: '0.88rem',
        color: '#e2e8f0',
        lineHeight: '1.5'
      }}>
        <strong style={{ color: '#00f0ff' }}>Explanation: </strong>
        {explanation}
      </div>
    </div>
  );
}
