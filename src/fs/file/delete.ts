import fs from 'fs';

export default function delete_(file_path: string) {
  return fs.rmSync(file_path, {recursive: true, force: true});
}
