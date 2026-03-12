import * as refactorFs from '@razomy/refactor-fs';

export function renameToSnakeCaseRecursiveTs(dirPath: string) {
  return refactorFs.renameToSnakeCaseRecursive(dirPath, '.ts', 'node_modules');
}
