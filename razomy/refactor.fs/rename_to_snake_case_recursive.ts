import {toDict} from '@razomy/fs.dict';

import * as path from 'path';
import fs from 'fs';
import {snakeCase} from '@razomy/string.case';

export function renameToSnakeCaseRecursive(dirPath: string, mustInclude: string, mustNotInclude) {
  let files = toDict(dirPath);
  files = files.map(i => i.substring(dirPath.length))
  files = files.filter(i => i.includes(mustInclude))
  files = files.filter(i => !i.includes(mustNotInclude))
  for (const filesKey of files) {
    const snackCase = snakeCase(filesKey);
    if (filesKey != snackCase) {
      console.log('rename', filesKey, snackCase);
      fs.renameSync(path.join(dirPath, filesKey), path.join(dirPath, snackCase))
    }
  }
}
