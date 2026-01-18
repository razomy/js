import fs from 'fs';
import {logInline} from 'razomy.shell';

export function tryCreate(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, {recursive: true});
    logInline(`Directory created: ${dirPath}`);
  } else {
    logInline(`Directory already exists: ${dirPath}`);
  }
}
