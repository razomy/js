import {if_main} from 'razomy.main';
import {rename_variables_and_props_functions} from 'razomy/languages/programming/typescript/refactor/project/rename_variables_and_props_functions';
import {
  convert_lambdas_to_named_functions
} from 'razomy/languages/programming/typescript/refactor/project/convert_lambdas_to_named_functions';


export async function run() {
  await rename_variables_and_props_functions();
  await convert_lambdas_to_named_functions();
  // build_packages_recursive.ts
  // create_index.ts
  // create_package.ts
  // rename_files.ts
  // rename_imports.ts
  // split_functions.ts
}

if_main(import.meta.url || module.path, run).then()
