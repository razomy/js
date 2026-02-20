import * as fs from 'fs';
import * as path from 'path';
import {tryGetJson} from '@razomy/fs-file';

export function createAtChildDirs(projectPath: string, prefix) {
  const rootDir: string = path.resolve(projectPath);
  const folders = fs.readdirSync(rootDir, {withFileTypes: true})
    .filter((dirent: fs.Dirent) => dirent.isDirectory());
  folders.forEach((folder: fs.Dirent) => {
    const pkgPath = path.join(rootDir, folder.name, 'package.json');
    const scope = '@' + prefix
    const newName = `${scope}/${folder.name}`;

    let pkgData = {
      name: newName,
    };

    const content = tryGetJson(pkgPath) || {};
    pkgData = {...content, ...pkgData};

    fs.writeFileSync(pkgPath, JSON.stringify(pkgData, null, 2));
    console.log(`✓ Create: ${folder.name} -> ${newName}`);
  });
}
