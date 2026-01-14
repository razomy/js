import path from 'path';
import fs from 'fs';

export default function order_by_create_date(directory: string, items: string[]) {
  return items
    .map(folder => {
      const full_folder_path = path.join(directory, folder);
      const stats = fs.statSync(full_folder_path);
      return {path: folder, ctimeMs: stats.ctimeMs}
    })
    .sort((a, b) => a.ctimeMs - b.ctimeMs)
    .map(i => i.path);
}