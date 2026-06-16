import * as string from '@razomy/string';

/**
 * @summary Interface defining an object structure containing a string property.
 * @description Interface defining an object structure containing a string property.
 * @property string The string instance.
 * @example
 * ```ts
 * // Object literal implementation
 * const item: HasString = {
 *   string: "example"
 * };
 * ```
 * @example
 * ```ts
 * // Class implementation
 * class TextContainer implements HasString {
 *   constructor(public string: String) {}
 * }
 * ```
 * @example
 * ```ts
 * // Function parameter usage
 * function processText(entity: HasString): void {
 *   console.log(entity.string);
 * }
 * ```
 * @complexity time O(n)
 * @complexity memory O(n)
 */
export interface HasString {
  string: string.String;
}
