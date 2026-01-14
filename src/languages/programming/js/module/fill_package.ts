import get from 'razomy.fs/file/recursive/get';

export default function generate_index_files(path: string) {
  const files = get(path)
  console.log(files);
}
