import fs from 'fs';

export default function read(file_path) {
  return fs.readFileSync(file_path, 'utf8');
}
