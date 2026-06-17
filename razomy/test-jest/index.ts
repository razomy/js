// Imports
import { test } from './test';
import { tests } from './tests';
import type { FunctionSpec } from './tests';

// Named exports
export {
  test,
  tests
};
export type {
  FunctionSpec
};

// Default export
const testJest = {
  test,
  tests,
};


export default testJest;
