import * as abstracts from '@razomy/abstracts';
import * as fsRecursive from "@razomy/fs-recursive";

export function getAllFlat(dir: abstracts.domains.DirPathString): string[] {
  const files: string[] = [];

  for (const file of fsRecursive.get(dir)) {
    files.push(file);
  }

  return files;
}
