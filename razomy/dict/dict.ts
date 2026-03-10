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
export type DictKey = string;

export interface Dict<T> {
  [key: DictKey]: T;
}
