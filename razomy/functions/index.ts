// Imports
import { f } from './f';
import { fMut } from './f_mut';
import type { Function } from './function_';
import { isFunction } from './is_function';

// Named exports
export {
  f,
  fMut,
  isFunction
};
export type {
  Function
};

// Default export
const functions = {
  f,
  fMut,
  isFunction,
};


export default functions;
