import * as random from "@razomy/random";

/**
 * @summary Create a RFC4122-like GUID string.
 * @description Generates a 32-hex-character GUID formatted as `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.
 * @returns A randomly generated GUID string.
 * @example
 * ```ts
 * createGuid(); // => 'a3f1b2c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6'
 * ```
 * @example
 * ```ts
 * createGuid(); // => '1b4e28ba-2fa1-11d2-883f-b9a761bde3fb'
 * ```
 * @example
 * ```ts
 * const id = createGuid();
 * id.length; // => 36
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
export function createGuid(): string {
  function hex () : string { return (((random.createFloat() * 0x100000000) >>> 0).toString(16) + '00000000').slice(0, 8); }

  const a = hex();
  const b = hex();
  const c = hex();
  const d = hex();

  return (
    a +
    '-' +
    b.slice(0, 4) +
    '-' +
    b.slice(4, 8) +
    '-' +
    c.slice(0, 4) +
    '-' +
    c.slice(4, 8) +
    d
  );
}

export class GuidFactory {
  /**
   * @summary Factory class for creating GUID strings.
   * @description Implements a `create` method that delegates to `createGuid`.
   * @example
   * ```ts
   * const factory = new GuidFactory();
   * factory.create(); // => 'e4d909c2-90d0-fb47-c9f1-d0e612eac4c3'
   * ```
   * @example
   * ```ts
   * const factory = new GuidFactory();
   * factory.create() !== factory.create(); // => true
   * ```
   * @example
   * ```ts
   * const factory = new GuidFactory();
   * factory.create().length; // => 36
   * ```
   */
  public create(): string {
    return createGuid();
  }
}
