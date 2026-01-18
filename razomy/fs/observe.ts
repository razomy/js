import {Observable} from 'razomy.observable';
import fs from 'fs';
import path from 'path';

export function observe(dirPath: string) {
  return new Observable<string>((resolve) => {
    const watcher = fs.watch(dirPath, {recursive: true}, (eventname, filename) => {
      resolve(path.join(dirPath, filename!));
    })
    return () => watcher.close();
  })
}


