import path from 'path';

export function isCacheGetPathComponents(path_: string): string[] {
  return path_.split(path.sep).filter(component => component.length > 0);
}