import {performance} from 'perf_hooks';

export async function performance_cb(key, callback) {
  const start_time = performance.now();
  const result = await callback();
  const end_time = performance.now();
  const execution_time = end_time - start_time;
  console.log(`Execution time: key=${key} time=${execution_time} milliseconds`);
  return result;
}

export class Performance {
  start_time: number;
  end_time: number;

  constructor() {
    this.start_time = performance.now();
    this.end_time = performance.now();

  }

  tick() {
    this.end_time = performance.now();
    const execution_time = this.end_time - this.start_time;
    this.start_time = this.end_time;
    return execution_time;
  }

  tick_and_log(key: string = "default") {
    console.log(`Execution time: key=${key} time=${this.tick()} milliseconds`);
  }
}
