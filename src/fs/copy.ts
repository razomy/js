import {promises as fs} from 'fs';
import path from 'path';

async function copy_files_recursive(source, target, excludedDirs: string[] = []) {
  const source_stats = await fs.stat(source);

  if (source_stats.isDirectory()) {
    await fs.mkdir(target, {recursive: true});

    const folder_items = await fs.readdir(source);

    for (const file_or_dir of folder_items) {
      if (file_or_dir.startsWith('.') || excludedDirs.includes(file_or_dir)) {
        continue; // Skip files starting with a dot or excluded directories
      }

      const source_path = path.join(source, file_or_dir);
      const target_path = path.join(target, file_or_dir);

      await copy_files_recursive(source_path, target_path, excludedDirs);
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

  const [source, target, ...excluded_dirs] = args;

  try {
    await copy_files_recursive(path.resolve(source) + '', path.resolve(target) + '', excluded_dirs);
    console.log('Files copied successfully.');
  } catch (error) {
    console.error('Error copying files:', error);
  }
}
