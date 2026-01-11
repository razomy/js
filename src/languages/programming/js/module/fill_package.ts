import {getChildrenDirectoryFs} from 'razomy/fs';

export function generateIndexFiles(path: string) {
  const files = getChildrenDirectoryFs(path)
  console.log(files);
}
