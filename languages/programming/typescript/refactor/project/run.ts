import {if_main} from 'razomy.main';
import {
  rename_variables_and_props_functions
} from 'razomy.languages/programming/typescript/refactor/project/rename_variables_and_props_functions';
import {
  convert_lambdas_to_named_functions
} from 'razomy.languages/programming/typescript/refactor/project/convert_lambdas_to_named_functions';
import {create_index_files} from './create_index_files';
import {create_package } from './create_package';
import {rename_files} from './rename_files';
import {split_functions} from './split_functions';
import {iterate_source_files_and_save} from '../iterate_source_files_and_save';
import {add_dependencies} from './add_dependencies';
import {update_packages} from './update_packages';
import {rename_file_based_on_first_child} from './rename_file_based_on_first_child';


export async function run() {
  const project_path = '../../../../../';
  await rename_files(project_path);
  await iterate_source_files_and_save(project_path, rename_file_based_on_first_child);
  await create_package(project_path);
  await add_dependencies(project_path);
  await create_index_files(project_path);
  await update_packages(project_path);
  await iterate_source_files_and_save(project_path, split_functions);
  await convert_lambdas_to_named_functions(project_path);
  await rename_variables_and_props_functions(project_path);
}

if_main(import.meta.url || module.path, run).then()
