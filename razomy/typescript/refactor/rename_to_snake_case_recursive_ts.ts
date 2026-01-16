import {rename_to_snake_case_recursive} from '../../refactor/fs/rename_to_snake_case_recursive';

export function rename_to_snake_case_recursive_ts(dir_path: string) {
  return rename_to_snake_case_recursive(dir_path, '.ts', 'node_modules');
}