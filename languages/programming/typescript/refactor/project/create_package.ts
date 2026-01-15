import * as path from 'path';
import {read_file_json} from 'razomy.fs/file/read_file_json';
import {write_file_json} from 'razomy.fs/file/write_file_json';
import {if_main} from 'razomy.main';
import {get_all_package_jsons} from './get_all_package_jsons';
import {update_packages} from './update_packages';
import {add_dependencies} from './add_dependencies';

export function create_package() {
  const root_dir: string = path.join(__dirname, '../../../../../../');
  const packages = get_all_package_jsons();

  const package_file = read_file_json(root_dir + 'package.json');
  package_file.workspaces = packages.map(folder => 'src/' + folder.name)
  package_file.dependencies = Object.fromEntries(
    packages.map(folder => ['razomy.' + folder.name.replaceAll('/', '.'), './src/' + folder.name])
  );
  write_file_json(root_dir + 'package.json', package_file, true)

  const ts_file = read_file_json(root_dir + 'tsconfig.json');
  // ts_file.compilerOptions.paths = Object.fromEntries(
  //   packages.map(folder => ['razomy.' + folder.name.replaceAll('/', '.'), ['./src/' + folder.name]])
  // );
  // ts_file.compilerOptions.paths.razomy = ['./src']
  // ts_file.compilerOptions.paths['razomy/*'] = ['./src/*']
  write_file_json(root_dir + 'tsconfig.json', ts_file, true)
}

if_main(import.meta.url, add_dependencies).then();
if_main(import.meta.url, update_packages).then();
if_main(import.meta.url, create_package).then();

