export function newArray(size: number, fill: number = 0): number[] {
  return new Array(size).fill(fill);
}

export function vectorOf(ix: number, size: number): number[] {
  const arr = newArray(size);
  arr[ix] = 1;
  return arr;
}

export function sumArrays(...arrays: number[][]): number[] {
  // Check if there are at least two arrays to sum
  if (arrays.length < 2) {
    throw new Error('At least two arrays are required for summation.');
  }
  // Check if all input arrays have the same length
  const firstArrayLength = arrays[0].length;
  if (!arrays.every(arr => arr.length === firstArrayLength)) {
    throw new Error('Input arrays must have the same length.');
  }
  // Initialize an empty array to store the result
  const result = Array.from({length: firstArrayLength}, () => 0);
  // Iterate through the arrays and sum corresponding elements
  for (const arr of arrays) {
    for (let i = 0; i < firstArrayLength; i++) {
      result[i] += arr[i];
    }
  }
  return result;
}

export function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }

  return array;
}

export function sum(arr: any[], property: string): number {
  return arr.reduce((acc, obj) => acc + obj[property], 0);
}


export function first_equal<T>(list1: T[], list2: T[]) {
  const commonStrings = null;

  for (const item2 of list2) {
    for (const item1 of list1) {
      if (item2 === item1) {
        return item2;
      }
    }
  }

  return commonStrings;
}

export function last_equal<T, T2>(as: T[], bs: T2[], is_condition: (a: T, b: T2) => boolean): [T, T2] | null {
  for (let i = as.length - 1; i >= 0; i--) {
    const item_a = as[i];
    for (let j = bs.length - 1; j >= 0; j--) {
      const item_b = bs[j];
      if (is_condition(item_a, item_b)) {
        return [item_a, item_b];
      }
    }
  }
  return null;
}