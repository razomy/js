import {get_recursive_file_fs} from 'razomy/fs';

export function generate_index_files(path: string) {
  const files = get_recursive_file_fs(path)
  console.log(files);
}
