// Imports
import { createReadme } from './create_readme';
import { createReadmeAndSpecifications } from './create_readme_and_specifications';
import { fileRenameVariablesAndPropsFunctions } from './file_rename_variables_and_props_functions';
import { getExportedClasses } from './get_exported_classes';
import { getExportedConstants } from './get_exported_constants';
import { getExportedFunctions } from './get_exported_functions';
import { getExportedTypes } from './get_exported_types';
import { getFilteredSourceFiles } from './get_filtered_source_files';
import { getFirstLevelElementsTextFromSource } from './get_first_level_elements_text_from_source';
import { getNameAndExt } from './get_name_and_ext';
import { isNameTaken } from './is_name_taken';
import { iterateSourceFilesAndSave } from './iterate_source_files_and_save';
import type { IterateSourceFileState } from './iterate_source_files_and_save';
import { renameFileBasedOnFirstChild } from './rename_file_based_on_first_child';
import { renameFoldersRecursively } from './rename_folders_recursively';
import { renameNamespaceImport } from './rename_namespace_import';
import { renameNode } from './rename_node';
import { renameToSnakeCaseRecursiveTs } from './rename_to_snake_case_recursive_ts';
import { splitFunctions } from './split_functions';
import { toSafeFilename } from './to_safe_filename';
import { toSafeName } from './to_safe_name';

// Named exports
export {
  createReadme,
  createReadmeAndSpecifications,
  fileRenameVariablesAndPropsFunctions,
  getExportedClasses,
  getExportedConstants,
  getExportedFunctions,
  getExportedTypes,
  getFilteredSourceFiles,
  getFirstLevelElementsTextFromSource,
  getNameAndExt,
  isNameTaken,
  iterateSourceFilesAndSave,
  renameFileBasedOnFirstChild,
  renameFoldersRecursively,
  renameNamespaceImport,
  renameNode,
  renameToSnakeCaseRecursiveTs,
  splitFunctions,
  toSafeFilename,
  toSafeName
};
export type {
  IterateSourceFileState
};

// Default export
const tsRefactor = {
  createReadme,
  createReadmeAndSpecifications,
  fileRenameVariablesAndPropsFunctions,
  getExportedClasses,
  getExportedConstants,
  getExportedFunctions,
  getExportedTypes,
  getFilteredSourceFiles,
  getFirstLevelElementsTextFromSource,
  getNameAndExt,
  isNameTaken,
  iterateSourceFilesAndSave,
  renameFileBasedOnFirstChild,
  renameFoldersRecursively,
  renameNamespaceImport,
  renameNode,
  renameToSnakeCaseRecursiveTs,
  splitFunctions,
  toSafeFilename,
  toSafeName,
};


export default tsRefactor;
