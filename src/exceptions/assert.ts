/**
 * @summary Asserts that a condition is true, throwing an error if it is false.
 * @description Evaluates a boolean condition. If the condition evaluates to false, it throws an Error with the provided message. This function is typically used for invariant checking, validating input, and ensuring expected program states at runtime.
 * @param condition The boolean condition to evaluate.
 * @param message The error message to throw if the condition is false. Defaults to 'Assertion failed'.
 * @throws {Error} Throws an Error if the condition evaluates to false.
 * @returns void
 * @example
 * ```ts
 * assert(2 + 2 === 4);
 * // => void (execution continues normally)
 * ```
 * @example
 * ```ts
 * assert(typeof 'hello' === 'number', 'Value must be a number');
 * // => throws Error: "Value must be a number"
 * ```
 * @example
 * ```ts
 * const user = getUser();
 * assert(user !== null, 'User cannot be null');
 * // => throws Error: "User cannot be null" if user is null
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function assert(condition: boolean, message = 'Assertion failed') {
  if (!condition) {
    throw new Error(message);
  }
}
