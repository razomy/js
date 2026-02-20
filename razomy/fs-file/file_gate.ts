import fs from 'fs';
import type {Gate} from '@razomy/gate';

export class FileGate<T extends string> implements Gate<T> {
  constructor(private readonly file_path: string) {
  }

  get(): T {
    if (fs.existsSync(this.file_path)) {
      return fs.readFileSync(this.file_path, 'utf-8') as T;
    }
    throw new Error('Unable to parse file data.');
  }

  set(state: T): void {
    fs.writeFileSync(this.file_path, state);
  }
}
