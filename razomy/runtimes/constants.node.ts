import * as runtimesNode from '@razomy/runtimes/node';

export const DEFAULT_PACKAGE = {
  packageName: '@razomy/string-case',
  runtimeName: 'node',
};

export const RUNTIME_REGISTRY: Record<string, runtimesNode.RuntimeProvider> = {
  python: runtimesNode.PYTHON_RUNTIME,
  node: runtimesNode.NODE_RUNTIME,
  rust: runtimesNode.RUST_RUNTIME,
  java: runtimesNode.JAVA_RUNTIME,
};
