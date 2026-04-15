import * as path from 'path';
import * as fsFile from '@razomy/fs-file';
import * as tsRefactorProject from "@razomy/ts-refactor-project";

export function createRoot(projectPath: string) {
  const rootDir: string = path.resolve(projectPath);
  const packages = tsRefactorProject.packageJson.getAll(projectPath);

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
