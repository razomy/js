import get from 'razomy.fs/file/recursive/get';

export function generate_index_files(path: string) {
  const files = get(path)
  console.log(files);
}
