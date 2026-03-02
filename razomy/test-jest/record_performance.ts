import {WeightedMovingAverageRecorder} from '@razomy/performance';

export async function record_performance<T extends any[]>(fn: (...t: T) => any, testCases: {
  timeDataSize: number,
  memoryDataSize: number,
  args: T
}[]) {
  let estimator: WeightedMovingAverageRecorder;
  estimator = new WeightedMovingAverageRecorder(10);

  for (const input of testCases) {
    await estimator.measure(input.timeDataSize, input.memoryDataSize, async () => {
      return await fn(...input.args);
    });
  }

  return estimator;
}

export function n_string_testCases_record_performance() {
  const pattern = 'fooBar baz_qux-123 ';

  return [
    // 0,
    // 10,
    100,
    1_000,
    10_000
  ].map(size => ({
    // Упрощаем: используем одно поле dataSize
    timeDataSize: size,
    memoryDataSize: size,
    args: [pattern.repeat(size)] as [string]
  }));
}