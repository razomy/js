import fs from 'fs';

export function check(linkPath: string) {
  if (fs.existsSync(linkPath)) {
    const stats = fs.lstatSync(linkPath);

    if (!stats.isSymbolicLink()) {
      throw new Error(`Path '${linkPath}' exists but is NOT a symlink. Aborting to prevent data loss.`);
    }

    fs.unlinkSync(linkPath);
    console.debug(`Removed old symlink at: ${linkPath}`);
  }
}