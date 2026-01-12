export function sum_arrays(...arrays: number[][]): number[] {
  // Check if there are at least two arrays to sum
  if (arrays.length < 2) {
    throw new Error('At least two arrays are required for summation.');
  }
  // Check if all input arrays have the same length
  const first_array_length = arrays[0].length;
  if (!arrays.every(arr => arr.length === first_array_length)) {
    throw new Error('Input arrays must have the same length.');
  }
  // Initialize an empty array to store the result
  const result = Array.from({length: first_array_length}, () => 0);
  // Iterate through the arrays and sum corresponding elements
  for (const arr of arrays) {
    for (let i = 0; i < first_array_length; i++) {
      result[i] += arr[i];
    }
  }
  return result;
}