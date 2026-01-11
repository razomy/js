import {getChildrenDirectoryFs} from 'razomy.js/fs';

export function generateIndexFiles(path: string) {
  const files = getChildrenDirectoryFs(path)
  console.log(files);
}

generateIndexFiles()