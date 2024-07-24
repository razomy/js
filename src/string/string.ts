export function extractSubPathFrom(filePath: string, root: string): string {
  const parts: string[] = filePath.split('/');
  const startIndex: number = parts.indexOf(root);

  if (startIndex !== -1) {
    const result: string = parts.slice(startIndex).join('/');
    return result;
  } else {
    throw new Error('E');// If "e" is not found, return the original path
  }
}

export function extractPrePathFrom(filePath: string, root: string): string {
  const parts: string[] = filePath.split('/');
  const startIndex: number = parts.indexOf(root);

  if (startIndex !== -1) {
    const result: string = parts.slice(0, startIndex).join('/');
    return result;
  } else {
    throw new Error('E');// If "e" is not found, return the original path
  }
}

export function count(str: string, char: string) {
  return str.split(char).length - 1;
}


export function indexOfAny(str: string, chars: string[], offset: number) {
  for (let i = offset; i < str.length; i++) {
    if (chars.includes(str[i])) {
      return i;
    }
  }

  return -1;
}

export function index_after_last(str: string, char: string, offset: number) {
  let i = offset
  for (; i < str.length; i++) {
    if (char == str[i]) {
      continue;
    } else {
      return i;
    }
  }

  return i;
}


export function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export function last<T>(arr: T[]) {
  return arr.at(-1)!
}

export function map_object<T, T2>(obj: Record<string, T>, cb: (t: T) => Partial<T2>): T2[] {
  const entities = Object.entries(obj);
  const new_entities = entities.map(([k, v]) => [k, cb(v)]);
  return Object.fromEntries(new_entities);
}

export const countSpacesAtFront = (strs: string[]): number[] =>
  strs.map(str => {
    let i = 0;
    for (let chr of str) {
      if (chr == ' ') {
        i++;
      } else {
        return i;
      }
    }
    return i;
  });

export function escapeString(str: string, key: string): string {
  return str.replaceAll(key, '\\' + key);
}

export function unescapeString(str: string, key: string): string {
  return str.replaceAll('\\' + key, key);
}