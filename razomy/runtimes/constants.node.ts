import * as runtimes from '@razomy/runtimes/node';

export const DEFAULT_PACKAGE = {
  packageName: '@razomy/string-case',
  runtimeName: 'node',
};

export const RUNTIME_REGISTRY: Record<string, runtimes.RuntimeProvider> = {
  python: runtimes.PYTHON_RUNTIME,
  node: runtimes.NODE_RUNTIME,
  rust: runtimes.RUST_RUNTIME,
  java: runtimes.JAVA_RUNTIME,
};
