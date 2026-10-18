import fs from "fs";

/**
 * Synchronously deletes a file or directory recursively.
 * @param {string} targetPath - The path to the file or directory to delete.
 */
export function delete_(targetPath) {
  try {
    // recursive: true deletes directories and their contents.
    // force: true ignores exceptions if the file/folder doesn't exist.
    fs.rmSync(targetPath, {recursive: true, force: true});
    console.log(`Successfully deleted: ${targetPath}`);
  } catch (error) {
    console.error(`Failed to delete ${targetPath}:`, error?.['message']);
    throw error;
  }
}



