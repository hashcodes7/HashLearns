import React, { useMemo } from 'react';
import { useAlgorithmController } from './useAlgorithmController';
import DSAControlBar from './DSAControlBar';

// --- Generators for Array Algorithms ---

function* bubbleSortGenerator(initialArr) {
  let arr = [...initialArr];
  const n = arr.length;
  let sortedIndices = [];

  yield {
    data: [...arr],
    highlights: [],
    sorted: [],
    pointers: {},
    explanation: `Starting Bubble Sort with ${n} elements.`
  };

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield {
        data: [...arr],
        highlights: [j, j + 1],
        sorted: [...sortedIndices],
        pointers: { i: j, 'i+1': j + 1 },
        explanation: `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`
      };

      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        yield {
          data: [...arr],
          highlights: [j, j + 1],
          swapped: [j, j + 1],
          sorted: [...sortedIndices],
          pointers: { i: j, 'i+1': j + 1 },
          explanation: `Swapped arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`
        };
      }
    }
    sortedIndices.unshift(n - 1 - i);
    yield {
      data: [...arr],
      highlights: [],
      sorted: [...sortedIndices],
      pointers: {},
      explanation: `Element at index ${n - 1 - i} (${arr[n - 1 - i]}) is now in its sorted position.`
    };
  }
  sortedIndices.unshift(0);

  yield {
    data: [...arr],
    highlights: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    pointers: {},
    explanation: `Bubble Sort Complete! Entire array is sorted.`
  };
}

function* selectionSortGenerator(initialArr) {
  let arr = [...initialArr];
  const n = arr.length;
  let sortedIndices = [];

  yield {
    data: [...arr],
    highlights: [],
    sorted: [],
    pointers: {},
    explanation: `Starting Selection Sort with ${n} elements.`
  };

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    yield {
      data: [...arr],
      highlights: [minIdx],
      sorted: [...sortedIndices],
      pointers: { min: minIdx, curr: i },
      explanation: `Assuming index ${i} (${arr[i]}) is current minimum.`
    };

    for (let j = i + 1; j < n; j++) {
      yield {
        data: [...arr],
        highlights: [minIdx, j],
        sorted: [...sortedIndices],
        pointers: { min: minIdx, j: j },
        explanation: `Comparing arr[${j}] (${arr[j]}) with current min (${arr[minIdx]}).`
      };

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        yield {
          data: [...arr],
          highlights: [minIdx],
          sorted: [...sortedIndices],
          pointers: { min: minIdx },
          explanation: `New minimum found at index ${minIdx} (${arr[minIdx]}).`
        };
      }
    }

    if (minIdx !== i) {
      let temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      yield {
        data: [...arr],
        highlights: [i, minIdx],
        swapped: [i, minIdx],
        sorted: [...sortedIndices],
        pointers: { swapped1: i, swapped2: minIdx },
        explanation: `Swapped minimum (${arr[i]}) into sorted position at index ${i}.`
      };
    }

    sortedIndices.push(i);
  }

  yield {
    data: [...arr],
    highlights: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    pointers: {},
    explanation: `Selection Sort Complete!`
  };
}

function* binarySearchGenerator(initialArr, targetValue = 42) {
  // Sort array first for binary search
  let arr = [...initialArr].sort((a, b) => a - b);
  let target = targetValue;

  yield {
    data: [...arr],
    highlights: [],
    sorted: [],
    pointers: {},
    explanation: `Binary Search target = ${target} on sorted array.`
  };

  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    yield {
      data: [...arr],
      highlights: [mid],
      pointers: { low, mid, high },
      explanation: `Checking middle index mid = ${mid} (${arr[mid]}). Range: [${low}, ${high}].`
    };

    if (arr[mid] === target) {
      yield {
        data: [...arr],
        highlights: [mid],
        sorted: [mid],
        pointers: { found: mid },
        explanation: `🎯 Target ${target} FOUND at index ${mid}!`
      };
      return;
    } else if (arr[mid] < target) {
      yield {
        data: [...arr],
        highlights: [mid],
        pointers: { low: mid + 1, high },
        explanation: `${arr[mid]} < ${target}. Target must be in right half. Setting low = ${mid + 1}.`
      };
      low = mid + 1;
    } else {
      yield {
        data: [...arr],
        highlights: [mid],
        pointers: { low, high: mid - 1 },
        explanation: `${arr[mid]} > ${target}. Target must be in left half. Setting high = ${mid - 1}.`
      };
      high = mid - 1;
    }
  }

  yield {
    data: [...arr],
    highlights: [],
    pointers: {},
    explanation: `❌ Target ${target} not found in the array.`
  };
}

// Map algorithm string prop to generator function
const ALGORITHMS = {
  bubbleSort: { fn: bubbleSortGenerator, title: "Bubble Sort Visualizer" },
  selectionSort: { fn: selectionSortGenerator, title: "Selection Sort Visualizer" },
  binarySearch: { fn: binarySearchGenerator, title: "Binary Search Visualizer" },
};

export default function ArrayVisualizer({
  algorithm = "bubbleSort",
  initialData = [64, 34, 25, 12, 22, 11, 90],
  target = 25,
  title,
  description = "Interact with the controls below to play, pause, or step through the algorithm."
}) {
  const selectedAlgo = ALGORITHMS[algorithm] || ALGORITHMS.bubbleSort;

  const generatorFn = useMemo(() => {
    if (algorithm === "binarySearch") {
      return (data) => binarySearchGenerator(data, target);
    }
    return selectedAlgo.fn;
  }, [algorithm, selectedAlgo, target]);

  const controller = useAlgorithmController(generatorFn, initialData);
  const activeSnapshot = controller.activeSnapshot;

  const currentArr = activeSnapshot.data || [];
  const highlights = activeSnapshot.highlights || [];
  const swapped = activeSnapshot.swapped || [];
  const sorted = activeSnapshot.sorted || [];
  const pointers = activeSnapshot.pointers || {};

  // Maximum value for bar height scaling
  const maxVal = Math.max(...currentArr, 100);

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
        inputLabel="Array elements:"
        rawInputString={controller.data.join(', ')}
        onInputChange={handleInputChange}
        onRandomize={handleRandomize}
        controller={controller}
      />

      {/* Array Bars Container */}
      <div style={{
        padding: '2rem 1.5rem 1.5rem 1.5rem',
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '12px',
          height: '200px',
          width: '100%',
          paddingBottom: '24px',
          borderBottom: '1px dashed rgba(255, 255, 255, 0.1)',
          position: 'relative'
        }}>
          {currentArr.map((val, idx) => {
            const isHighlight = highlights.includes(idx);
            const isSwapped = swapped.includes(idx);
            const isSorted = sorted.includes(idx);

            let barColor = 'linear-gradient(180deg, #3b82f6, #1d4ed8)'; // default blue
            if (isSorted) barColor = 'linear-gradient(180deg, #10b981, #047857)'; // green
            if (isSwapped) barColor = 'linear-gradient(180deg, #f59e0b, #d97706)'; // orange
            if (isHighlight) barColor = 'linear-gradient(180deg, #ef4444, #b91c1c)'; // red highlight

            const heightPct = Math.max((val / maxVal) * 100, 15);

            // Find matching pointer label for this index
            const matchingPointers = Object.entries(pointers)
              .filter(([_, ptrIdx]) => ptrIdx === idx)
              .map(([ptrName]) => ptrName);

            return (
              <div key={idx} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
                maxWidth: '50px',
                height: '100%',
                justifyContent: 'flex-end',
                position: 'relative'
              }}>
                {/* Pointer Tag above bar */}
                {matchingPointers.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '-24px',
                    background: '#00f0ff',
                    color: '#090d16',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 0 8px rgba(0,240,255,0.6)'
                  }}>
                    {matchingPointers.join(', ')}
                  </div>
                )}

                {/* Array Bar */}
                <div style={{
                  width: '100%',
                  height: `${heightPct}%`,
                  background: barColor,
                  borderRadius: '8px 8px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  boxShadow: isHighlight ? '0 0 12px rgba(239, 68, 68, 0.7)' : 'none',
                  transition: 'height 0.3s ease, background 0.3s ease, transform 0.2s ease',
                  transform: isHighlight ? 'scale(1.05)' : 'scale(1)'
                }}>
                  {val}
                </div>

                {/* Index label below bar */}
                <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Pointer Legend */}
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: '#9ca3af', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: '#ef4444' }}></span> Active / Comparing
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: '#f59e0b' }}></span> Swapped
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: '#10b981' }}></span> Sorted / Found
          </span>
        </div>
      </div>
    </div>
  );
}
