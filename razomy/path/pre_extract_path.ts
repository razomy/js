import {ArgumentException} from '@razomy/exceptions';
import type {String} from '@razomy/string';

export function preExtractPath(filePath: String, equalPath: String): String {
  const parts: string[] = filePath.split('/');
  const startIndex: number = parts.indexOf(equalPath);
  if (startIndex !== -1) {
    const result: string = parts.slice(0, startIndex).join('/');
    return result;
  } else {
    throw new ArgumentException('Path not found', {filePath, equalPath});
  }
}
