import * as path from 'path';
import fs from 'fs';
import * as fsRecursive from "@razomy/fs-recursive";
import * as stringCase from "@razomy/string-case";

export function renameToSnakeCaseRecursive(dirPath: string, mustInclude: string, mustNotInclude) {
  let files = fsRecursive.toDict(dirPath);
  files = files.map((i) => i.substring(dirPath.length));
  files = files.filter((i) => i.includes(mustInclude));
  files = files.filter((i) => !i.includes(mustNotInclude));
  for (const filesKey of files) {
    const snackCase = stringCase.snakeCase(filesKey);
    if (filesKey != snackCase) {
      console.log('rename', filesKey, snackCase);
      fs.renameSync(path.join(dirPath, filesKey), path.join(dirPath, snackCase));
    }
  }
}
