import React, { useState } from 'react';
import MatrixTable from './MatrixTable';
import VectorSpace3D from './VectorSpace3D';

interface MatrixVectorVisualizerProps {
  initialMatrix?: number[][];
  tokens?: string[];
  colors?: string[];
  showMatrix?: boolean;
  showVector?: boolean;
}

export default function MatrixVectorVisualizer({
  initialMatrix = [
    [0.2, 0.7, 0.1],
    [0.8, 0.1, 0.4],
    [0.3, 0.9, 0.2],
    [0.6, 0.4, 0.8],
  ],
  tokens = ["Token 1", "Token 2", "Token 3", "Token 4"],
  colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b"],
  showMatrix = true,
  showVector = true
}: MatrixVectorVisualizerProps) {
  const [matrix, setMatrix] = useState(initialMatrix);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const updateValue = (row: number, column: number, value: string) => {
    const newMatrix = [...matrix];
    newMatrix[row] = [...newMatrix[row]];
    const parsed = parseFloat(value);
    newMatrix[row][column] = Number.isFinite(parsed) ? parsed : 0;
    setMatrix(newMatrix);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '20px',
      border: '1px solid var(--ifm-color-emphasis-200)',
      borderRadius: '12px',
      background: 'var(--ifm-background-surface-color)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h3>Matrix ↔ Vector Space</h3>
        <p>Interact with the matrix values, and <strong>click and drag the 3D space</strong> to rotate it.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
        {showMatrix && (
          <MatrixTable 
            matrix={matrix} 
            tokens={tokens} 
            colors={colors} 
            selectedRow={selectedRow} 
            setSelectedRow={setSelectedRow} 
            updateValue={updateValue} 
          />
        )}
        {showVector && (
          <VectorSpace3D 
            matrix={matrix} 
            tokens={tokens} 
            colors={colors} 
            selectedRow={selectedRow} 
            setSelectedRow={setSelectedRow} 
          />
        )}
      </div>
    </div>
  );
}
