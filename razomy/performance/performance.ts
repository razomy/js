import perf_hooks from 'perf_hooks';

export const { performance } = perf_hooks;

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

  tickAndLog(key: string = 'default') {
    console.log(`Execution time: key=${key} time=${this.tick()} milliseconds`);
  }
}


export type HardwareLimitation =
  | 'Read_ByIndex'
  | 'Search_ByValue'
  | 'InsertDelete'
  | 'MemoryFootprint'
  | 'CacheLocality';

export type OptimizationTradeoff = {
  //   read: BigO;
  //   search: BigO;
  //   insertDelete: BigO;
  //   memory: 'High' | 'Medium' | 'Low';
  //   cacheLocality: 'Excellent' | 'Poor' | 'Random';
};
