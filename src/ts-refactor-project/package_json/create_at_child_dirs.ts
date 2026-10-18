import * as fs from 'fs';
import * as path from 'path';
import * as fsFile from '@razomy/fs-file';
import * as fsDirectory from '@razomy/fs-directory';

export function createAtChildDirs(projectPath: string, scopeName:string) {
  const rootDir: string = path.resolve(projectPath);
  const folders = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter((dirent: fs.Dirent) => dirent.isDirectory());
  folders.forEach((folder: fs.Dirent) => {
    if (folder.name.startsWith('_')) {
      return;
    }
    const pkgPath = path.join(rootDir, folder.name, 'package.json');
    const scope = scopeName;
    const newName = `${scope}/${folder.name}`;

    let pkgData = {
      name: newName,
    };

    const content = fsFile.tryGetJson(pkgPath) || {};
    pkgData = { ...content, ...pkgData };

    const contentF = JSON.stringify(pkgData, null, 2) + '\n';
    if (fsFile.tryGetSync(pkgPath, 'utf-8') === contentF) {
      return;
    }
    fs.writeFileSync(pkgPath, contentF);
    console.log(`✓ Create: ${folder.name} -> ${newName}`);
  });
}
