import {similarity} from 'razomy/string/similarity';

export function get_similar(str: string, items) {
  let bestMatch: string | null = null;
  let bestSimilarity = 0;

  items.forEach(newItem => {
    const similarity_ = similarity(str, newItem);
    if (similarity_ > bestSimilarity && similarity_ >= 0.5) { // Adjust threshold
      bestMatch = newItem;
      bestSimilarity = similarity_;
    }
  });

  if (bestMatch) {
    return bestMatch;
  }
  return null;
}