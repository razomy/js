import {known_dependencies} from './is_mac_ds_store_key_argument_exception';
import {is_package_get_path_components} from './is_package_get_path_components';

export function is_in_packages(path: string): boolean {
    const path_components = is_package_get_path_components(path);
    return known_dependencies.some(depDir => path_components.includes(depDir));
}
