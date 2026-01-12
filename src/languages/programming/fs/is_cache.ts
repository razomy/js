import * as path from 'path';

import {has_sub as has_sub_array2} from 'razomy/array/has_sub';

export const python_cache = ['__pycache__', '.pytest_cache'];
export const js_angular_cache = ['.angular'];
export const csharp_cache = ['obj'];
export const dart_cache = ['.dart_tool'];
export const next_cache = ['.next'];
export const nx_cache = ['lib'];
export const idea_cache = ['.idea'];
export const nuxt_cache = ['.nuxt'];
export const dart_firebase_cache = [
  '.firebase',
  ['flutter', 'ephemeral'],
  ['ios', '.symlinks'],
  // ios
  ['Pods'],
];
export const unity_cache = ['Temp', 'Debug'];
export const java_cache = ['.gradle'];

export const known_cache = [
  ...python_cache,
  ...js_angular_cache,
  ...csharp_cache,
  ...dart_cache,
  ...next_cache,
  ...nuxt_cache,
  ...nx_cache,
  ...dart_firebase_cache,
  ...unity_cache,
  ...java_cache,
  ...idea_cache,
];

function get_path_components(path_: string): string[] {
  return path_.split(path.sep).filter(component => component.length > 0);
}

function has_sub_array(master: string[], sub: string | string[]): boolean {
  if (Array.isArray(sub)) {
    return has_sub_array2(master, sub)

  }
  return master.includes(sub)
}

export function is_in_cache(path_: string): boolean {
  const path_components = get_path_components(path_);

  return known_cache.some(cacheDir => has_sub_array(path_components, cacheDir));
}