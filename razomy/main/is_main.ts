import {fileURLToPath} from 'url';

export function isMain(importMetaUrlOrRequireMain: string) {
  const currentPath = fileURLToPath(importMetaUrlOrRequireMain);
  if (process.argv[1] === currentPath) {
    return true;
  }

  if (require?.main?.path === currentPath) {
    return true;
  }

  return false;
}
