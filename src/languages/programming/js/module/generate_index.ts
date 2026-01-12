import {getChildrenDirectoryFs} from 'razomy/fs';

export function generate_index_files(path: string) {
  const files = getChildrenDirectoryFs(path)
  console.log(files);
}
