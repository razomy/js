import fs from 'fs';
import * as shell from "@razomy/shell";

export function tryCreate(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    shell.logInline(`Directory created: ${dirPath}`);
  } else {
    shell.logInline(`Directory already exists: ${dirPath}`);
  }
}
