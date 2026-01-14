import path from 'path';

export default function is_output_get_path_components(path_: string): string[] {
  return path_.split(path.sep).filter(component => component.length > 0);
}