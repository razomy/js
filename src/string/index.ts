export function last_index_of(str: string, c: string, offset: number, max_offset: number): number {
  for (let i = max_offset -1; i >= offset; i--) {
    if (str[i] === c) {
      return i;
    }
  }
  return -1;
}

