/**
 * @summary A recursive dictionary type where values are themselves recursive dictionaries.
 * @description Defines a self-referencing dictionary interface where each key maps to another `DictRecursive`, enabling arbitrarily nested dictionary structures.
 * @example
 * ```ts
 * const tree: DictRecursive = { a: { b: { c: {} } } };
 * ```
 * @example
 * ```ts
 * const empty: DictRecursive = {};
 * ```
 * @example
 * ```ts
 * const nested: DictRecursive = { x: {}, y: { z: {} } };
 * ```
 */

import type { Dict } from '@razomy/dict';

export interface DictRecursive extends Dict<DictRecursive> {}
