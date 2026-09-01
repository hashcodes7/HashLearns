import React, { useMemo } from 'react';
import { useAlgorithmController } from './useAlgorithmController';
import DSAControlBar from './DSAControlBar';
import { ArrowRight, CornerDownRight } from 'lucide-react';

function* reverseLinkedListGenerator(initialList) {
  let nodes = initialList.map((val, idx) => ({ id: idx, value: val }));
  let n = nodes.length;

  yield {
    nodes: [...nodes],
    pointers: { head: 0 },
    reversedIndices: [],
    explanation: `Initial Linked List with ${n} nodes: Head -> ${nodes.map(n => n.value).join(' -> ')} -> null.`
  };

  let prev = null;
  let curr = 0;
  let next = null;
  let reversedIndices = [];

  while (curr !== null && curr < n) {
    next = curr + 1 < n ? curr + 1 : null;

    yield {
      nodes: [...nodes],
      pointers: {
        prev: prev !== null ? prev : undefined,
        curr: curr,
        next: next !== null ? next : undefined,
      },
      reversedIndices: [...reversedIndices],
      explanation: `Step: prev = ${prev !== null ? nodes[prev].value : 'null'}, curr = ${nodes[curr].value}, next = ${next !== null ? nodes[next].value : 'null'}.`
    };

    // Reversing pointer action
    reversedIndices.push(curr);
    yield {
      nodes: [...nodes],
      pointers: {
        prev: prev !== null ? prev : undefined,
        curr: curr,
        next: next !== null ? next : undefined,
      },
      reversedIndices: [...reversedIndices],
      action: 'reversed',
      explanation: `Reassigned pointer: node (${nodes[curr].value}) now points back to prev (${prev !== null ? nodes[prev].value : 'null'}).`
    };

    prev = curr;
    curr = next;
  }

  yield {
    nodes: [...nodes],
    pointers: { head: n - 1 },
    reversedIndices: Array.from({ length: n }, (_, k) => k),
    explanation: `🎉 Linked List Reversed successfully! New Head is node (${nodes[n - 1].value}).`
  };
}

function* searchLinkedListGenerator(initialList, targetValue = 30) {
  let nodes = initialList.map((val, idx) => ({ id: idx, value: val }));
  let target = targetValue;

  yield {
    nodes: [...nodes],
    pointers: { head: 0, curr: 0 },
    explanation: `Searching for target value ${target} in Linked List.`
  };

  for (let i = 0; i < nodes.length; i++) {
    yield {
      nodes: [...nodes],
      pointers: { curr: i },
      activeNode: i,
      explanation: `Checking node at index [${i}] with value (${nodes[i].value}).`
    };

    if (nodes[i].value === target) {
      yield {
        nodes: [...nodes],
        pointers: { found: i },
        foundNode: i,
        explanation: `🎯 Target ${target} FOUND at node index [${i}]!`
      };
      return;
    }
  }

  yield {
    nodes: [...nodes],
    pointers: {},
    explanation: `❌ Target ${target} was not found in the Linked List.`
  };
}

const ALGORITHMS = {
  reverse: { fn: reverseLinkedListGenerator, title: "Linked List Reversal Visualizer" },
  search: { fn: searchLinkedListGenerator, title: "Linked List Search Visualizer" }
};

export default function LinkedListVisualizer({
  algorithm = "reverse",
  initialData = [10, 20, 30, 40, 50],
  target = 30,
  title,
  description = "Watch how node pointers (prev, curr, next) update dynamically in memory."
}) {
  const selectedAlgo = ALGORITHMS[algorithm] || ALGORITHMS.reverse;

  const generatorFn = useMemo(() => {
    if (algorithm === "search") {
      return (data) => searchLinkedListGenerator(data, target);
    }
    return selectedAlgo.fn;
  }, [algorithm, selectedAlgo, target]);

  const controller = useAlgorithmController(generatorFn, initialData);
  const activeSnapshot = controller.activeSnapshot;

  const nodes = activeSnapshot.nodes || [];
  const pointers = activeSnapshot.pointers || {};
  const reversedIndices = activeSnapshot.reversedIndices || [];
  const foundNode = activeSnapshot.foundNode;
  const activeNode = activeSnapshot.activeNode;

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
    const randomArray = Array.from({ length: 5 }, () => Math.floor(Math.random() * 90) + 10);
    controller.updateData(randomArray);
    return randomArray.join(', ');
  };

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <DSAControlBar
        title={title || selectedAlgo.title}
        description={description}
        inputLabel="Node Values:"
        rawInputString={controller.data.join(', ')}
        onInputChange={handleInputChange}
        onRandomize={handleRandomize}
        controller={controller}
      />

      {/* Linked List Nodes Container */}
      <div style={{
        padding: '2.5rem 1.5rem',
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        overflowX: 'auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          minWidth: 'min-content'
        }}>
          {nodes.map((node, idx) => {
            const isReversed = reversedIndices.includes(idx);
            const isFound = foundNode === idx;
            const isActive = activeNode === idx;

            // Pointers attached to this node
            const attachedPointers = Object.entries(pointers)
              .filter(([_, ptrIdx]) => ptrIdx === idx)
              .map(([ptrName]) => ptrName);

            let borderStyle = '1px solid rgba(255,255,255,0.15)';
            let bgGradient = 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))';

            if (isFound) {
              borderStyle = '2px solid #10b981';
              bgGradient = 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(4, 120, 87, 0.3))';
            } else if (isActive) {
              borderStyle = '2px solid #ef4444';
              bgGradient = 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.3))';
            } else if (isReversed) {
              borderStyle = '2px solid #00f0ff';
              bgGradient = 'linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(59, 130, 246, 0.2))';
            }

            return (
              <React.Fragment key={idx}>
                {/* Node Box */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}>
                  {/* Pointer Badges above node */}
                  <div style={{
                    position: 'absolute',
                    top: '-32px',
                    display: 'flex',
                    gap: '4px',
                    flexWrap: 'nowrap'
                  }}>
                    {attachedPointers.map((ptr) => (
                      <span key={ptr} style={{
                        background: ptr === 'curr' ? '#ef4444' : ptr === 'prev' ? '#f59e0b' : ptr === 'next' ? '#3b82f6' : '#00f0ff',
                        color: '#090d16',
                        fontSize: '0.7rem',
                        fontWeight: '800',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        boxShadow: '0 0 6px rgba(0,0,0,0.5)'
                      }}>
                        {ptr}
                      </span>
                    ))}
                  </div>

                  {/* Node Card */}
                  <div style={{
                    display: 'flex',
                    border: borderStyle,
                    borderRadius: '12px',
                    background: bgGradient,
                    boxShadow: isActive || isFound || isReversed ? '0 0 15px rgba(0,240,255,0.3)' : 'none',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}>
                    {/* Value Field */}
                    <div style={{
                      padding: '12px 18px',
                      fontWeight: '700',
                      fontSize: '1rem',
                      color: '#fff',
                      borderRight: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      {node.value}
                    </div>

                    {/* Next Pointer Field */}
                    <div style={{
                      padding: '12px 12px',
                      fontSize: '0.75rem',
                      color: isReversed ? '#00f0ff' : '#64748b',
                      background: 'rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: '600'
                    }}>
                      {isReversed ? 'prev' : 'next'}
                    </div>
                  </div>
                </div>

                {/* Arrow Connector between nodes */}
                {idx < nodes.length - 1 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: isReversed ? '#00f0ff' : '#64748b',
                    margin: '0 4px',
                    transition: 'all 0.3s ease'
                  }}>
                    {isReversed ? <CornerDownRight size={22} style={{ transform: 'rotate(-90deg)' }} /> : <ArrowRight size={22} />}
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* Null Terminal */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748b',
            fontWeight: '600',
            fontSize: '0.85rem'
          }}>
            <ArrowRight size={20} />
            <span style={{
              padding: '6px 12px',
              border: '1px dashed rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#94a3b8'
            }}>
              null
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
