/**
 * Checks if string ends with any of the given target strings.
 * @param text The string to inspect.
 * @param targets The array of strings to search for.
 * @param position The position to search up to.
 * @returns Returns true if string ends with any of the targets, else false.
 * @example
 * ```ts
 * isEndsWithAny('image.jpg', ['.jpg', '.png']); // => true
 * ```
 * @example
 * ```ts
 * isEndsWithAny('image.gif', ['.jpg', '.png']); // => false
 * ```
 * @example
 * ```ts
 * isEndsWithAny('abc', ['a', 'b'], 2); // => true
 * ```
 */
export function isEndsWithAny(text: string, targets: string[], position?: number): boolean {
  return targets.some((target) => text.endsWith(target, position));
}
