import {performance} from 'perf_hooks';
import {formatTime} from './format_time';
import {formatMemory} from './format_memory';
import {estimate} from './estimate';

export interface PerformanceRecord {
  // Abstract linear measurement system of function complexity for space
  timeDataSize: number;
  // Execution time in milliseconds
  time: number;
  // Abstract linear measurement system of function complexity for memory
  memoryDataSize: number;
  // Memory used in bytes
  memory: number;
}

export interface Prediction {
  timeText: string;
  timeMs: number;
  memoryText: string;
  memoryBytes: number;
}

export class WeightedMovingAverageRecorder {
  private history: PerformanceRecord[];
  private readonly maxHistory: number;

  /**
   * @param maxHistory - How many recent runs to remember (default is 10)
   */
  constructor(maxHistory: number = 5) {
    this.history = [];
    this.maxHistory = maxHistory;
  }

  public estimate(timeDataSize: number, memoryDataSize: number) {
    return estimate(this.history, timeDataSize, memoryDataSize);
  }

  /**
   * Wrapper for executing the task. Measures time, memory, and learns.
   */
  public async measure<T>(timeDataSize: number, memoryDataSize: number, taskFn: () => Promise<T>) {
    const prediction = estimate(this.history, timeDataSize, memoryDataSize);

    // 1. Snapshot memory and time before execution
    const startMemory = process.memoryUsage().heapUsed;
    const start = performance.now();

    // 2. Execute payload
    const result = await taskFn();

    // 3. Snapshot memory and time after execution
    const actualTimeMs = performance.now() - start;
    const endMemory = process.memoryUsage().heapUsed;

    // If Garbage Collector ran, endMemory might be lower than startMemory. We clamp to 0.
    const actualMemoryBytes = Math.max(0, endMemory - startMemory);

    // 4. Save to history
    this.history.push({
      timeDataSize: timeDataSize,
      memoryDataSize: memoryDataSize,
      time: actualTimeMs,
      memory: actualMemoryBytes,
    });

    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    return {
      result: result,
      prediction: prediction,
      actualTimeText: formatTime(actualTimeMs),
      actualTimeMs: actualTimeMs,
      actualMemoryText: formatMemory(actualMemoryBytes),
      actualMemoryBytes: actualMemoryBytes,
    };
  }

  public exportState(): PerformanceRecord[] {
    return [...this.history];
  }

  public importState(state: PerformanceRecord[]): void {
    this.history = [...state];
  }
}
