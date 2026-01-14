import rename_to_snake_case_recursive from './rename_to_snake_case_recursive';

export default function rename_to_snake_case_recursive_ts(dir_path: string) {
  return rename_to_snake_case_recursive(dir_path, '.ts', 'node_modules');
}