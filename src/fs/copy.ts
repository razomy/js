import {promises as fs} from 'fs';
import path from 'path';

async function copyFilesRecursive(source, target, excludedDirs: string[] = []) {
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

      await copyFilesRecursive(sourcePath, targetPath, excludedDirs);
    }
  } else {
    await fs.mkdir(path.dirname(target), {recursive: true});
    await fs.copyFile(source, target);
  }
}

async function cli() {
  const [, , ...args] = process.argv;

  if (args.length < 2) {
    console.error('Source and target files/directories are required.');
    process.exit(1);
  }

  const [source, target, ...excludedDirs] = args;

  try {
    await copyFilesRecursive(path.resolve(source) + '', path.resolve(target) + '', excludedDirs);
    console.log('Files copied successfully.');
  } catch (error) {
    console.error('Error copying files:', error);
  }
}
