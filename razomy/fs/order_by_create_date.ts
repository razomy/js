import path from 'path';
import fs from 'fs';

export function orderByCreateDate(directory: string, items: string[]) {
  return items
    .map(folder => {
      const fullFolderPath = path.join(directory, folder);
      const stats = fs.statSync(fullFolderPath);
      return {path: folder, ctimeMs: stats.ctimeMs}
    })
    .sort((a, b) => a.ctimeMs - b.ctimeMs)
    .map(i => i.path);
}