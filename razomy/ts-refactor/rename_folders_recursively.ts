import path from 'path';

import fs from 'fs';

// Configuration

export function renameFoldersRecursively(currentDir: string) {
  let entries;

  try {
    // Get all items in the current directory
    entries = fs.readdirSync(currentDir, {withFileTypes: true});
  } catch (err: any) {
    console.error(`Skipping access to ${currentDir}: ${err.message}`);
    return;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const oldPath = path.join(currentDir, entry.name);

      // 1. RECURSION FIRST
      // We go deep into the folder *before* renaming the folder itself.
      // This prevents "path not found" errors.
      // renameFoldersRecursively(oldPath);

      // 2. CHECK AND RENAME
      // Check if folder name contains a dot
      if (entry.name.includes('.')) {

        // Replace ALL dots with dashes
        const newName = entry.name.replace(/\./g, '-');
        const newPath = path.join(currentDir, newName);

        // Prevent renaming if the name hasn't actually changed
        // or if destination already exists
        if (oldPath !== newPath) {
          if (fs.existsSync(newPath)) {
            console.warn(`Skipped: Cannot rename "${entry.name}" to "${newName}" because it already exists.`);
          } else {
            try {
              fs.renameSync(oldPath, newPath);
              console.log(`Renamed: ${oldPath} -> ${newPath}`);
            } catch (err: any) {
              console.error(`Error renaming ${entry.name}:`, err.message);
            }
          }
        }
      }
    }
  }
}

// const rootDirectory = '.'; // Start in current directory
// console.log('Starting to replace dots with dashes in folder names...');
// renameFoldersRecursively(rootDirectory);
// console.log('Process complete.');