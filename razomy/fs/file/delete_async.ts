import fs from 'fs';

export async function deleteAsync(filePath: string) {
  return await fs.rmSync(filePath, {recursive: true, force: true});
}
