import type { AllAutofill, AllSpecific } from './common';

export type SchemaType<T = unknown> = T | AllSpecific | AllAutofill;
