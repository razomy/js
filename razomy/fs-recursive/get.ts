import { type Dirent, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import * as abstracts from '@razomy/abstracts';

/**
 * Recursively scans a directory and yields absolute file paths using a synchronous generator.
 *
 * @remarks
 * This function uses `readdirSync` with `withFileTypes: true` to distinguish between
 * files and directories efficiently. It traverses subdirectories automatically.
 *
 * @param dir - The absolute or relative path to the directory to scan.
 * @returns A synchronous generator that yields the absolute path of each file found.
 *
 * @example
 * ```ts
 * // Example 1: Iterate through files one by one (memory efficient)
 * for (const filePath of get('./src')) {
 *   if (filePath.endsWith('.ts')) {
 *     console.log('Found TypeScript file:', filePath);
 *   }
 * }
 * ```
 * @example
 * ```ts
 * // Example 2: Convert to a standard Array
 * const allImages = Array.from(get('./public/images'));
 * console.log(`Found ${allImages.length} images`);
 * ```
 * @example
 * ```ts
 * // Example 3: Spread syntax (equivalent to Array.from)
 * const [...files] = get('./dist');
 * ```
 */
export function* get(dir: abstracts.graphs.DirPathString): Generator<abstracts.graphs.FilePathString, void, void> {
  const dirents: Dirent[] = readdirSync(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const res: string = resolve(dir, dirent.name);

    if (dirent.isDirectory()) {
      yield* get(res);
    } else {
      yield res as abstracts.graphs.FilePathString;
    }
  }
}
