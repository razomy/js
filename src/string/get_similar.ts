import * as string from '@razomy/string';

export function getSimilar(str: string, items: any[]): string | null {
  let bestMatch: string | null = null;
  let bestSimilarity = 0;

  items.forEach((newItem) => {
    const similarity = string.similarity(str, newItem);
    if (similarity > bestSimilarity && similarity >= 0.5) {
      // Adjust threshold
      bestMatch = newItem;
      bestSimilarity = similarity;
    }
  });

  if (bestMatch) {
    return bestMatch;
  }
  return null;
}
