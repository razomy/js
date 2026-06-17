// Imports
import { convertLambdasToNamedFunctions } from './convert_lambdas_to_named_functions';
import { createIndexFiles } from './create_index_files';
import { fixBrokenImportsAndExports } from './fix_broken_imports_and_exports';
import { flattenPackages } from './flatten_packages';
import { formatProject } from './format_project';
import * as packageJson from './package_json';
import { renameFiles } from './rename_files';
import { replaceInjectImportWithDefaultImport } from './replace_inject_import_with_default_import';

// Named exports
export {
  convertLambdasToNamedFunctions,
  createIndexFiles,
  fixBrokenImportsAndExports,
  flattenPackages,
  formatProject,
  packageJson,
  renameFiles,
  replaceInjectImportWithDefaultImport
};

// Default export
const tsRefactorProject = {
  convertLambdasToNamedFunctions,
  createIndexFiles,
  fixBrokenImportsAndExports,
  flattenPackages,
  formatProject,
  packageJson,
  renameFiles,
  replaceInjectImportWithDefaultImport,
};

export default tsRefactorProject;
