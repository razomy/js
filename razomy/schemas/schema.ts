import * as schemas from "@razomy/schemas";

export type SchemaType<T = unknown> = T | schemas.AllSpecific | schemas.AllAutofill;
