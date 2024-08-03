export function last_index_of(str: string, char: string, offset: number = 0, max_offset: number = str.length): number {
  for (let i = max_offset - 1; i >= offset; i--) {
    if (str[i] === char) {
      return i;
    }
  }
  return -1;
}


export function index_of_any(str: string, chars: string[], offset: number = 0, max_offset: number = str.length) {
  for (let i = offset; i < max_offset; i++) {
    if (chars.includes(str[i])) {
      return i;
    }
  }

  return -1;
}

export function is_index_of_any(str: string, chars: string[], offset: number = 0, max_offset: number = str.length) {
  return index_of_any(str, chars, offset, max_offset) !== -1;
}

export function index_after_last(str: string, char: string, offset: number = 0, max_offset: number = str.length) {
  let i = offset
  for (; i < max_offset; i++) {
    if (char == str[i]) {
      continue;
    } else {
      return i;
    }
  }

  return i;
}