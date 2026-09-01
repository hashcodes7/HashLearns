import React, { useMemo } from 'react';
import { useAlgorithmController } from './useAlgorithmController';
import DSAControlBar from './DSAControlBar';

// Binary Tree Helper Node Structure
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Build BST from array
function buildBST(arr) {
  if (!arr || arr.length === 0) return null;
  let root = new TreeNode(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    insertBST(root, arr[i]);
  }
  return root;
}

function insertBST(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) {
    if (!root.left) root.left = new TreeNode(val);
    else insertBST(root.left, val);
  } else {
    if (!root.right) root.right = new TreeNode(val);
    else insertBST(root.right, val);
  }
}

// Convert BST into flat node array with calculated (x, y) coordinates for SVG rendering
function flattenTreeForRender(root, width = 600, height = 260) {
  if (!root) return { nodes: [], edges: [] };
  const nodes = [];
  const edges = [];

  function traverse(node, depth, minX, maxX, parentX, parentY) {
    if (!node) return;
    const x = (minX + maxX) / 2;
    const y = 40 + depth * 60;

    nodes.push({ id: node.val, val: node.val, x, y, depth });

    if (parentX !== null && parentY !== null) {
      edges.push({ from: { x: parentX, y: parentY }, to: { x, y }, fromId: node.parentVal, toId: node.val });
    }

    if (node.left) {
      node.left.parentVal = node.val;
      traverse(node.left, depth + 1, minX, x, x, y);
    }
    if (node.right) {
      node.right.parentVal = node.val;
      traverse(node.right, depth + 1, x, maxX, x, y);
    }
  }

  traverse(root, 0, 0, width, null, null);
  return { nodes, edges };
}

// --- Generator Functions ---

function* bstSearchGenerator(arr, targetVal = 25) {
  const root = buildBST(arr);
  const target = targetVal;
  const visited = [];

  yield {
    treeArray: [...arr],
    activeNode: null,
    visited: [],
    foundNode: null,
    explanation: `Searching for target value ${target} in Binary Search Tree.`
  };

  let curr = root;
  while (curr !== null) {
    visited.push(curr.val);
    yield {
      treeArray: [...arr],
      activeNode: curr.val,
      visited: [...visited],
      foundNode: null,
      explanation: `Comparing target ${target} with current node (${curr.val}).`
    };

    if (curr.val === target) {
      yield {
        treeArray: [...arr],
        activeNode: curr.val,
        visited: [...visited],
        foundNode: curr.val,
        explanation: `🎯 Target ${target} FOUND at node (${curr.val})!`
      };
      return;
    } else if (target < curr.val) {
      yield {
        treeArray: [...arr],
        activeNode: curr.val,
        visited: [...visited],
        explanation: `${target} < ${curr.val}: Traversing to LEFT child.`
      };
      curr = curr.left;
    } else {
      yield {
        treeArray: [...arr],
        activeNode: curr.val,
        visited: [...visited],
        explanation: `${target} > ${curr.val}: Traversing to RIGHT child.`
      };
      curr = curr.right;
    }
  }

  yield {
    treeArray: [...arr],
    activeNode: null,
    visited: [...visited],
    foundNode: null,
    explanation: `❌ Target ${target} is NOT present in the BST.`
  };
}

function* inOrderTraversalGenerator(arr) {
  const root = buildBST(arr);
  const visited = [];
  const order = [];

  yield {
    treeArray: [...arr],
    activeNode: null,
    visited: [],
    explanation: `Starting In-Order Traversal (Left -> Root -> Right).`
  };

  function* inOrder(node) {
    if (!node) return;
    yield* inOrder(node.left);

    order.push(node.val);
    visited.push(node.val);

    yield {
      treeArray: [...arr],
      activeNode: node.val,
      visited: [...visited],
      order: [...order],
      explanation: `Visited Node (${node.val}). Current In-Order traversal: [${order.join(', ')}].`
    };

    yield* inOrder(node.right);
  }

  yield* inOrder(root);

  yield {
    treeArray: [...arr],
    activeNode: null,
    visited: [...visited],
    order: [...order],
    explanation: `In-Order Traversal Complete: [${order.join(', ')}].`
  };
}

const ALGORITHMS = {
  bstSearch: { fn: bstSearchGenerator, title: "BST Search Visualizer" },
  inOrder: { fn: inOrderTraversalGenerator, title: "BST In-Order Traversal" },
};

export default function TreeVisualizer({
  algorithm = "bstSearch",
  initialData = [15, 10, 20, 8, 12, 17, 25],
  target = 12,
  title,
  description = "Visualizes Binary Search Tree nodes and edge traversals."
}) {
  const selectedAlgo = ALGORITHMS[algorithm] || ALGORITHMS.bstSearch;

  const generatorFn = useMemo(() => {
    if (algorithm === "bstSearch") {
      return (data) => bstSearchGenerator(data, target);
    }
    return selectedAlgo.fn;
  }, [algorithm, selectedAlgo, target]);

  const controller = useAlgorithmController(generatorFn, initialData);
  const activeSnapshot = controller.activeSnapshot;

  const currentTreeArray = controller.data || [];
  const activeNode = activeSnapshot.activeNode;
  const visited = activeSnapshot.visited || [];
  const foundNode = activeSnapshot.foundNode;

  // Build tree layout positions
  const treeRoot = useMemo(() => buildBST(currentTreeArray), [currentTreeArray]);
  const { nodes, edges } = useMemo(() => flattenTreeForRender(treeRoot), [treeRoot]);

  const handleInputChange = (rawString) => {
    const nums = rawString
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
    if (nums.length > 0) {
      controller.updateData(nums);
    }
  };

  const handleRandomize = () => {
    const randomArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 89) + 10);
    controller.updateData(randomArray);
    return randomArray.join(', ');
  };

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <DSAControlBar
        title={title || selectedAlgo.title}
        description={description}
        inputLabel="Tree Nodes (BST):"
        rawInputString={controller.data.join(', ')}
        onInputChange={handleInputChange}
        onRandomize={handleRandomize}
        controller={controller}
      />

      {/* SVG Canvas for Tree */}
      <div style={{
        padding: '1.5rem',
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'auto'
      }}>
        <svg width="600" height="260" viewBox="0 0 600 260" style={{ maxWidth: '100%' }}>
          {/* Edges / Lines connecting parent to child */}
          {edges.map((edge, i) => {
            const isVisitedEdge = visited.includes(edge.toId);
            return (
              <line
                key={i}
                x1={edge.from.x}
                y1={edge.from.y}
                x2={edge.to.x}
                y2={edge.to.y}
                stroke={isVisitedEdge ? '#00f0ff' : 'rgba(255, 255, 255, 0.15)'}
                strokeWidth={isVisitedEdge ? '3' : '2'}
                strokeDasharray={isVisitedEdge ? 'none' : '4'}
                style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
              />
            );
          })}

          {/* Node Circles */}
          {nodes.map((node) => {
            const isVisited = visited.includes(node.val);
            const isActive = activeNode === node.val;
            const isFound = foundNode === node.val;

            let nodeFill = '#1e293b';
            let strokeColor = 'rgba(255, 255, 255, 0.2)';
            let strokeWidth = '2';

            if (isFound) {
              nodeFill = '#10b981';
              strokeColor = '#34d399';
              strokeWidth = '4';
            } else if (isActive) {
              nodeFill = '#ef4444';
              strokeColor = '#f87171';
              strokeWidth = '4';
            } else if (isVisited) {
              nodeFill = 'rgba(0, 240, 255, 0.2)';
              strokeColor = '#00f0ff';
              strokeWidth = '3';
            }

            return (
              <g key={node.val} style={{ transition: 'all 0.3s ease' }}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill={nodeFill}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13"
                  fontWeight="bold"
                >
                  {node.val}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
