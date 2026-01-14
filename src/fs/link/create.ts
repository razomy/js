import fs from 'fs';

export default function create(linkPath: string, newTarget: string) {
  try {
    let type = 'file';
    try {
      if (fs.statSync(newTarget).isDirectory()) {
        type = 'junction';
      }
    } catch (e) {
    }
    // fs.unlinkSync(linkPath);
    fs.symlinkSync(newTarget, linkPath, type as any);
    console.log(`Symlink created: '${linkPath}' -> pointing to -> '${newTarget}'`);

  } catch (err: any) {
    console.error(`Failed to set symlink: ${err.message}`);
  }
}

// setSymlink('./my-app-link', './builds/version-2');
