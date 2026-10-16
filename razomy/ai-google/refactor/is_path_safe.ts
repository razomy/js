import path from "path";

/**
 * Проверка безопасности пути (защита от Path Traversal)
 */
export function isPathSafe(targetDir: string, relativeTarget: string): boolean {
  const resolvedBase = path.resolve(targetDir);
  const resolvedTarget = path.resolve(targetDir, relativeTarget);
  return resolvedTarget.startsWith(resolvedBase + path.sep) || resolvedTarget === resolvedBase;
}
