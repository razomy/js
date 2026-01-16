import {is_cache_has_sub_array} from './is_cache_has_sub_array';
import {is_cache_get_path_components} from './is_cache_get_path_components';
import {known_cache} from './is_cache';

export function is_cache_is_in_cache(path: string): boolean {
    const path_components = is_cache_get_path_components(path);
    return known_cache.some(cacheDir => is_cache_has_sub_array(path_components, cacheDir));
}
