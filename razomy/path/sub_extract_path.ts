import * as exceptions from '@razomy/exceptions';
import * as string from '@razomy/string';

export function subExtractPath(filePath: string.String, equalPath: string.String): string.String {
  const parts: string[] = filePath.split('/');
  const startIndex: number = parts.indexOf(equalPath);

  if (startIndex !== -1) {
    const result: string = parts.slice(startIndex).join('/');
    return result;
  } else {
    throw new exceptions.ArgumentException('Path not found', { filePath, equalPath });
  }
}
