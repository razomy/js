/**
 * @summary Create a UUID v4 string.
 * @description Generates a cryptographically random UUID v4 string using the Web Crypto API.
 * @returns A UUID v4 string in the format `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.
 * @example
 * ```ts
 * createUuid(); // => 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d'
 * ```
 * @example
 * ```ts
 * createUuid(); // => '550e8400-e29b-41d4-a716-446655440000'
 * ```
 * @example
 * ```ts
 * const id = createUuid();
 * id.length; // => 36
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function createUuid(): string {
  return crypto.randomUUID();
}
