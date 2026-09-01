import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowRight, CornerDownLeft } from 'lucide-react';

export default function StackQueueVisualizer({
  mode = "stack", // "stack" or "queue"
  initialItems = [10, 20, 30],
  title,
  description
}) {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState('');
  const [lastAction, setLastAction] = useState('Initialized container.');
  const [activeItem, setActiveItem] = useState(null);

  const defaultTitle = mode === "stack" ? "Stack Visualizer (LIFO)" : "Queue Visualizer (FIFO)";
  const defaultDesc = mode === "stack"
    ? "Last-In, First-Out structure: Push & Pop elements from the top."
    : "First-In, First-Out structure: Enqueue at Rear, Dequeue from Front.";

  // Stack Operations
  const handlePush = (e) => {
    e.preventDefault();
    const val = newItem.trim() || Math.floor(Math.random() * 89 + 10).toString();
    setItems((prev) => [...prev, val]);
    setActiveItem(val);
    setLastAction(`Pushed "${val}" onto the Stack Top.`);
    setNewItem('');
  };

  const handlePop = () => {
    if (items.length === 0) {
      setLastAction("Stack Underflow! Container is empty.");
      return;
    }
    const popped = items[items.length - 1];
    setActiveItem(popped);
    setItems((prev) => prev.slice(0, -1));
    setLastAction(`Popped "${popped}" from the Stack Top.`);
  };

  // Queue Operations
  const handleEnqueue = (e) => {
    e.preventDefault();
    const val = newItem.trim() || Math.floor(Math.random() * 89 + 10).toString();
    setItems((prev) => [...prev, val]);
    setActiveItem(val);
    setLastAction(`Enqueued "${val}" at the Queue Rear.`);
    setNewItem('');
  };

  const handleDequeue = () => {
    if (items.length === 0) {
      setLastAction("Queue Underflow! Container is empty.");
      return;
    }
    const dequeued = items[0];
    setActiveItem(dequeued);
    setItems((prev) => prev.slice(1));
    setLastAction(`Dequeued "${dequeued}" from the Queue Front.`);
  };

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div style={{
        background: 'rgba(17, 24, 39, 0.65)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '1.25rem',
        backdropFilter: 'blur(16px)',
        color: '#f3f4f6',
        marginBottom: '1.5rem'
      }}>
        {/* Title & Description */}
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ margin: 0, color: '#00f0ff', fontSize: '1.15rem', fontWeight: '700' }}>
            ⚡ {title || defaultTitle}
          </h4>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#9ca3af' }}>
            {description || defaultDesc}
          </p>
        </div>

        {/* Input & Action buttons */}
        <form onSubmit={mode === "stack" ? handlePush : handleEnqueue} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter value (e.g. 42)"
            style={{
              padding: '6px 12px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '0.85rem',
              outline: 'none',
              width: '160px'
            }}
          />

          {mode === "stack" ? (
            <>
              <button
                type="submit"
                style={{
                  padding: '6px 14px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ArrowDown size={14} /> Push
              </button>

              <button
                type="button"
                onClick={handlePop}
                style={{
                  padding: '6px 14px',
                  background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ArrowUp size={14} /> Pop
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                style={{
                  padding: '6px 14px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ArrowRight size={14} /> Enqueue
              </button>

              <button
                type="button"
                onClick={handleDequeue}
                style={{
                  padding: '6px 14px',
                  background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <CornerDownLeft size={14} /> Dequeue
              </button>
            </>
          )}
        </form>

        {/* Action Log Callout */}
        <div style={{
          padding: '8px 12px',
          background: 'rgba(0, 240, 255, 0.05)',
          borderLeft: '3px solid #00f0ff',
          borderRadius: '0 6px 6px 0',
          fontSize: '0.82rem',
          color: '#e2e8f0'
        }}>
          <strong>Log: </strong>{lastAction}
        </div>
      </div>

      {/* Render Area */}
      <div style={{
        padding: '2rem',
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {mode === "stack" ? (
          /* Vertical Stack Bucket Container */
          <div style={{
            width: '180px',
            minHeight: '220px',
            borderLeft: '4px solid #3b82f6',
            borderRight: '4px solid #3b82f6',
            borderBottom: '4px solid #3b82f6',
            borderRadius: '0 0 12px 12px',
            display: 'flex',
            flexDirection: 'column-reverse',
            padding: '8px',
            gap: '8px',
            background: 'rgba(30, 41, 59, 0.4)',
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)'
          }}>
            {items.length === 0 ? (
              <span style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', margin: 'auto' }}>
                Stack is Empty
              </span>
            ) : (
              items.map((val, idx) => {
                const isTop = idx === items.length - 1;
                return (
                  <div key={idx} style={{
                    padding: '10px',
                    background: isTop ? 'linear-gradient(135deg, #00f0ff, #3b82f6)' : 'rgba(30, 41, 59, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: isTop ? '#090d16' : '#fff',
                    fontWeight: '700',
                    textAlign: 'center',
                    borderRadius: '6px',
                    position: 'relative',
                    transition: 'all 0.3s ease'
                  }}>
                    {val}
                    {isTop && (
                      <span style={{
                        position: 'absolute',
                        right: '-60px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: '#00f0ff',
                        color: '#090d16',
                        fontSize: '0.65rem',
                        fontWeight: '800',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        ← TOP
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* Horizontal Queue Pipe Container */
          <div style={{
            minWidth: '280px',
            maxWidth: '100%',
            height: '70px',
            borderTop: '4px solid #10b981',
            borderBottom: '4px solid #10b981',
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            gap: '8px',
            background: 'rgba(30, 41, 59, 0.4)',
            overflowX: 'auto'
          }}>
            {items.length === 0 ? (
              <span style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', margin: 'auto' }}>
                Queue is Empty
              </span>
            ) : (
              items.map((val, idx) => {
                const isFront = idx === 0;
                const isRear = idx === items.length - 1;
                return (
                  <div key={idx} style={{
                    padding: '8px 16px',
                    background: isFront ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : isRear ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(30, 41, 59, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontWeight: '700',
                    borderRadius: '6px',
                    minWidth: '50px',
                    textAlign: 'center',
                    position: 'relative'
                  }}>
                    {val}
                    {isFront && (
                      <span style={{ position: 'absolute', top: '-22px', left: 0, fontSize: '0.65rem', color: '#ef4444', fontWeight: '800' }}>
                        FRONT
                      </span>
                    )}
                    {isRear && (
                      <span style={{ position: 'absolute', bottom: '-22px', right: 0, fontSize: '0.65rem', color: '#10b981', fontWeight: '800' }}>
                        REAR
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
