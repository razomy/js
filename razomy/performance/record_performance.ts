import * as performance from '@razomy/performance';

export async function recordPerformance<T extends any[]>(
  fn: (...t: T) => any,
  testCases: {
    timeDataSize: number;
    memoryDataSize: number;
    args: T;
  }[],
) {
  let estimator: performance.WeightedMovingAverageRecorder;
  estimator = new performance.WeightedMovingAverageRecorder(10);

  for (const input of testCases) {
    await estimator.measure(input.timeDataSize, input.memoryDataSize, async () => {
      return await fn(...input.args);
    });
  }

  return estimator;
}
