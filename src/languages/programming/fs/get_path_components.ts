import path from 'path';
import is_cache_has_sub_array from './has_sub_array';

export default function is_cache_get_path_components(path_: string): string[] {
  return path_.split(path.sep).filter(component => component.length > 0);
}