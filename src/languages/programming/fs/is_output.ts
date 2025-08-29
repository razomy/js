import * as path from 'path';
import {Path} from "razomy.js/fs/path";
import {rename} from "razomy.js/fs/rename";

export const JS_OUTPUT = ['dist'];
export const JAVA_OUTPUT = ['out'];
export const PYTHON_OUTPUT = ['build'];
export const RUST_OUTPUT = ['target'];
export const RAZOMY_OUTPUT = ['_releases'];

export const KNOWN_OUTPUT = [
  ...JS_OUTPUT,
  ...JAVA_OUTPUT,
  ...PYTHON_OUTPUT,
  ...RUST_OUTPUT,
  ...RAZOMY_OUTPUT,
];

function getPathComponents(path_: string): string[] {
  return path_.split(path.sep).filter(component => component.length > 0);
}

export function isInOutput(path_: string): boolean {
  const pathComponents = getPathComponents(path_);

  return KNOWN_OUTPUT.some(outputDir => pathComponents.includes(outputDir));
}

export function renameSlugToRazomy(path_: Path) {
  const dir = path.dirname(path_);
  const res = path.join(dir, RAZOMY_OUTPUT[0]);
  rename(path_, res)
}
