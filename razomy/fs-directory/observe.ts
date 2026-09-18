import fs from 'fs';
import * as path from 'path';
import * as abstracts from "@razomy/abstracts";

export function observe(dirPath: string): abstracts.patterns.IObservableFactory<string> {
  return (resolve) => {
    const watcher = fs.watch(dirPath, { recursive: true }, (eventname, filename) => {
      resolve(path.join(dirPath, filename!));
    });
    return () => watcher.close();
  };
}
