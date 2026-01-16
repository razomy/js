import path from 'path';

export function is_package_get_path_components(path_: string): string[] {
  return path_.split(path.sep).filter(component => component.length > 0);
}