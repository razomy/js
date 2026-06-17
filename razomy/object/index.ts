// Imports
import type { Constructor } from './constructor_';
import type { IObject, IObjectConstructor } from './i_object';
import { isClassConstructor } from './is_class_constructor';
import { isObject } from './is_object';
import { ObjectExtended } from './object_extended';
import { objectToBytes } from './object_to_bytes';
import { objectToFormattedString } from './object_to_formatted_string';
import { toFormattedString } from './to_formatted_string';

// Named exports
export {
  ObjectExtended,
  isClassConstructor,
  isObject,
  objectToBytes,
  objectToFormattedString,
  toFormattedString
};
export type {
  Constructor,
  IObject,
  IObjectConstructor
};

// Default export
const object_ = {
  isClassConstructor,
  isObject,
  ObjectExtended,
  objectToBytes,
  objectToFormattedString,
  toFormattedString,
};


export default object_;
