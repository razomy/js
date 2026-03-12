import * as path from 'path';
import { getAll } from './get_all';
import * as fsFile from "@razomy/fs-file";

export function createRoot(projectPath: string) {
  const rootDir: string = path.resolve(projectPath);
  const packages = getAll(projectPath);

  const packageFile = fsFile.getJson(path.join(rootDir, 'package.json'));
  packageFile.workspaces = packages.map((folder) => './' + folder.name);
  // packageFile.peerDependencies = Object.fromEntries(
  //     packages.map(folder => [folder.name.replaceAll('/', '.'), './' + folder.name])
  //   );
  fsFile.setJson(path.join(rootDir, 'package.json'), packageFile, true);

  // const tsFile = getJson(path.join(rootDir, 'tsconfig.json'));
  // tsFile.compilerOptions.paths = Object.fromEntries(
  //   flat(
  //     packages.map(folder => [
  //       [folder.name.replaceAll('/', '.'), ['./' + folder.name + '/index.ts']],
  //       [folder.name.replaceAll('/', '.') + '/*', ['./' + folder.name + '/*']]
  //     ]),
  //   ).reverse()
  // );
  // setJson(path.join(rootDir, 'tsconfig.json'), tsFile, true)
}
