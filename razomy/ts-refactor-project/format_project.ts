import {ifMain} from '@razomy/main';
import {convertLambdasToNamedFunctions} from './convert_lambdas_to_named_functions';
import {createIndexFiles} from './create_index_files';
import {createRoot} from './package_json/create_root';
import {renameFiles} from './rename_files';
import {
  fileRenameVariablesAndPropsFunctions,
  iterateSourceFilesAndSave,
  renameFileBasedOnFirstChild,
  splitFunctions
} from '@razomy/ts-refactor';
import {addDependencies} from './package_json/add_dependencies';
import {updateByTemplate} from './package_json/update_by_template';
import {createAtChildDirs} from './package_json/create_at_child_dirs';
import {fixBrokenImportsAndExports} from './fix_broken_imports_and_exports';

export async function formatProject(projectPath: string, prefix: string) {
  console.info('renameFiles.start');
  await renameFiles(projectPath);
  console.info('iterateSourceFilesAndSave.start');
  await iterateSourceFilesAndSave(projectPath, renameFileBasedOnFirstChild);
  console.info('createPackageJsonAtChildDirs.start');
  await createAtChildDirs(projectPath + prefix + '/', prefix);
  console.info('createPackage.start');
  await createRoot(projectPath);
  console.info('addDependencies.start');
  await addDependencies(projectPath, prefix);
  console.info('fixBrokenImportsAndExports.start');
  await fixBrokenImportsAndExports(projectPath);
  console.info('createIndexFiles.start');
  await createIndexFiles(projectPath);
  console.info('updatePackages.start');
  await updateByTemplate(projectPath, prefix);
  console.info('iterateSourceFilesAndSave.start');
  await iterateSourceFilesAndSave(projectPath, splitFunctions);
  console.info('convertLambdasToNamedFunctions.start');
  await convertLambdasToNamedFunctions(projectPath);
  console.info('iterateSourceFilesAndSave.start');
  await iterateSourceFilesAndSave(projectPath, fileRenameVariablesAndPropsFunctions);
}

ifMain(import.meta.url || module.path, () => formatProject('../../', 'razomy')).then()
