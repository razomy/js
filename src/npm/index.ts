// Imports
import { checkNotProvidedDependency } from './check_not_provided_dependency';
import { getPackageJsonVersion } from './get_package_json_version';
import { getPublishVersion } from './get_publish_version';
import { isPackageToUpdate } from './is_package_to_update';
import { printProjectPackage } from './print_project_package';
import { publish } from './publish';

// Named exports
export {
  checkNotProvidedDependency,
  getPackageJsonVersion,
  getPublishVersion,
  isPackageToUpdate,
  printProjectPackage,
  publish
};

// Default export
const npm = {
  checkNotProvidedDependency,
  getPackageJsonVersion,
  getPublishVersion,
  isPackageToUpdate,
  printProjectPackage,
  publish,
};

export default npm;
