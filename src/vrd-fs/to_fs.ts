import * as path from 'path';
import fs from 'fs';
import * as fsDirectory from '@razomy/fs-directory';
import * as vrd from '@razomy/vrd';

export function toFs(absolutePath: string, dict: vrd.VrdOrValue<Buffer>) {
  if (vrd.isVrd(dict)) {
    fsDirectory.tryCreate(absolutePath);
    for (const key in dict) {
      const branch = dict[key];
      const itemAbsolutePath = path.join(absolutePath, key);
      toFs(itemAbsolutePath, branch);
    }
  } else {
    fs.writeFileSync(absolutePath, dict);
  }
}
