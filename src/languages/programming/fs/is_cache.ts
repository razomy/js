import * as path from 'path';

export const PYTHON_CACHE = ['__pycache__', '.pytest_cache'];
export const JS_ANGULAR_CACHE = ['.angular'];
export const CSHARP_CACHE = ['obj'];
export const DART_CACHE = ['.dart_tool'];
export const NEXT_CACHE = ['.next'];
export const NX_CACHE = ['lib'];
export const IDEA_CACHE = ['.idea'];
export const NUXT_CACHE = ['.nuxt'];
export const DART_FIREBASE_CACHE = ['.firebase', ["flutter", "ephemeral"]];
export const UNITY_CACHE = ['Temp', 'Debug'];
export const JAVA_CACHE = ['.gradle'];

export const KNOWN_CACHE = [
  ...PYTHON_CACHE,
  ...JS_ANGULAR_CACHE,
  ...CSHARP_CACHE,
  ...DART_CACHE,
  ...NEXT_CACHE,
  ...NUXT_CACHE,
  ...NX_CACHE,
  ...DART_FIREBASE_CACHE,
  ...UNITY_CACHE,
  ...JAVA_CACHE,
  ...IDEA_CACHE,
];

function getPathComponents(path_: string): string[] {
  return path_.split(path.sep).filter(component => component.length > 0);
}

function hasSubArray(master: string[], sub: string | string[]): boolean {
  if (Array.isArray(sub)) {
    return sub.every((i => v => i = master.indexOf(v, i) + 1)(0));

  }
  return master.includes(sub)
}

export function isInCache(path_: string): boolean {
  const pathComponents = getPathComponents(path_);

  return KNOWN_CACHE.some(cacheDir => hasSubArray(pathComponents, cacheDir));
}