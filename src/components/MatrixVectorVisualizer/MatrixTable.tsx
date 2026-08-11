import React from 'react';

interface MatrixTableProps {
  matrix: number[][];
  tokens: string[];
  colors: string[];
  selectedRow: number | null;
  setSelectedRow: (row: number | null) => void;
  updateValue: (row: number, col: number, value: string) => void;
}

export default function MatrixTable({
  matrix,
  tokens,
  colors,
  selectedRow,
  setSelectedRow,
  updateValue
}: MatrixTableProps) {
  return (
    <div style={{ flex: '0 1 320px', display: 'flex', flexDirection: 'column' }}>
      <h4 style={{ marginBottom: '20px', borderBottom: '1px solid var(--ifm-color-emphasis-200)', paddingBottom: '10px' }}>Matrix View (X ∈ R⁴ˣ³)</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {matrix.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '90px 1fr', 
              gap: '12px',
              padding: '8px',
              borderRadius: '10px',
              backgroundColor: selectedRow === rowIndex ? 'var(--ifm-color-emphasis-200)' : 'var(--ifm-color-emphasis-50)',
              boxShadow: selectedRow === rowIndex ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
              border: `1px solid ${selectedRow === rowIndex ? colors[rowIndex] : 'transparent'}`,
              transition: 'all 0.2s ease-in-out',
              cursor: 'pointer',
              alignItems: 'center'
            }}
            onMouseEnter={() => setSelectedRow(rowIndex)}
            onMouseLeave={() => setSelectedRow(null)}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: '600', 
              color: 'white', 
              fontSize: '0.8rem',
              backgroundColor: colors[rowIndex],
              padding: '4px 8px',
              borderRadius: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {tokens[rowIndex]}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '8px 4px',
              border: '1px solid var(--ifm-color-emphasis-300)',
              borderRadius: '8px',
              background: 'var(--ifm-background-surface-color)',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
              transition: 'border-color 0.2s',
              position: 'relative'
            }}>
              {row.map((val, colIndex) => (
                <React.Fragment key={colIndex}>
                  <input
                    type="number"
                    step="0.1"
                    value={val}
                    onChange={(e) => updateValue(rowIndex, colIndex, e.target.value)}
                    style={{
                      flex: 1,
                      minWidth: '0',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'center',
                      color: 'var(--ifm-font-color-base)',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      outline: 'none'
                    }}
                  />
                  {colIndex < row.length - 1 && (
                    <div style={{
                      width: '1px',
                      height: '20px',
                      backgroundColor: 'var(--ifm-color-emphasis-300)',
                      margin: '0 4px'
                    }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
