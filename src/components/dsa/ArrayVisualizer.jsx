import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Shuffle, Sliders } from 'lucide-react';
import { useAlgorithmController } from './useAlgorithmController';

// --- Generators for Array Algorithms ---

function* bubbleSortGenerator(initialArr) {
  let arr = initialArr.map((val, idx) => ({ id: `item-${val}-${idx}`, val }));
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
        explanation: `Comparing arr[${j}] (${arr[j].val}) and arr[${j + 1}] (${arr[j + 1].val}).`
      };

      if (arr[j].val > arr[j + 1].val) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        yield {
          data: [...arr],
          highlights: [j, j + 1],
          swapped: [j, j + 1],
          sorted: [...sortedIndices],
          pointers: { i: j, 'i+1': j + 1 },
          explanation: `Swapped arr[${j}] (${arr[j].val}) and arr[${j + 1}] (${arr[j + 1].val}).`
        };
      }
    }
    sortedIndices.unshift(n - 1 - i);
    yield {
      data: [...arr],
      highlights: [],
      sorted: [...sortedIndices],
      pointers: {},
      explanation: `Element at index ${n - 1 - i} (${arr[n - 1 - i].val}) is now in its sorted position.`
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
  let arr = initialArr.map((val, idx) => ({ id: `item-${val}-${idx}`, val }));
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
      explanation: `Assuming index ${i} (${arr[i].val}) is current minimum.`
    };

    for (let j = i + 1; j < n; j++) {
      yield {
        data: [...arr],
        highlights: [minIdx, j],
        sorted: [...sortedIndices],
        pointers: { min: minIdx, j: j },
        explanation: `Comparing arr[${j}] (${arr[j].val}) with current min (${arr[minIdx].val}).`
      };

      if (arr[j].val < arr[minIdx].val) {
        minIdx = j;
        yield {
          data: [...arr],
          highlights: [minIdx],
          sorted: [...sortedIndices],
          pointers: { min: minIdx },
          explanation: `New minimum found at index ${minIdx} (${arr[minIdx].val}).`
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
        explanation: `Swapped minimum (${arr[i].val}) into sorted position at index ${i}.`
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
  let arr = initialArr.map((val, idx) => ({ id: `item-${val}-${idx}`, val })).sort((a, b) => a.val - b.val);
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
      explanation: `Checking middle index mid = ${mid} (${arr[mid].val}). Range: [${low}, ${high}].`
    };

    if (arr[mid].val === target) {
      yield {
        data: [...arr],
        highlights: [mid],
        sorted: [mid],
        pointers: { found: mid },
        explanation: `🎯 Target ${target} FOUND at index ${mid}!`
      };
      return;
    } else if (arr[mid].val < target) {
      yield {
        data: [...arr],
        highlights: [mid],
        pointers: { low: mid + 1, high },
        explanation: `${arr[mid].val} < ${target}. Target must be in right half. Setting low = ${mid + 1}.`
      };
      low = mid + 1;
    } else {
      yield {
        data: [...arr],
        highlights: [mid],
        pointers: { low, high: mid - 1 },
        explanation: `${arr[mid].val} > ${target}. Target must be in left half. Setting high = ${mid - 1}.`
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

function* insertionSortGenerator(initialArr) {
  let arr = initialArr.map((val, idx) => ({ id: `item-${val}-${idx}`, val }));
  const n = arr.length;
  
  yield {
    data: [...arr],
    highlights: [],
    sorted: [0],
    pointers: {},
    explanation: `Starting Insertion Sort. The first element (${arr[0].val}) is considered sorted by default.`
  };

  for (let i = 1; i < n; i++) {
    let j = i;
    yield {
      data: [...arr],
      highlights: [i],
      sorted: Array.from({length: i}, (_, k) => k),
      pointers: { curr: i },
      explanation: `Looking to insert element ${arr[i].val} into the sorted portion.`
    };

    while (j > 0 && arr[j - 1].val > arr[j].val) {
      yield {
        data: [...arr],
        highlights: [j, j - 1],
        sorted: Array.from({length: i}, (_, k) => k),
        pointers: { compare: j, with: j-1 },
        explanation: `${arr[j-1].val} > ${arr[j].val}, so they must be swapped.`
      };

      let temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;

      yield {
        data: [...arr],
        highlights: [j, j - 1],
        swapped: [j, j - 1],
        sorted: Array.from({length: i}, (_, k) => k),
        pointers: { swapped1: j, swapped2: j-1 },
        explanation: `Swapped.`
      };
      j--;
    }
    yield {
      data: [...arr],
      highlights: [],
      sorted: Array.from({length: i + 1}, (_, k) => k),
      pointers: {},
      explanation: `Element inserted successfully.`
    };
  }
  
  yield {
    data: [...arr],
    highlights: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    pointers: {},
    explanation: `Insertion Sort Complete! Entire array is sorted.`
  };
}

function* quickSortGenerator(initialArr) {
  let arr = initialArr.map((val, idx) => ({ id: `item-${val}-${idx}`, val }));
  const n = arr.length;
  let sortedIndices = [];

  yield {
    data: [...arr],
    highlights: [],
    sorted: [],
    pointers: {},
    explanation: `Starting Quick Sort (Lomuto Partition Scheme).`
  };

  function* quickSort(low, high) {
    if (low < high) {
      let pivotVal = arr[high].val;
      yield {
        data: [...arr],
        highlights: [high],
        sorted: [...sortedIndices],
        pointers: { pivot: high },
        explanation: `Choosing pivot ${pivotVal} at index ${high}. Partitioning array from index ${low} to ${high}.`
      };

      let i = low - 1;
      for (let j = low; j <= high - 1; j++) {
        yield {
          data: [...arr],
          highlights: [j, high],
          sorted: [...sortedIndices],
          pointers: { curr: j, pivot: high, swapPtr: Math.max(low, i + 1) },
          explanation: `Comparing ${arr[j].val} with pivot ${pivotVal}.`
        };

        if (arr[j].val < pivotVal) {
          i++;
          if (i !== j) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            yield {
              data: [...arr],
              highlights: [i, j],
              swapped: [i, j],
              sorted: [...sortedIndices],
              pointers: { swapped1: i, swapped2: j },
              explanation: `${arr[j].val} < ${pivotVal}, so we swap it with the element at our swap pointer (index ${i}).`
            };
          } else {
             yield {
              data: [...arr],
              highlights: [j],
              sorted: [...sortedIndices],
              pointers: { 'in-place': j },
              explanation: `${arr[j].val} < ${pivotVal}, and already in place.`
            };
          }
        }
      }
      
      if (i + 1 !== high) {
        let temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        yield {
          data: [...arr],
          highlights: [i + 1, high],
          swapped: [i + 1, high],
          sorted: [...sortedIndices],
          pointers: { pivot: i + 1 },
          explanation: `Placed pivot ${pivotVal} in its correct sorted position.`
        };
      }
      let pi = i + 1;
      sortedIndices.push(pi);
      
      yield {
        data: [...arr],
        highlights: [],
        sorted: [...sortedIndices],
        pointers: {},
        explanation: `Pivot ${pivotVal} is now fully sorted. Recursively sorting left and right partitions.`
      };

      yield* quickSort(low, pi - 1);
      yield* quickSort(pi + 1, high);
    } else if (low === high) {
      if (!sortedIndices.includes(low)) {
         sortedIndices.push(low);
         yield {
           data: [...arr],
           highlights: [],
           sorted: [...sortedIndices],
           pointers: {},
           explanation: `Element ${arr[low].val} is sorted (base case).`
         };
      }
    }
  }

  yield* quickSort(0, n - 1);

  yield {
    data: [...arr],
    highlights: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    pointers: {},
    explanation: `Quick Sort Complete! Entire array is sorted.`
  };
}

function* linearSearchGenerator(initialArr, targetValue = 42) {
  let arr = initialArr.map((val, idx) => ({ id: `item-${val}-${idx}`, val }));
  let target = targetValue;
  const n = arr.length;

  yield {
    data: [...arr],
    highlights: [],
    sorted: [],
    pointers: {},
    explanation: `Starting Linear Search for target = ${target}.`
  };

  for (let i = 0; i < n; i++) {
    yield {
      data: [...arr],
      highlights: [i],
      pointers: { curr: i },
      explanation: `Checking if arr[${i}] (${arr[i].val}) == ${target}.`
    };
    if (arr[i].val === target) {
      yield {
        data: [...arr],
        highlights: [i],
        sorted: [i],
        pointers: { found: i },
        explanation: `🎯 Target ${target} FOUND at index ${i}!`
      };
      return;
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
  insertionSort: { fn: insertionSortGenerator, title: "Insertion Sort Visualizer" },
  quickSort: { fn: quickSortGenerator, title: "Quick Sort Visualizer" },
  binarySearch: { fn: binarySearchGenerator, title: "Binary Search Visualizer" },
  linearSearch: { fn: linearSearchGenerator, title: "Linear Search Visualizer" },
};

export default function ArrayVisualizer({
  algorithm = "bubbleSort",
  initialData = [64, 34, 25, 12, 22, 11, 90],
  target = 25,
  title,
  description = "Interact with the controls below to play, pause, or step through the algorithm.",
  readOnly = false
}) {
  const selectedAlgo = ALGORITHMS[algorithm] || ALGORITHMS.bubbleSort;

  const generatorFn = useMemo(() => {
    if (algorithm === "binarySearch" || algorithm === "linearSearch") {
      return (data) => selectedAlgo.fn(data, target);
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
  const explanation = activeSnapshot.explanation || "Ready to execute.";

  const [inputVal, setInputVal] = useState(controller.data.join(', '));
  const [showSpeedSlider, setShowSpeedSlider] = useState(false);

  // Sync input value if controller data changes (e.g., initially)
  useEffect(() => {
    setInputVal(controller.data.join(', '));
  }, [controller.data]);

  const handleApplyInput = (e) => {
    e.preventDefault();
    const nums = inputVal
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
    if (nums.length > 0) {
      controller.updateData(nums);
    }
  };

  const handleRandomize = () => {
    const randomArray = Array.from({ length: 6 }, () => Math.floor(Math.random() * 89) + 10);
    controller.updateData(randomArray);
    setInputVal(randomArray.join(', '));
  };

  const iconBtnStyle = {
    background: 'transparent',
    border: 'none',
    color: '#9ca3af',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.2s, color 0.2s'
  };

  return (
    <div style={{
      margin: '1.5rem 0',
      background: 'rgba(15, 23, 42, 0.95)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '12px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      position: 'relative',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    }}>
      {/* Top Row: Input & Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <form onSubmit={handleApplyInput} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            style={{
              width: '190px',
              padding: '6px 12px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '6px 14px',
              background: '#00c3ff',
              color: '#000',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Apply Data
          </button>
        </form>

        {/* Legend */}
        {!readOnly && (
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: '#9ca3af', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#ef4444' }}></span> Active / Comparing
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#f59e0b' }}></span> Swapped
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: '#10b981' }}></span> Sorted / Found
            </span>
          </div>
        )}
      </div>

      {/* Middle Row: The Array Visualizer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        paddingTop: '24px',
        position: 'relative',
        flexWrap: 'wrap'
      }}>
        <div style={{
          fontSize: '1.4rem',
          fontWeight: '600',
          color: '#e2e8f0',
          marginRight: '12px',
          marginBottom: '28px'
        }}>
          Array =
        </div>
        {currentArr.map((item, idx) => {
          const val = typeof item === 'object' && item !== null ? item.val : item;
          const itemId = typeof item === 'object' && item !== null ? item.id : idx;
          
          const isHighlight = highlights.includes(idx);
          const isSwapped = swapped.includes(idx);
          const isSorted = sorted.includes(idx);

          let boxColor = '#3b82f6'; // default solid blue
          if (!readOnly) {
            if (isSorted) boxColor = '#10b981'; // green
            if (isSwapped) boxColor = '#f59e0b'; // orange
            if (isHighlight) boxColor = '#ef4444'; // red highlight
          }

          const matchingPointers = !readOnly ? Object.entries(pointers)
            .filter(([_, ptrIdx]) => ptrIdx === idx)
            .map(([ptrName]) => ptrName) : [];

          return (
            <motion.div layout key={itemId} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}>
              {/* Pointer Tag above box */}
              {matchingPointers.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-28px',
                  background: '#00f0ff',
                  color: '#090d16',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 0 8px rgba(0,240,255,0.4)',
                  zIndex: 10
                }}>
                  {matchingPointers.join(', ')}
                </div>
              )}

              {/* Array Box */}
              <div style={{
                width: '56px',
                height: '56px',
                background: boxColor,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: '700',
                fontSize: '1.2rem',
                boxShadow: isHighlight && !readOnly ? '0 0 12px rgba(239, 68, 68, 0.7)' : '0 4px 6px rgba(0,0,0,0.2)'
              }}>
                {val}
              </div>

              {/* Index label below box */}
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '8px' }}>
                {idx}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Row: Explanation & Controls (Hidden in readOnly mode) */}
      {!readOnly && (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginTop: '1rem'
          }}>
            {/* Explanation */}
            <div style={{
              flex: 1,
              padding: '10px 14px',
              background: 'rgba(30, 41, 59, 0.5)',
              borderLeft: '4px solid #00c3ff',
              fontSize: '0.85rem',
              color: '#e2e8f0',
            }}>
              <strong style={{ color: '#00c3ff' }}>Explanation: </strong>{explanation}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={handleRandomize}
                title="Randomize Data"
                style={{ ...iconBtnStyle, padding: '6px' }}
              >
                <Shuffle size={16} />
              </button>
              
              <div style={{ display: 'flex', background: 'rgba(30, 41, 59, 0.7)', borderRadius: '8px', padding: '4px', gap: '2px', alignItems: 'center' }}>
                 <button onClick={controller.reset} style={iconBtnStyle} title="Reset"><RotateCcw size={16}/></button>
                 <button onClick={controller.stepBackward} disabled={controller.currentStep <= 0} style={{ ...iconBtnStyle, color: controller.currentStep <= 0 ? '#475569' : '#9ca3af', cursor: controller.currentStep <= 0 ? 'not-allowed' : 'pointer' }}><SkipBack size={16}/></button>
                 <button
                   onClick={controller.isPlaying ? controller.pause : controller.play}
                   style={{
                     background: '#10b981',
                     border: 'none',
                     color: '#fff',
                     padding: '6px 14px',
                     borderRadius: '6px',
                     fontWeight: '600',
                     cursor: 'pointer',
                     display: 'flex',
                     alignItems: 'center',
                     gap: '6px',
                     fontSize: '0.9rem',
                     marginLeft: '2px',
                     marginRight: '2px'
                   }}
                 >
                   {controller.isPlaying ? <><Pause size={16}/> Pause</> : <><Play size={16}/> Play</>}
                 </button>
                 <button onClick={controller.stepForward} disabled={controller.currentStep >= controller.totalSteps - 1} style={{ ...iconBtnStyle, color: controller.currentStep >= controller.totalSteps - 1 ? '#475569' : '#9ca3af', cursor: controller.currentStep >= controller.totalSteps - 1 ? 'not-allowed' : 'pointer' }}><SkipForward size={16}/></button>
                 <button
                   onClick={() => setShowSpeedSlider(!showSpeedSlider)}
                   style={{ ...iconBtnStyle, color: showSpeedSlider ? '#00c3ff' : '#9ca3af' }}
                   title="Speed Controls"
                 >
                   <Sliders size={16}/>
                 </button>
              </div>
            </div>
          </div>
          
          {/* Animated Vertical Speed Slider Popup */}
          <AnimatePresence>
            {showSpeedSlider && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  right: '20px',
                  bottom: '76px', // position above the controls
                  background: 'rgba(30, 41, 59, 0.98)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '16px 8px 12px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  zIndex: 50
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#00c3ff', fontWeight: 'bold' }}>
                  {controller.speed}ms
                </span>
                <input
                  type="range"
                  min="100"
                  max="1200"
                  step="50"
                  value={1300 - controller.speed}
                  onChange={(e) => controller.setSpeed(1300 - parseInt(e.target.value))}
                  style={{ 
                    appearance: 'slider-vertical',
                    width: '6px',
                    height: '100px',
                    cursor: 'pointer',
                    accentColor: '#00c3ff'
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

    </div>
  );
}
