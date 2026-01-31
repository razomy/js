import * as path from 'path';
import {getJson} from 'razomy.fs.file';
import {setJson} from 'razomy.fs.file';
import {getAllPackageJsons} from './get_all_package_jsons';
import {flat} from 'razomy.array';

export function createPackage(projectPath: string) {
  const rootDir: string = path.resolve(projectPath);
  const packages = getAllPackageJsons(projectPath);

  const packageFile = getJson(path.join(rootDir, 'package.json'));
  packageFile.workspaces = packages.map(folder => './' + folder.name)
  // packageFile.peerDependencies = Object.fromEntries(
  //     packages.map(folder => [folder.name.replaceAll('/', '.'), './' + folder.name])
  //   );
  setJson(path.join(rootDir, 'package.json'), packageFile, true)

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


