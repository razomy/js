import * as exceptions from '@razomy/exceptions';

export function subExtractPath(filePath: string, equalPath: string): string {
  const parts: string[] = filePath.split('/');
  const startIndex: number = parts.indexOf(equalPath);

  if (startIndex !== -1) {
    const result: string = parts.slice(startIndex).join('/');
    return result;
  } else {
    throw new exceptions.ArgumentException('Path not found', { filePath, equalPath });
  }
}
