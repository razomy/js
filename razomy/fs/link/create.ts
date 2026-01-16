import fs from 'fs';

export function create(link_path: string, new_target: string) {
  try {
    let type = 'file';
    try {
      if (fs.statSync(new_target).isDirectory()) {
        type = 'junction';
      }
    } catch (e) {
    }
    // fs.unlinkSync(linkPath);
    fs.symlinkSync(new_target, link_path, type as any);
    console.log(`Symlink created: '${link_path}' -> pointing to -> '${new_target}'`);

  } catch (err: any) {
    console.error(`Failed to set symlink: ${err.message}`);
  }
}

// setSymlink('./my-app-link', './builds/version-2');
