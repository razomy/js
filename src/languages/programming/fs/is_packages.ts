import * as path from 'path';
import {is_exist} from "razomy/fs/file/read";
import {ArgumentException} from "razomy/exceptions/argument_exception";
import {PathString, Slug, WithPathString} from 'razomy/path/string/path_string';

export const python_dependencies = ['.venv'];
export const nodejs_dependencies = ['node_modules'];
export const unity_dependencies = ['Library'];

export const known_dependencies = [
  ...python_dependencies,
  ...nodejs_dependencies,
  ...unity_dependencies,
];

function get_path_components(path_: string): string[] {
  return path_.split(path.sep).filter(component => component.length > 0);
}

export function is_in_packages(path_: string): boolean {
  const path_components = get_path_components(path_);
  return known_dependencies.some(depDir => path_components.includes(depDir));
}

export const git_slug = ".git";
export const mac_ds_store_file = ".DS_Store";

export function is_mac_ds_store_key(slug: Slug) {
  return slug.endsWith(mac_ds_store_file);
}

export class is_mac_ds_store_key_ArgumentException extends ArgumentException<WithPathString> {
  constructor(path: string) {
    super(is_mac_ds_store_key.name, {path_string: path});
  }
}

export function is_git_key(slug: Slug) {
  return slug === git_slug;
}

export function is_with_git(path_: PathString) {
  return is_exist(path.join(path_, git_slug))
}

export function is_without_git(path: PathString) {
  return !is_with_git(path)
}
