import {performance} from 'perf_hooks';

export async function performance_cb(key, callback) {
  const startTime = performance.now();
  const result = await callback();
  const endTime = performance.now();
  const executionTime = endTime - startTime;
  console.log(`Execution time: key=${key} time=${executionTime} milliseconds`);
  return result;
}

export class Performance {
  startTime: number;
  endTime: number;

  constructor() {
    this.startTime = performance.now();
    this.endTime = performance.now();

  }

  tick() {
    this.endTime = performance.now();
    const executionTime = this.endTime - this.startTime;
    this.startTime = this.endTime;
    return executionTime;
  }

  tick_and_log(key: string = "default") {
    console.log(`Execution time: key=${key} time=${this.tick()} milliseconds`);
  }
}
