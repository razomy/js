import * as path from 'path';
import {WithPath} from "razomy.js/fs/path";

export const PYTHON_CACHE = ['__pycache__'];
export const JS_ANGULAR_CACHE = ['.angular'];
export const CSHARP_CACHE = ['obj'];
export const DART_CACHE = ['.dart_tool'];
export const DART_FIREBASE_CACHE = ['.firebase'];

export const KNOWN_CACHE = [
  ...PYTHON_CACHE,
  ...JS_ANGULAR_CACHE,
  ...CSHARP_CACHE,
  ...DART_CACHE,
  ...DART_FIREBASE_CACHE,
];

function getPathComponents(path_: string): string[] {
  return path_.split(path.sep).filter(component => component.length > 0);
}

export function isInCache(ctx: WithPath): boolean {
  const pathComponents = getPathComponents(ctx.path);

  return KNOWN_CACHE.some(cacheDir => pathComponents.includes(cacheDir));
}