import type {String} from '@razomy/string';

/**
 * Interface defining an object structure containing a string property.
 * @property {String} string The string instance.
 * @example
 * // Object literal implementation
 * const item: WithString = {
 *   string: "example"
 * };
 * @example
 * // Class implementation
 * class TextContainer implements WithString {
 *   constructor(public string: String) {}
 * }
 * @example
 * // Function parameter usage
 * function processText(entity: WithString): void {
 *   console.log(entity.string);
 * }
 */
export interface WithString {
  string: String;
}