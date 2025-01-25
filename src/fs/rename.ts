import fs from 'fs';

export function rename(a: string, b: string) {
  fs.renameSync(a, b)
}