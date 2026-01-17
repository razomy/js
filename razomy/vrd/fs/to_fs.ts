import path from 'path';
import fs from 'fs';
import {tryCreate} from 'razomy.fs/directory/try_create';
import {VrdOrValue} from 'razomy.vrd/vrd';
import {isVrd} from 'razomy.vrd/is_vrd';

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


