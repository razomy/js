import * as fs from 'fs';
import path from 'path';
import {file} from 'razomy.fs';

export function createPackageJsonAtChildDirs(projectPath: string) {
  const rootDir: string = path.resolve(projectPath);
  const prefix: string = 'razomy';
  const folders = fs.readdirSync(rootDir, {withFileTypes: true})
    .filter((dirent: fs.Dirent) => dirent.isDirectory());
  folders.forEach((folder: fs.Dirent) => {
    const pkgPath = path.join(rootDir, folder.name, 'package.json');
    const newName = `${prefix}.${folder.name}`;

    let pkgData = {
      name: newName,
    };

    const content = file.tryGetJson(pkgPath) || {};
    pkgData = {...content, ...pkgData};

    fs.writeFileSync(pkgPath, JSON.stringify(pkgData, null, 2));
    console.log(`✓ Create: ${folder.name} -> ${newName}`);
  });
}
