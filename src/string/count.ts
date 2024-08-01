export function count(str: string, c: string, offset: number, max_offset: number): number {
  let result = 0;
  for (let i = offset; i < max_offset; i++) {
    if (str[i] === c) {
      result++;
    }
  }
  return result;
}
