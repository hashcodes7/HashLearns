import React, { useState, useRef, useEffect } from 'react';

interface VectorSpace3DProps {
  matrix: number[][];
  tokens: string[];
  colors: string[];
  selectedRow: number | null;
  setSelectedRow: (row: number | null) => void;
}

export default function VectorSpace3D({
  matrix,
  tokens,
  colors,
  selectedRow,
  setSelectedRow
}: VectorSpace3DProps) {
  const [angleX, setAngleX] = useState(Math.PI / 6);
  const [angleZ, setAngleZ] = useState(Math.PI / 6);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    
    setAngleZ(prev => prev + deltaX * 0.01);
    setAngleX(prev => Math.max(0, Math.min(Math.PI / 2, prev - deltaY * 0.01)));
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const project = (x: number, y: number, z: number) => {
    const scale = 150;
    
    const x1 = x * Math.cos(angleZ) - z * Math.sin(angleZ);
    const z1 = x * Math.sin(angleZ) + z * Math.cos(angleZ);
    
    const y2 = y * Math.cos(angleX) - z1 * Math.sin(angleX);
    const z2 = y * Math.sin(angleX) + z1 * Math.cos(angleX);
    
    const px = x1 * scale;
    const py = -y2 * scale;

    return { cx: 300 + px, cy: 250 + py, depth: z2 };
  };

  const getSortedIndices = () => {
    const depths = matrix.map((row, i) => {
      const { depth } = project(row[0], row[1], row[2]);
      return { i, depth };
    });
    return depths.sort((a, b) => a.depth - b.depth).map(d => d.i);
  };

  const sortedVectorIndices = getSortedIndices();

  return (
    <div style={{ flex: '1 1 400px', width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h4>3D Vector Space View</h4>
      <div 
        onMouseDown={handleMouseDown}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          width: '100%'
        }}
      >
        <svg 
          viewBox="0 0 600 400" 
          width="100%" 
          style={{ background: 'var(--ifm-color-emphasis-100)', borderRadius: '12px', border: '1px solid var(--ifm-color-emphasis-200)', display: 'block' }}
        >
          
          {/* Axes */}
          <g stroke="var(--ifm-color-emphasis-500)" strokeWidth="2" opacity="0.6">
            <line x1={project(0,0,0).cx} y1={project(0,0,0).cy} x2={project(1.2,0,0).cx} y2={project(1.2,0,0).cy} />
            <text x={project(1.3,0,0).cx} y={project(1.3,0,0).cy} fill="var(--ifm-font-color-base)" fontSize="12" stroke="none">d₁ (x)</text>
            
            <line x1={project(0,0,0).cx} y1={project(0,0,0).cy} x2={project(0,1.2,0).cx} y2={project(0,1.2,0).cy} />
            <text x={project(0,1.3,0).cx} y={project(0,1.3,0).cy} fill="var(--ifm-font-color-base)" fontSize="12" stroke="none">d₂ (y)</text>
            
            <line x1={project(0,0,0).cx} y1={project(0,0,0).cy} x2={project(0,0,1.2).cx} y2={project(0,0,1.2).cy} />
            <text x={project(0,0,1.3).cx} y={project(0,0,1.3).cy} fill="var(--ifm-font-color-base)" fontSize="12" stroke="none">d₃ (z)</text>
          </g>

          {/* Grid Lines */}
          <g stroke="var(--ifm-color-emphasis-300)" strokeWidth="1" strokeDasharray="4" opacity="0.3">
            {[0.2, 0.4, 0.6, 0.8, 1.0].map(val => (
              <React.Fragment key={val}>
                <line x1={project(val,0,0).cx} y1={project(val,0,0).cy} x2={project(val,0,1).cx} y2={project(val,0,1).cy} />
                <line x1={project(0,0,val).cx} y1={project(0,0,val).cy} x2={project(1,0,val).cx} y2={project(1,0,val).cy} />
              </React.Fragment>
            ))}
          </g>

          {/* Axis Ticks */}
          <g fill="var(--ifm-color-emphasis-500)" fontSize="10" textAnchor="middle" style={{ pointerEvents: 'none' }}>
            {[0.2, 0.4, 0.6, 0.8, 1.0].map(val => {
              const ptX = project(val, 0, 0);
              const ptY = project(0, val, 0);
              const ptZ = project(0, 0, val);
              return (
                <React.Fragment key={val}>
                  <circle cx={ptX.cx} cy={ptX.cy} r="1.5" fill="var(--ifm-color-emphasis-600)" />
                  <text x={ptX.cx} y={ptX.cy + 12}>{val}</text>
                  <circle cx={ptY.cx} cy={ptY.cy} r="1.5" fill="var(--ifm-color-emphasis-600)" />
                  <text x={ptY.cx - 10} y={ptY.cy + 3}>{val}</text>
                  <circle cx={ptZ.cx} cy={ptZ.cy} r="1.5" fill="var(--ifm-color-emphasis-600)" />
                  <text x={ptZ.cx} y={ptZ.cy - 6}>{val}</text>
                </React.Fragment>
              );
            })}
          </g>

          {/* Vectors */}
          {sortedVectorIndices.map((i) => {
            const row = matrix[i];
            const { cx, cy } = project(row[0], row[1], row[2]);
            const { cx: ox, cy: oy } = project(0, 0, 0);
            const isSelected = selectedRow === i || selectedRow === null;
            
            return (
              <g 
                key={i} 
                opacity={isSelected ? 1 : 0.2} 
                style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
                onMouseEnter={() => !isDragging && setSelectedRow(i)}
                onMouseLeave={() => !isDragging && setSelectedRow(null)}
              >
                <line 
                  x1={ox} y1={oy} 
                  x2={cx} y2={cy} 
                  stroke={colors[i]} 
                  strokeWidth={isSelected && selectedRow !== null ? "4" : "2"} 
                />
                <circle 
                  cx={cx} cy={cy} 
                  r={isSelected && selectedRow !== null ? "6" : "4"} 
                  fill={colors[i]} 
                />
                {isSelected && selectedRow !== null && (
                  <text 
                    x={cx + 10} y={cy - 10} 
                    fill={colors[i]} 
                    fontSize="14" 
                    fontWeight="bold"
                    style={{ pointerEvents: 'none' }}
                  >
                    {`${tokens[i]} (${row[0]}, ${row[1]}, ${row[2]})`}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
