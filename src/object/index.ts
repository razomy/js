// Imports
import type { Constructor } from './constructor';
import { LATE_INIT } from './i_object';
import type { IObject, IObjectConstructor } from './i_object';
import { isClassConstructor } from './is_class_constructor';
import { isObject } from './is_object';
import { match } from './match';
import type { Match } from './match';
import { ObjectExtended } from './object_extended';
import { objectToBytes } from './object_to_bytes';
import { objectToFormattedString } from './object_to_formatted_string';
import { toFormattedString } from './to_formatted_string';

// Named exports
export {
  LATE_INIT,
  ObjectExtended,
  isClassConstructor,
  isObject,
  match,
  objectToBytes,
  objectToFormattedString,
  toFormattedString
};
export type {
  Constructor,
  IObject,
  IObjectConstructor,
  Match
};

// Default export
const object_ = {
  LATE_INIT,
  isClassConstructor,
  isObject,
  match,
  ObjectExtended,
  objectToBytes,
  objectToFormattedString,
  toFormattedString,
};


export default object_;
