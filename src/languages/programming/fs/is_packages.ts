import * as path from 'path';
import {Slug, WithPath} from "razomy.js/fs/path";
import {is_exist} from "razomy.js/fs/read";

export const PYTHON_DEPENDENCIES = ['venv'];
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

export function is_git_key(slug: Slug) {
  return slug === GIT_SLUG;
}

export function is_without_git(slug: Slug) {
  return !is_exist(path.join(slug, GIT_SLUG))
}
