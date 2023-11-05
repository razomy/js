
export function countOccurrences(str: string, c: string): number {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === c) {
      result++;
    }
  }
  return result;
}
