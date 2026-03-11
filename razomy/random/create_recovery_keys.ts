/**
 * @summary Create an array of recovery keys.
 * @description Generates a list of recovery keys, each composed of uppercase alphanumeric blocks separated by dashes.
 * @param count The number of recovery keys to generate.
 * @param blocks The number of blocks per key.
 * @param blockLength The number of characters per block.
 * @returns An array of recovery key strings.
 * @example
 * ```ts
 * createRecoveryKeys(1, 2, 3); // => ['A7K-9BZ']
 * ```
 * @example
 * ```ts
 * createRecoveryKeys(2); // => ['AXRF-K9B2-QLMZ-7TYP', 'JN3W-8DVE-0HCS-4FRA']
 * ```
 * @example
 * ```ts
 * createRecoveryKeys(3, 3, 5); // => ['AX7RF-K9BQ2-LMZTK', 'JN3W8-DVE0H-CS4FR', 'PL9YT-QWE3R-ZXC7V']
 * ```
 */
export function createRecoveryKeys(count: number = 10, blocks: number = 4, blockLength: number = 4): string[] {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const maxIndex = chars.length - 1;

  return Array.from({ length: count }, () =>
    Array.from({ length: blocks }, () =>
      Array.from({ length: blockLength }, () => chars[createInt(0, maxIndex)]).join(''),
    ).join('-'),
  );
}

import { createInt } from './create_int';
