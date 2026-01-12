import * as path from 'path';
import {PathString} from "razomy/path/string/path_string";
import rename from "razomy/fs/rename";

export const js_output = ['dist'];
export const java_output = ['out'];
export const python_output = ['build'];
export const nuxt_output = ['.output'];
export const rust_output = ['target'];
export const e2e_output = ['test-results'];
export const razomy_output = ['_releases'];
export const c_output = ['cmake-build-debug'];

export const known_output = [
  ...js_output,
  ...java_output,
  ...python_output,
  ...rust_output,
  ...razomy_output,
  ...nuxt_output,
  ...c_output,
  ...e2e_output,
];

function get_path_components(path_: string): string[] {
  return path_.split(path.sep).filter(component => component.length > 0);
}

export function is_in_output(path_: string): boolean {
  const path_components = get_path_components(path_);

  return known_output.some(outputDir => path_components.includes(outputDir));
}

export function rename_slug_to_razomy(path_: PathString) {
  const dir = path.dirname(path_);
  const res = path.join(dir, razomy_output[0]);
  rename(path_, res)
}
