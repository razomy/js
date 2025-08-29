import {performance} from 'perf_hooks';

export async function profileExecution(key, callback) {
  const startTime = performance.now();
  const result = await callback();
  const endTime = performance.now();
  const executionTime = endTime - startTime;
  console.log(`Execution time: key=${key} time=${executionTime} milliseconds`);
  return result;
}
