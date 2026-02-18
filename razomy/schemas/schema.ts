import {AllAutofill, AllSpecific} from './common';
import {AllPrimitive} from './primitives';
import {AllRecusive} from './recursives';

export type SchemaType<T = unknown> =
  | T
  | AllRecusive<T>
  | AllPrimitive
  | AllSpecific
  | AllAutofill;