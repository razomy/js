import * as fs from 'fs';
import * as path from 'path';
import * as fsFile from '@razomy/fs-file';

export function createAtChildDirs(projectPath: string, prefix) {
  const rootDir: string = path.resolve(projectPath);
  const folders = fs.readdirSync(rootDir, { withFileTypes: true }).filter((dirent: fs.Dirent) => dirent.isDirectory());
  folders.forEach((folder: fs.Dirent) => {
    if (folder.name.startsWith('_')) {
      return;
    }
    const pkgPath = path.join(rootDir, folder.name, 'package.json');
    const scope = '@' + prefix;
    const newName = `${scope}/${folder.name}`;

    let pkgData = {
      name: newName,
    };

    const content = fsFile.tryGetJson(pkgPath) || {};
    pkgData = { ...content, ...pkgData };

    const contentF = JSON.stringify(pkgData, null, 2) + '\n';
    if (fs.readFileSync(pkgPath, 'utf-8') === contentF) {
      return;
    }
    fs.writeFileSync(pkgPath, contentF);
    console.log(`✓ Create: ${folder.name} -> ${newName}`);
  });
}
