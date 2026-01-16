import {promises as fs} from 'fs';
import path from 'path';

export async function copy(source, target, excluded_dirs: string[] = []) {
  const source_stats = await fs.stat(source);

  if (source_stats.isDirectory()) {
    await fs.mkdir(target, {recursive: true});

    const folder_items = await fs.readdir(source);

    for (const file_or_dir of folder_items) {
      if (file_or_dir.startsWith('.') || excluded_dirs.includes(file_or_dir)) {
        continue; // Skip files starting with a dot or excluded directories
      }

      const source_path = path.join(source, file_or_dir);
      const target_path = path.join(target, file_or_dir);

      await copy(source_path, target_path, excluded_dirs);
    }
  } else {
    await fs.mkdir(path.dirname(target), {recursive: true});
    await fs.copyFile(source, target);
  }
}

