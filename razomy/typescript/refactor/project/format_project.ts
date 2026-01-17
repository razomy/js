import {ifMain} from 'razomy.main';
import {convertLambdasToNamedFunctions} from './convert_lambdas_to_named_functions';
import {createIndexFiles} from './create_index_files';
import {createPackage} from './create_package';
import {renameFiles} from './rename_files';
import {splitFunctions} from '../split_functions';
import {iterateSourceFilesAndSave} from '../iterate_source_files_and_save';
import {addDependencies} from './add_dependencies';
import {updatePackages} from './update_packages';
import {renameFileBasedOnFirstChild} from '../rename_file_based_on_first_child';
import {createPackageJsonAtChildDirs} from './create_package_json_at_child_dirs';
import {fileRenameVariablesAndPropsFunctions} from '../file_rename_variables_and_props_functions';
import {fixBrokenImportsAndExports} from './fix_broken_imports_and_exports';

export async function formatProject(projectPath: string, prefix: string) {
  await renameFiles(projectPath);
  await iterateSourceFilesAndSave(projectPath, renameFileBasedOnFirstChild);
  await createPackageJsonAtChildDirs(projectPath + prefix + '/');
  await createPackage(projectPath);
  await addDependencies(projectPath);
  await fixBrokenImportsAndExports(projectPath);
  await createIndexFiles(projectPath);
  await updatePackages(projectPath);
  await iterateSourceFilesAndSave(projectPath, splitFunctions);
  await convertLambdasToNamedFunctions(projectPath);
  await iterateSourceFilesAndSave(projectPath, fileRenameVariablesAndPropsFunctions);
}

ifMain(import.meta.url || module.path, () => formatProject('../../../../', 'razomy')).then()
