import fs from 'fs';

export function tryCreate(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, {recursive: true});
    return true;
  } else {
    return false;
  }
}
