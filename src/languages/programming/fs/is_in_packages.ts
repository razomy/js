import {known_dependencies} from './is_packages';
import {is_package_get_path_components} from './is_package_get_path_components';

export function is_in_packages(path_: string): boolean {
    const path_components = is_package_get_path_components(path_);
    return known_dependencies.some(depDir => path_components.includes(depDir));
}
