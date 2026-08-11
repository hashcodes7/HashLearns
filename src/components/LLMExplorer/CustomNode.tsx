import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { useHistory } from '@docusaurus/router';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import './styles.css';

interface CustomNodeProps {
  data: {
    label: string;
    route?: string;
    hasChildren?: boolean;
    isExpanded?: boolean;
    isActive?: boolean;
    onToggle?: (id: string) => void;
    id: string;
  };
}

export const CustomNode = ({ data }: CustomNodeProps) => {
  const history = useHistory();

  const handleNodeClick = (e: React.MouseEvent) => {
    // If clicked exactly on the expand/collapse button, don't navigate
    if ((e.target as HTMLElement).closest('.llm-custom-node-expand')) {
      return;
    }
    
    if (data.route) {
      history.push(data.route);
    }
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onToggle) {
      data.onToggle(data.id);
    }
  };

  return (
    <div 
      className={`llm-custom-node ${data.isActive ? 'active' : ''}`}
      onClick={handleNodeClick}
    >
      <Handle type="target" position={Position.Left} style={{ visibility: 'hidden' }} />
      
      <div className="llm-custom-node-label">
        {data.label}
      </div>

      <div className="llm-custom-node-controls">
        {data.route && (
          <div style={{ color: 'var(--ifm-color-emphasis-500)', display: 'flex' }}>
            <ExternalLink size={14} />
          </div>
        )}
        
        {data.hasChildren && (
          <button 
            className="llm-custom-node-expand"
            onClick={handleToggleClick}
            aria-label={data.isExpanded ? "Collapse" : "Expand"}
          >
            {data.isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
      </div>

      <Handle type="source" position={Position.Right} style={{ visibility: 'hidden' }} />
    </div>
  );
};
