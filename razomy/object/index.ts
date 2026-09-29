// Imports
import type { Constructor } from './constructor_';
import type { IObject, IObjectConstructor } from './i_object';
import { isClassConstructor } from './is_class_constructor';
import { isObject } from './is_object';
import { ObjectExtended } from './object_extended';
import { objectToBytes } from './object_to_bytes';
import { objectToFormattedString } from './object_to_formatted_string';
import { switch_ } from './switch_';
import type { Switch } from './switch_';
import { toFormattedString } from './to_formatted_string';

// Named exports
export {
  ObjectExtended,
  isClassConstructor,
  isObject,
  objectToBytes,
  objectToFormattedString,
  switch_,
  toFormattedString
};
export type {
  Constructor,
  IObject,
  IObjectConstructor,
  Switch
};

// Default export
const object_ = {
  isClassConstructor,
  isObject,
  ObjectExtended,
  objectToBytes,
  objectToFormattedString,
  switch_,
  toFormattedString,
};


export default object_;
