import * as abstracts from "@razomy/abstracts";

/**
 * @summary Represents a dictionary collection.
 * @description A record type mapping string keys to values of type T.
 * @example
 * ```ts
 * const user: Dict<number> = { age: 30 };
 * ```
 * @example
 * ```ts
 * const config: Dict<string> = { theme: 'dark' };
 * ```
 * @example
 * ```ts
 * const scores: Dict<number[]> = { monday: [1, 2] };
 * ```
 */
export interface Dict<T> {
  [key: abstracts.structures.Key]: T;
}

export interface RecursiveDict<T = RecursiveDict<any>> extends Dict<T> {}
