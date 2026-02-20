import type {AllAutofill, AllSpecific} from './common';
import type {AllPrimitive} from './primitives';
import type {AllRecusive} from './recursives';

export type SchemaType<T = unknown> =
  | T
  | AllRecusive<T>
  | AllPrimitive
  | AllSpecific
  | AllAutofill;