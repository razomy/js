import * as packageJson from './package_json';
import * as main from '@razomy/main';
import * as tsRefactor from '@razomy/ts-refactor';
import * as tsRefactorProject from '@razomy/ts-refactor-project';

export async function formatProject(projectPath: string, prefix: string) {
  console.info('splitFunctions.start');
  await tsRefactor.iterateSourceFilesAndSave(projectPath, tsRefactor.splitFunctions);
  console.info('renameFiles.start');
  await tsRefactorProject.renameFiles(projectPath);
  console.info('renameFileBasedOnFirstChild.start');
  await tsRefactor.iterateSourceFilesAndSave(projectPath, tsRefactor.renameFileBasedOnFirstChild);
  console.info('convertLambdasToNamedFunctions.start');
  await tsRefactorProject.convertLambdasToNamedFunctions(projectPath);
  console.info('fixBrokenImportsAndExports.start');
  await tsRefactorProject.fixBrokenImportsAndExports(projectPath);
  console.info('replaceInjectImportWithDefaultImport.start');
  await tsRefactorProject.replaceInjectImportWithDefaultImport(projectPath);
  console.info('fileRenameVariablesAndPropsFunctions.start');
  await tsRefactor.iterateSourceFilesAndSave(projectPath, tsRefactor.fileRenameVariablesAndPropsFunctions);
  console.info('createIndexFiles.start');
  await tsRefactorProject.createIndexFiles(projectPath);
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
