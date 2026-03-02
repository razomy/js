/**
 * Calculates the Levenshtein distance between two strings using the iterative approach with memory optimization.
 * @param {string} a The first string.
 * @param {string} b The second string.
 * @returns {number} The number of edits (insertions, deletions, or substitutions) required to transform one string into the other.
 * @example
 * ```ts
 * levenshteinDistance('kitten', 'sitting'); // => 3
 * ```
 * @example
 * ```ts
 * levenshteinDistance('test', 'text'); // => 1
 * ```
 * @example
 * ```ts
 * levenshteinDistance('razomy', 'razomy'); // => 0
 * ```
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) {
    return b.length;
  }

  if (b.length === 0) {
    return a.length;
  }

  if (a.length > b.length) {
    [a, b] = [b, a];
  }

  const row = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    let previousDiagonal = row[0];
    row[0] = i;

    for (let j = 1; j <= b.length; j++) {
      const currentDiagonal = row[j];

      if (a[i - 1] === b[j - 1]) {
        row[j] = previousDiagonal;
      } else {
        row[j] = 1 + Math.min(row[j - 1], row[j], previousDiagonal);
      }

      previousDiagonal = currentDiagonal;
    }
  }

  return row[b.length];
}
