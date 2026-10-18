// Imports
import { andFalseThrow } from './and_false_throw';
import { ArgumentError, notEmpty } from './argument_error';
import { assertDeepEqual } from './assert_deep_equal';
import { emptyThrow } from './empty_throw';
import { falseThrow } from './false_throw';
import { matchesError } from './matches_error';
import { notZero } from './not_zero';
import { testSync } from './test_sync';
import { toStrictEqual } from './to_strict_equal';
import { toThrow } from './to_throw';

// Named exports
export {
  ArgumentError,
  andFalseThrow,
  assertDeepEqual,
  emptyThrow,
  falseThrow,
  matchesError,
  notEmpty,
  notZero,
  testSync,
  toStrictEqual,
  toThrow
};

// Default export
const test = {
  andFalseThrow,
  ArgumentError,
  notEmpty,
  assertDeepEqual,
  emptyThrow,
  falseThrow,
  matchesError,
  notZero,
  testSync,
  toStrictEqual,
  toThrow,
};

export default test;
