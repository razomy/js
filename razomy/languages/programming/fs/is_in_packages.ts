import {knownDependencies} from './is_mac_ds_store_key_argument_exception';
import {isPackageGetPathComponents} from './is_package_get_path_components';

export function isInPackages(path: string): boolean {
  const pathComponents = isPackageGetPathComponents(path);
  return knownDependencies.some(depDir => pathComponents.includes(depDir));
}
