/**
 * @summary A recursive dictionary type where values are themselves recursive dictionaries.
 * @description Defines a self-referencing dictionary interface where each key maps to another `RecursiveDict`, enabling arbitrarily nested dictionary structures.
 * @example
 * ```ts
 * const tree: RecursiveDict = { a: { b: { c: {} } } };
 * ```
 * @example
 * ```ts
 * const empty: RecursiveDict = {};
 * ```
 * @example
 * ```ts
 * const nested: RecursiveDict = { x: {}, y: { z: {} } };
 * ```
 */

import type { Dict } from '@razomy/dict';

export interface RecursiveDict extends Dict<RecursiveDict> {}
