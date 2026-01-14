import fs from 'fs';

export function read_file(file_path) {
  return fs.readFileSync(file_path, 'utf8');
}
