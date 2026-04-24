import fs from "fs";

/**
 * Synchronously moves a file or directory recursively to a new location.
 * @param {string} sourcePath - The path to the source file/directory.
 * @param {string} destPath - The path to the destination.
 */
export function move(sourcePath, destPath) {
  try {
    // Step 1: Attempt a simple rename (Fastest, works if on the same drive)
    try {
      fs.renameSync(sourcePath, destPath);
      console.log(`Successfully moved ${sourcePath} to ${destPath}`);
      return;
    } catch (error) {
      // If the error is NOT cross-device (EXDEV), throw it
      if (error?.['code'] !== 'EXDEV') {
        throw error;
      }
    }

    // Step 2: Fallback for cross-drive moves
    console.log(`Cross-device move detected. Copying and deleting...`);

    // Copy recursively
    fs.cpSync(sourcePath, destPath, {recursive: true});

    // Delete original recursively
    fs.rmSync(sourcePath, {recursive: true, force: true});

    console.log(`Successfully moved ${sourcePath} to ${destPath}`);
  } catch (error) {
    console.error(`Failed to move ${sourcePath}:`, error?.['message']);
    throw error;
  }
}
