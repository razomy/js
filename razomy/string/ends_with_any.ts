/**
 * Checks if string ends with any of the given target strings.
 * @param text The string to inspect.
 * @param targets The array of strings to search for.
 * @param position The position to search up to.
 * @returns Returns true if string ends with any of the targets, else false.
 * @example
 * ```ts
 * // => true
 * endsWithAny('image.jpg', ['.jpg', '.png']);
 * @example
 * ```ts
 * // => false
 * endsWithAny('image.gif', ['.jpg', '.png']);
 * @example
 * ```ts
 * // => true
 * endsWithAny('abc', ['a', 'b'], 2);
 */
export function endsWithAny(text: string, targets: string[], position?: number): boolean {
  return targets.some((target) => text.endsWith(target, position));
}
