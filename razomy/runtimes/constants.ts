import {PYTHON_RUNTIME} from './python';
import {NODE_RUNTIME} from './node';
import {RUST_RUNTIME} from './rust';
import {JAVA_RUNTIME} from './java';
import type {RuntimeProvider} from "./types";

export const DEFAULT_PACKAGE = {
  packageName: "@razomy/string-case",
  runtimeName: "node",
};

export const RUNTIME_REGISTRY: Record<string, RuntimeProvider> = {
  python: PYTHON_RUNTIME,
  node: NODE_RUNTIME,
  rust: RUST_RUNTIME,
  java: JAVA_RUNTIME,
};
