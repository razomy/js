import * as languagesProgrammingFs from "@razomy/languages-programming-fs";

export function isCacheIsInCache(path: string): boolean {
  const pathComponents = languagesProgrammingFs.isCacheGetPathComponents(path);
  return languagesProgrammingFs.KNOWN_CACHE.some((cacheDir) => languagesProgrammingFs.isCacheHasSubArray(pathComponents, cacheDir));
}
