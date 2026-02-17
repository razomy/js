import * as path from 'path';

export function isPackageGetPathComponents(path_: string): string[] {
  return path_.split(path.sep).filter(component => component.length > 0);
}