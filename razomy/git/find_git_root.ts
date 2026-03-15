import { promises as fs } from "fs";
import * as path from "path";

/**
 * Recursively searches upwards for a directory containing a `.git` folder.
 *
 * @param startPath - The directory to start searching from (defaults to current working dir)
 * @returns A Promise resolving to the path containing `.git`, or null if not found.
 */
export async function findGitRoot(startPath: string = process.cwd()): Promise<string | null> {
    const currentPath = path.resolve(startPath);
    const targetPath = path.join(currentPath, '.git');
    try {
    // Check if .git exists in the current directory
    await fs.access(targetPath);
    return currentPath;
    } catch {
    // .git does not exist here, move to the parent directory
    const parentPath = path.dirname(currentPath);

    // Base case: If the parent path is the same as the current path, we hit the root (e.g., "/" or "C:\")
    if (parentPath === currentPath) {
      return null;
    }

    // Recursive call
    return findGitRoot(parentPath);
    }
}

// // --- Usage Example ---
// async function run() {
//   const gitRoot = await findGitRoot();
//   if (gitRoot) {
//     console.log('Found Git root at:', gitRoot);
//   } else {
//     console.log('No .git folder found in the directory tree.');
//   }
// }
// run();