import * as kvRecursive from "@razomy/kv-recursive";

export function renameToSnakeCaseRecursiveTs(dirPath: string) {
  return kvRecursive.renameToSnakeCaseRecursive(dirPath, '.ts', 'node_modules');
}
