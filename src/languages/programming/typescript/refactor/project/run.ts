import {if_main} from 'razomy.main';
import {rename_variables_and_props_functions} from 'razomy.languages/programming/typescript/refactor/project/rename_variables_and_props_functions';
import {
  convert_lambdas_to_named_functions
} from 'razomy.languages/programming/typescript/refactor/project/convert_lambdas_to_named_functions';
import {create_index_files} from './create_index_files';
import {create_package} from './create_package';
import {rename_files} from './rename_files';


export async function run() {
  await rename_variables_and_props_functions();
  await convert_lambdas_to_named_functions();
  await create_index_files();
  await create_package();
  await rename_files();
  // build_packages_recursive.ts
  // split_functions.ts
}

if_main(import.meta.url || module.path, run).then()
