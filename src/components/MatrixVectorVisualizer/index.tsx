import React, { useState, useEffect } from 'react';
import MatrixTable from './MatrixTable';
import VectorSpace3D from './VectorSpace3D';

interface MatrixVectorVisualizerProps {
  initialMatrix?: number[][];
  tokens?: string[];
  colors?: string[];
  showMatrix?: boolean;
  showVector?: boolean;
  uVector?: number[];
  vVector?: number[];
  isOuterProduct?: boolean;
  uName?: string;
  vName?: string;
  matrixName?: string;
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
  showVector = true,
  uVector,
  vVector,
  isOuterProduct = false,
  uName = "u",
  vName = "v",
  matrixName = "M"
}: MatrixVectorVisualizerProps) {
  const [u, setU] = useState<number[]>(uVector || [1, 2]);
  const [v, setV] = useState<number[]>(vVector || [3, 4, 5]);

  const computeOuterProduct = (vecU: number[], vecV: number[]) => {
    return vecU.map(uVal => vecV.map(vVal => Number((uVal * vVal).toFixed(2))));
  };

  const [matrix, setMatrix] = useState(isOuterProduct ? computeOuterProduct(u, v) : initialMatrix);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  useEffect(() => {
    if (isOuterProduct) {
      setMatrix(computeOuterProduct(u, v));
    }
  }, [u, v, isOuterProduct]);

  const updateValue = (row: number, column: number, value: string) => {
    if (isOuterProduct) return;
    const newMatrix = [...matrix];
    newMatrix[row] = [...newMatrix[row]];
    const parsed = parseFloat(value);
    newMatrix[row][column] = Number.isFinite(parsed) ? parsed : 0;
    setMatrix(newMatrix);
  };

  const updateU = (index: number, value: string) => {
    const newU = [...u];
    const parsed = parseFloat(value);
    newU[index] = Number.isFinite(parsed) ? parsed : 0;
    setU(newU);
  };

  const updateV = (index: number, value: string) => {
    const newV = [...v];
    const parsed = parseFloat(value);
    newV[index] = Number.isFinite(parsed) ? parsed : 0;
    setV(newV);
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
        <h3>{isOuterProduct ? "Outer Product Visualization" : "Matrix ↔ Vector Space"}</h3>
        {!isOuterProduct && <p>Interact with the matrix values, and <strong>click and drag the 3D space</strong> to rotate it.</p>}
        {isOuterProduct && <p>Interact with the vectors <strong>{uName}</strong> and <strong>{vName}</strong> to see how they form the outer product matrix.</p>}
      </div>

      {isOuterProduct && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', padding: '15px', background: 'var(--ifm-color-emphasis-100)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <strong style={{ minWidth: '130px', textAlign: 'right' }}>Vector {uName} (Column):</strong>
            {u.map((val, i) => (
              <input key={`u-${i}`} type="number" step="0.1" value={val} onChange={(e) => updateU(i, e.target.value)}
                style={{ width: '70px', textAlign: 'center', padding: '6px', borderRadius: '4px', border: '1px solid var(--ifm-color-emphasis-300)', outline: 'none' }} />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <strong style={{ minWidth: '130px', textAlign: 'right' }}>Vector {vName} (Row):</strong>
            {v.map((val, i) => (
              <input key={`v-${i}`} type="number" step="0.1" value={val} onChange={(e) => updateV(i, e.target.value)}
                style={{ width: '70px', textAlign: 'center', padding: '6px', borderRadius: '4px', border: '1px solid var(--ifm-color-emphasis-300)', outline: 'none' }} />
            ))}
          </div>
          <div style={{ marginTop: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>
            {matrixName} = {uName} ⊗ {vName}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
        {showMatrix && (
          <MatrixTable 
            matrix={matrix} 
            tokens={isOuterProduct ? matrix.map((_, i) => `${uName} ${i+1} × ${vName}`) : tokens} 
            colors={colors} 
            selectedRow={selectedRow} 
            setSelectedRow={setSelectedRow} 
            updateValue={updateValue}
            readOnly={isOuterProduct}
            matrixName={matrixName}
          />
        )}
        {showVector && (
          <VectorSpace3D 
            matrix={matrix} 
            tokens={isOuterProduct ? matrix.map((_, i) => `${uName} ${i+1} × ${vName}`) : tokens} 
            colors={colors} 
            selectedRow={selectedRow} 
            setSelectedRow={setSelectedRow} 
          />
        )}
      </div>
    </div>
  );
}
