import path from 'path';
import {get_json} from 'razomy.fs/file/get_json';
import {set_json} from 'razomy.fs/file/set_json';
import {get_all_package_jsons} from './get_all_package_jsons';

export function create_package(project_path: string) {
  const root_dir: string = path.join(__dirname, project_path);
  const packages = get_all_package_jsons(project_path);

  const package_file = get_json(root_dir + 'package.json');
  package_file.workspaces = packages.map(folder => './' + folder.name)
  package_file.dependencies = Object.fromEntries(
    packages.map(folder => ['razomy.' + folder.name.replaceAll('/', '.'), './' + folder.name])
  );
  set_json(root_dir + 'package.json', package_file, true)

  const ts_file = get_json(root_dir + 'tsconfig.json');
  // ts_file.compilerOptions.paths = Object.fromEntries(
  //   packages.map(folder => ['razomy.' + folder.name.replaceAll('/', '.'), ['./src/' + folder.name]])
  // );
  // ts_file.compilerOptions.paths.razomy = ['./src']
  // ts_file.compilerOptions.paths['razomy/*'] = ['./src/*']
  set_json(root_dir + 'tsconfig.json', ts_file, true)
}


