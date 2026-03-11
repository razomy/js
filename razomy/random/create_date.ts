/**
 * @summary Create a random date string within a year range.
 * @description Generates a random date between the start of `startYear` and the end of `endYear`,
 * returning it as a formatted string in `YYYY-MM-DD HH:mm:ss` format.
 * @param startYear The beginning year (inclusive). Defaults to `2000`.
 * @param endYear The ending year (inclusive). Defaults to `2026`.
 * @returns A formatted date string.
 * @example
 * ```ts
 * createDate(); // => e.g. '2015-07-23 14:05:32'
 * ```
 * @example
 * ```ts
 * createDate(2020, 2020); // => e.g. '2020-09-11 03:42:17'
 * ```
 * @example
 * ```ts
 * createDate(1990, 2000); // => e.g. '1994-02-08 21:30:44'
 * ```
 * @complexity time O(1)
 * @complexity memory O(1)
 */
import { createFloat } from './create_float';

export function createDate(startYear: number = 2000, endYear: number = 2026): string {
  const start: number = new Date(startYear, 0, 1).getTime();
  const end: number = new Date(endYear, 11, 31, 23, 59, 59, 999).getTime();
  const date: Date = new Date(start + createFloat() * (end - start));

  function pad(n: number): string {
    return n.toString().padStart(2, '0');
  }

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}`;
}
