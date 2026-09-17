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

  console.info('packageJson.createAtChildDirs.start');
  await tsRefactorProject.packageJson.createAtChildDirs(projectPath + prefix + '/', prefix);
  console.info('packageJson.createRoot.start');
  await tsRefactorProject.packageJson.createRoot(projectPath);
  console.info('packageJson.addDependencies.start');
  await tsRefactorProject.packageJson.addDependencies(projectPath, prefix);
  console.info('packageJson.updateByTemplate.start');
  await tsRefactorProject.packageJson.updateByTemplate(projectPath, prefix);
  console.info('generateAllExtensions.start');
  await tsRefactor.generateAllExtensions(
    projectPath,
    [
      {name: 'string', pkgType: 'string', targetObject: 'String', targetPrototype: 'String'},
      {name: 'string-case', pkgType: 'string', targetObject: 'String', targetPrototype: 'String'},
      {name: 'array', pkgType: 'array', targetObject: 'Array', targetPrototype: 'Array<T>'}
    ]
  );
}

main.ifMain(import.meta.url || module.path, () => formatProject('../../', 'razomy')).then();
