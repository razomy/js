import * as path from 'path';
import {is_exist} from "src/fs/file/read";
import {ArgumentException} from "razomy/exceptions/argument_exception";
import {PathString, Slug, WithPathString} from 'razomy/path/string/path_string';

export const PYTHON_DEPENDENCIES = ['.venv'];
export const NODEJS_DEPENDENCIES = ['node_modules'];
export const UNITY_DEPENDENCIES = ['Library'];

export const KNOWN_DEPENDENCIES = [
  ...PYTHON_DEPENDENCIES,
  ...NODEJS_DEPENDENCIES,
  ...UNITY_DEPENDENCIES,
];

function get_path_components(path_: string): string[] {
  return path_.split(path.sep).filter(component => component.length > 0);
}

export function is_in_packages(path_: string): boolean {
  const pathComponents = get_path_components(path_);
  return KNOWN_DEPENDENCIES.some(depDir => pathComponents.includes(depDir));
}

export const GIT_SLUG = ".git";
export const MAC_DS_STORE_FILE = ".DS_Store";

export function is_mac_ds_store_key(slug: Slug) {
  return slug.endsWith(MAC_DS_STORE_FILE);
}

export class is_mac_ds_store_key_ArgumentException extends ArgumentException<WithPathString> {
  constructor(path: string) {
    super(is_mac_ds_store_key.name, {pathString: path});
  }
}

export function is_git_key(slug: Slug) {
  return slug === GIT_SLUG;
}

export function is_with_git(path_: PathString) {
  return is_exist(path.join(path_, GIT_SLUG))
}

export function is_without_git(path: PathString) {
  return !is_with_git(path)
}
