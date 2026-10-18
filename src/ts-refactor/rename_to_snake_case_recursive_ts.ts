import * as tsRefactor from "@razomy/ts-refactor";

export function renameToSnakeCaseRecursiveTs(dirPath: string) {
  return tsRefactor.renameToSnakeCaseRecursive(dirPath, '.ts', 'node_modules');
}
