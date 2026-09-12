// Imports
import { AException } from './a_exception';
import { ArgumentException } from './argument_exception';
import { assert } from './assert';
import { assertUnreachable } from './assert_unreachable';
import { CancelException } from './cancel_exception';
import { CollectException } from './collect_exception';
import type { CatchFn } from './collect_exception';
import { MultipleException } from './multiple_exception';
import { NotImplementedException } from './not_implemented_exception';
import { NotSupportedException } from './not_supported_exception';
import { PathException } from './path_exception';
import { throwException } from './throw_exception';
import { UnknownTypeArgumentException } from './unknown_type_argument_exception';

// Named exports
export {
  AException,
  ArgumentException,
  CancelException,
  CollectException,
  MultipleException,
  NotImplementedException,
  NotSupportedException,
  PathException,
  UnknownTypeArgumentException,
  assert,
  assertUnreachable,
  throwException
};
export type {
  CatchFn
};

// Default export
const exceptions = {
  AException,
  ArgumentException,
  assert,
  assertUnreachable,
  CancelException,
  CollectException,
  MultipleException,
  NotImplementedException,
  NotSupportedException,
  PathException,
  throwException,
  UnknownTypeArgumentException,
};


export default exceptions;
