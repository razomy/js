import {ifMain} from '@razomy/main';
import {convertLambdasToNamedFunctions} from './convert_lambdas_to_named_functions';
import {createIndexFiles} from './create_index_files';
import {createPackage} from './create_package';
import {renameFiles} from './rename_files';
import {splitFunctions} from '../ts.refactor';
import {iterateSourceFilesAndSave} from '../ts.refactor';
import {addDependencies} from './add_dependencies';
import {updatePackages} from './update_packages';
import {renameFileBasedOnFirstChild} from '../ts.refactor';
import {createPackageJsonAtChildDirs} from './create_package_json_at_child_dirs';
import {fileRenameVariablesAndPropsFunctions} from '../ts.refactor';
import {fixBrokenImportsAndExports} from './fix_broken_imports_and_exports';

export async function formatProject(projectPath: string, prefix: string) {
  console.info('renameFiles.start');
  await renameFiles(projectPath);
  console.info('iterateSourceFilesAndSave.start');
  await iterateSourceFilesAndSave(projectPath, renameFileBasedOnFirstChild);
  console.info('createPackageJsonAtChildDirs.start');
  await createPackageJsonAtChildDirs(projectPath + prefix + '/', prefix);
  console.info('createPackage.start');
  await createPackage(projectPath);
  console.info('addDependencies.start');
  await addDependencies(projectPath, prefix);
  console.info('fixBrokenImportsAndExports.start');
  await fixBrokenImportsAndExports(projectPath);
  console.info('createIndexFiles.start');
  await createIndexFiles(projectPath);
  console.info('updatePackages.start');
  await updatePackages(projectPath, prefix);
  console.info('iterateSourceFilesAndSave.start');
  await iterateSourceFilesAndSave(projectPath, splitFunctions);
  console.info('convertLambdasToNamedFunctions.start');
  await convertLambdasToNamedFunctions(projectPath);
  console.info('iterateSourceFilesAndSave.start');
  await iterateSourceFilesAndSave(projectPath, fileRenameVariablesAndPropsFunctions);
}

ifMain(import.meta.url || module.path, () => formatProject('../../', 'razomy')).then()
