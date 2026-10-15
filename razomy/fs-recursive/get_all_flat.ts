import * as abstractions from '@razomy/abstractions';
import * as fsRecursive from "@razomy/fs-recursive";

export function getAllFlat(dir: abstractions.components.DirPathString): string[] {
  const files: string[] = [];

  for (const file of fsRecursive.get(dir)) {
    files.push(file);
  }

  return files;
}
