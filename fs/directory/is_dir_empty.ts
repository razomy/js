import fs from 'fs';

export function is_dir_empty(dir_path: string) {
  const files = fs.readdirSync(dir_path);
  return files.length === 0;
}
