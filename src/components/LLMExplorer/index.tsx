import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Edge,
  Node,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';

import { CustomNode } from './CustomNode';
import { gpt2Architecture, ArchitectureNode } from './data';
import './styles.css';

const nodeTypes = {
  customNode: CustomNode,
};

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  // Standard node dimensions (reduced size)
  const nodeWidth = 220;
  const nodeHeight = 45;

  dagreGraph.setGraph({ rankdir: direction, ranksep: 60, nodesep: 15 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  // Anchor the top-most node so the tree only expands downwards, never upwards off-screen
  let minY = Infinity;
  nodes.forEach((node) => {
    const y = dagreGraph.node(node.id).y;
    if (y < minY) minY = y;
  });
  
  const offsetY = 0 - (minY - nodeHeight / 2);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    // For LR layout: enter from left, exit from right
    node.targetPosition = 'left' as any;
    node.sourcePosition = 'right' as any;

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: (nodeWithPosition.y - nodeHeight / 2) + offsetY,
    };
    return node;
  });

  return { nodes, edges };
};

import { useReactFlow } from '@xyflow/react';

const LLMExplorerInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['gpt2']));
  const [searchQuery, setSearchQuery] = useState('');

  const onToggleNode = useCallback((id: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const buildGraph = useCallback(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    const traverse = (node: ArchitectureNode, parentId?: string, isVisible = true) => {
      if (!isVisible) return;

      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = expandedNodes.has(node.id);
      
      const matchesSearch = searchQuery 
        ? node.label.toLowerCase().includes(searchQuery.toLowerCase())
        : false;

      newNodes.push({
        id: node.id,
        type: 'customNode',
        position: { x: 0, y: 0 },
        data: {
          id: node.id,
          label: node.label,
          route: node.route,
          hasChildren,
          isExpanded,
          isActive: matchesSearch,
          onToggle: onToggleNode,
        },
      });

      if (parentId) {
        newEdges.push({
          id: `${parentId}-${node.id}`,
          source: parentId,
          target: node.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: 'var(--ifm-color-emphasis-500)', strokeWidth: 2 }
        });
      }

      if (hasChildren && isExpanded) {
        node.children!.forEach((child) => traverse(child, node.id, true));
      }
    };

    traverse(gpt2Architecture);

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      newEdges
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [expandedNodes, searchQuery, onToggleNode, setNodes, setEdges]);

  useEffect(() => {
    buildGraph();
  }, [buildGraph]);

  // If search query changes, expand nodes to show matches
  useEffect(() => {
    if (!searchQuery) return;

    const newExpanded = new Set(expandedNodes);
    let changed = false;

    const findMatches = (node: ArchitectureNode, path: string[]) => {
      const match = node.label.toLowerCase().includes(searchQuery.toLowerCase());
      if (match) {
        path.forEach(id => {
          if (!newExpanded.has(id)) {
            newExpanded.add(id);
            changed = true;
          }
        });
      }
      
      if (node.children) {
        node.children.forEach(child => findMatches(child, [...path, node.id]));
      }
    };

    findMatches(gpt2Architecture, []);
    
    if (changed) {
      setExpandedNodes(newExpanded);
    }
  }, [searchQuery]);

  return (
    <div className="llm-explorer-wrapper">
      <div className="llm-explorer-controls">
        <input 
          type="text" 
          placeholder="Search components..." 
          className="llm-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: 50, y: 50, zoom: 0.8 }}
        panOnDrag={true}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
      />
    </div>
  );
};

export const LLMExplorer = () => {
  return (
    <ReactFlowProvider>
      <LLMExplorerInner />
    </ReactFlowProvider>
  );
};
