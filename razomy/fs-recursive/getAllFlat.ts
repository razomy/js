import * as abstracts from '@razomy/abstracts';
import {get} from "./get";

export function getAllFlat(dir: abstracts.graphs.DirPathString): string[] {
  const files: string[] = [];

  for (const file of get(dir)) {
    files.push(file);
  }

  return files;
}
