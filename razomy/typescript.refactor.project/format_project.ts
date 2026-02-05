import {ifMain} from '@razomy/main';
import {convertLambdasToNamedFunctions} from './convert_lambdas_to_named_functions';
import {createIndexFiles} from './create_index_files';
import {createPackage} from './create_package';
import {renameFiles} from './rename_files';
import {splitFunctions} from '@razomy/typescript.refactor';
import {iterateSourceFilesAndSave} from '@razomy/typescript.refactor';
import {addDependencies} from './add_dependencies';
import {updatePackages} from './update_packages';
import {renameFileBasedOnFirstChild} from '@razomy/typescript.refactor';
import {createPackageJsonAtChildDirs} from './create_package_json_at_child_dirs';
import {fileRenameVariablesAndPropsFunctions} from '@razomy/typescript.refactor';
import {fixBrokenImportsAndExports} from './fix_broken_imports_and_exports';

export async function formatProject(projectPath: string, prefix: string) {
  await renameFiles(projectPath);
  await iterateSourceFilesAndSave(projectPath, renameFileBasedOnFirstChild);
  await createPackageJsonAtChildDirs(projectPath + prefix + '/', prefix);
  await createPackage(projectPath);
  await addDependencies(projectPath, prefix);
  await fixBrokenImportsAndExports(projectPath);
  await createIndexFiles(projectPath);
  await updatePackages(projectPath, prefix);
  await iterateSourceFilesAndSave(projectPath, splitFunctions);
  await convertLambdasToNamedFunctions(projectPath);
  await iterateSourceFilesAndSave(projectPath, fileRenameVariablesAndPropsFunctions);
}

ifMain(import.meta.url || module.path, () => formatProject('../../', 'razomy')).then()
