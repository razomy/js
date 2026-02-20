import * as path from 'path';
import fs from 'fs';
import {tryCreate} from '@razomy/fs-directory';
import type {VrdOrValue} from '@razomy/vrd';
import {isVrd} from '@razomy/vrd';

export function toFs(absolutePath: string, dict: VrdOrValue<Buffer>) {
  if (isVrd(dict)) {
    tryCreate(absolutePath)
    for (const key in dict) {
      const branch = dict[key];
      const itemAbsolutePath = path.join(absolutePath, key);
      toFs(itemAbsolutePath, branch);
    }
  } else {
    fs.writeFileSync(absolutePath, dict)
  }
}


