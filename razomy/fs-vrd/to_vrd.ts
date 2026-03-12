import fs from 'fs';
import * as path from 'path';
import * as exceptions from "@razomy/exceptions";
import * as vrd from "@razomy/vrd";

export function toVrd(directory: string, isSkip: (path) => boolean): vrd.VrdOrValue<Buffer> {
  const stat = fs.statSync(directory);

  if (stat.isFile()) {
    const data = fs.readFileSync(directory);
    return data;
  } else if (stat.isDirectory()) {
    let files: vrd.Vrd<Buffer> = new vrd.Vrd<Buffer>();
    const items = fs.readdirSync(directory);
    for (const item of items) {
      const itemPath = path.join(directory, item);
      if (isSkip(itemPath)) {
        continue;
      }
      files[item] = toVrd(itemPath, isSkip);
    }
    return files;
  } else {
    throw new exceptions.ArgumentException('unkown file type', directory);
  }
}
