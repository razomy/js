import * as fs from 'node:fs';
import path from 'node:path';

export async function cleanupExtractedStructure(destDir: string): Promise<void> {
  const items = await fs.promises.readdir(destDir);
  if (items.length === 1) {
    const rootItemPath = path.join(destDir, items[0]);
    const stat = await fs.promises.stat(rootItemPath);

    if (stat.isDirectory()) {
      const subItems = await fs.promises.readdir(rootItemPath);
      for (const subItem of subItems) {
        const oldPath = path.join(rootItemPath, subItem);
        const newPath = path.join(destDir, subItem);
        await fs.promises.rename(oldPath, newPath);
      }
      await fs.promises.rmdir(rootItemPath);
    }
  }
}
