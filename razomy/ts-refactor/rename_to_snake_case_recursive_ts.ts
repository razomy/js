import {renameToSnakeCaseRecursive} from '@razomy/refactor-fs';

export function renameToSnakeCaseRecursiveTs(dirPath: string) {
  return renameToSnakeCaseRecursive(dirPath, '.ts', 'node_modules');
}