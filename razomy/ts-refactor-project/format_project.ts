import { convertLambdasToNamedFunctions } from './convert_lambdas_to_named_functions';
import { createIndexFiles } from './create_index_files';
import * as packageJson from './package_json';
import { renameFiles } from './rename_files';
import { fixBrokenImportsAndExports } from './fix_broken_imports_and_exports';
import * as main from '@razomy/main';
import * as tsRefactor from '@razomy/ts-refactor';
import {replaceInjectImportWithDefaultImport} from './replace_inject_import_with_default_import';

export async function formatProject(projectPath: string, prefix: string) {
  console.info('splitFunctions.start');
  await tsRefactor.iterateSourceFilesAndSave(projectPath, tsRefactor.splitFunctions);
  console.info('renameFiles.start');
  await renameFiles(projectPath);
  console.info('renameFileBasedOnFirstChild.start');
  await tsRefactor.iterateSourceFilesAndSave(projectPath, tsRefactor.renameFileBasedOnFirstChild);
  console.info('convertLambdasToNamedFunctions.start');
  await convertLambdasToNamedFunctions(projectPath);
  console.info('fixBrokenImportsAndExports.start');
  await fixBrokenImportsAndExports(projectPath);
  console.info('replaceInjectImportWithDefaultImport.start');
  await replaceInjectImportWithDefaultImport(projectPath);
  console.info('fileRenameVariablesAndPropsFunctions.start');
  await tsRefactor.iterateSourceFilesAndSave(projectPath, tsRefactor.fileRenameVariablesAndPropsFunctions);
  console.info('createIndexFiles.start');
  await createIndexFiles(projectPath);
  console.info('createPackageJsonAtChildDirs.start');
  await packageJson.createAtChildDirs(projectPath + prefix + '/', prefix);
  console.info('createPackage.start');
  await packageJson.createRoot(projectPath);
  console.info('addDependencies.start');
  await packageJson.addDependencies(projectPath, prefix);
  console.info('updatePackages.start');
  await packageJson.updateByTemplate(projectPath, prefix);
}

main.ifMain(import.meta.url || module.path, () => formatProject('../../', 'razomy')).then();
