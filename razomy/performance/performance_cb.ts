export async function performanceCb(key, callback) {
  const startTime = performance.now();
  const result = await callback();
  const endTime = performance.now();
  const executionTime = endTime - startTime;
  console.log(`Execution time: key=${key} time=${executionTime} milliseconds`);
  return result;
}