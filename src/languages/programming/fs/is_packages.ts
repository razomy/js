import * as path from 'path';
import {PathString, Slug, WithPathString} from 'razomy.js/fs/pathString';
import {is_exist} from "razomy.js/fs/read";
import {ArgumentException} from "razomy.js/exceptions/argument_exception";

export const PYTHON_DEPENDENCIES = ['.venv'];
export const NODEJS_DEPENDENCIES = ['node_modules'];
export const UNITY_DEPENDENCIES = ['Library'];

export const KNOWN_DEPENDENCIES = [
  ...PYTHON_DEPENDENCIES,
  ...NODEJS_DEPENDENCIES,
  ...UNITY_DEPENDENCIES,
];

function getPathComponents(path_: string): string[] {
  return path_.split(path.sep).filter(component => component.length > 0);
}

export function isInPackages(path_: string): boolean {
  const pathComponents = getPathComponents(path_);
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
