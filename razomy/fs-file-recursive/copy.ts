import {promises as fs} from 'fs';
import * as path from 'path';

export async function copy(source, target, excludedDirs: string[] = []) {
  const sourceStats = await fs.stat(source);

  if (sourceStats.isDirectory()) {
    await fs.mkdir(target, {recursive: true});

    const folderItems = await fs.readdir(source);

    for (const fileOrDir of folderItems) {
      if (fileOrDir.startsWith('.') || excludedDirs.includes(fileOrDir)) {
        continue; // Skip files starting with a dot or excluded directories
      }

      const sourcePath = path.join(source, fileOrDir);
      const targetPath = path.join(target, fileOrDir);

      await copy(sourcePath, targetPath, excludedDirs);
    }
  } else {
    await fs.mkdir(path.dirname(target), {recursive: true});
    await fs.copyFile(source, target);
  }
}

