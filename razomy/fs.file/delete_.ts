import fs from 'fs';

export async function delete_(filePath: string) {
  return await fs.rmSync(filePath, {recursive: true, force: true});
}