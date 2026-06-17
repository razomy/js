// Imports
import { checkNotProvidedDependency } from './check_not_provided_dependency';
import { printProjectPackage } from './print_project_package';
import { publish } from './publish';

// Named exports
export {
  checkNotProvidedDependency,
  printProjectPackage,
  publish
};

// Default export
const npm = {
  checkNotProvidedDependency,
  printProjectPackage,
  publish,
};

export default npm;
