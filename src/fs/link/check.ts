import fs from 'fs';

export function check(link_path: string) {
  if (fs.existsSync(link_path)) {
    const stats = fs.lstatSync(link_path);

    if (!stats.isSymbolicLink()) {
      throw new Error(`Path '${link_path}' exists but is NOT a symlink. Aborting to prevent data loss.`);
    }

    fs.unlinkSync(link_path);
    console.debug(`Removed old symlink at: ${link_path}`);
  }
}