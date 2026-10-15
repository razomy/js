import fs from 'fs';
import * as path from 'path';
import * as abstractions from "@razomy/abstractions";

export function observe(dirPath: string): abstractions.patterns.IObservableFactory<string> {
  return (resolve) => {
    const watcher = fs.watch(dirPath, { recursive: true }, (eventname, filename) => {
      resolve(path.join(dirPath, filename!));
    });
    return () => watcher.close();
  };
}
