import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useAlgorithmController
 * 
 * Engine hook that manages step generator execution for algorithm visualizers.
 * Generates all state snapshots from a generator function, allowing instant
 * scrubbing, play/pause, step forward/backward, speed adjustment, and data resets.
 *
 * @param {Function} generatorFn - Algorithm generator function (fn(data) => yield snapshot)
 * @param {Array|Object} initialData - Initial input data for the algorithm
 */
export function useAlgorithmController(generatorFn, initialData) {
  const [data, setData] = useState(initialData);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(400); // ms per step

  const timerRef = useRef(null);

  // Generate complete history of snapshots whenever input data or generatorFn changes
  const generateHistory = useCallback((inputData) => {
    if (!generatorFn) return [];
    try {
      const gen = generatorFn(inputData);
      const steps = [];
      let result = gen.next();
      while (!result.done) {
        steps.push(result.value);
        result = gen.next();
      }
      if (result.value) {
        steps.push(result.value);
      }
      return steps;
    } catch (err) {
      console.error("Error generating algorithm history:", err);
      return [];
    }
  }, [generatorFn]);

  // Re-initialize steps when data changes
  useEffect(() => {
    const newHistory = generateHistory(data);
    setHistory(newHistory);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [data, generateHistory]);

  // Handle automatic playback timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= history.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, history.length, speed]);

  const play = useCallback(() => {
    if (currentStep >= history.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  }, [currentStep, history.length]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const stepForward = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(prev + 1, history.length - 1));
  }, [history.length]);

  const stepBackward = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
  }, []);

  const jumpToStep = useCallback((index) => {
    setIsPlaying(false);
    if (index >= 0 && index < history.length) {
      setCurrentStep(index);
    }
  }, [history.length]);

  const updateData = useCallback((newData) => {
    setIsPlaying(false);
    setData(newData);
  }, []);

  const activeSnapshot = history[currentStep] || {
    data: data,
    highlights: [],
    pointers: {},
    explanation: 'Ready to start.',
  };

  return {
    data,
    updateData,
    history,
    currentStep,
    activeSnapshot,
    isPlaying,
    speed,
    setSpeed,
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
    jumpToStep,
    isFinished: currentStep >= history.length - 1,
    totalSteps: history.length,
  };
}
