import {isCacheHasSubArray} from './is_cache_has_sub_array';
import {isCacheGetPathComponents} from './is_cache_get_path_components';
import {knownCache} from './is_cache';

export function isCacheIsInCache(path: string): boolean {
  const pathComponents = isCacheGetPathComponents(path);
  return knownCache.some(cacheDir => isCacheHasSubArray(pathComponents, cacheDir));
}
