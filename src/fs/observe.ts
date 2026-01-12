import {Observable} from "razomy/observable/observable";
import fs from 'fs';
import path from 'path';

function observe(dir_path: string) {
  return new Observable<string>((resolve) => {
    const watcher = fs.watch(dir_path, {recursive: true}, (eventname, filename) => {
      resolve(path.join(dir_path, filename!));
    })
    return () => watcher.close();
  })}

export default observe;
