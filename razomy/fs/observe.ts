import fs from 'fs';
import * as path from 'path';
import * as observable from "@razomy/observable";

export function observe(dirPath: string) {
  return new observable.Observable<string>((resolve) => {
    const watcher = fs.watch(dirPath, { recursive: true }, (eventname, filename) => {
      resolve(path.join(dirPath, filename!));
    });
    return () => watcher.close();
  });
}
