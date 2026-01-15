export async function performance_cb(key, callback) {
  const start_time = performance.now();
  const result = await callback();
  const end_time = performance.now();
  const execution_time = end_time - start_time;
  console.log(`Execution time: key=${key} time=${execution_time} milliseconds`);
  return result;
}