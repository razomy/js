import {pythonRuntime} from './python';
import {nodeRuntime} from './node';
import {rustRuntime} from './rust';
import {javaRuntime} from './java';
import type {RuntimeProvider} from "./types";

export const defaultPackage = {
  packageName: "@razomy/string-case",
  runtimeName: "node",
};

export const RuntimeRegistry: Record<string, RuntimeProvider> = {
  python: pythonRuntime,
  node: nodeRuntime,
  rust: rustRuntime,
  java: javaRuntime,
};
