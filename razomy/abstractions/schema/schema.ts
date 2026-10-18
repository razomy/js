import * as abstractions from '@razomy/abstractions';

export type SchemaType<T = unknown> = T | abstractions.schema.AllSpecific | abstractions.schema.AllAutofill;
