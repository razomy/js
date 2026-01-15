import perf_hooks from 'perf_hooks';

export const {performance} = perf_hooks;

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

  tick_and_log(key: string = 'default') {
    console.log(`Execution time: key=${key} time=${this.tick()} milliseconds`);
  }
}
