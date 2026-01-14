import similarity from 'razomy.string/similarity';

export default function get_similar(str: string, items): string | null {
  let best_match: string | null = null;
  let best_similarity = 0;

  items.forEach(newItem => {
    const similarity_ = similarity(str, newItem);
    if (similarity_ > best_similarity && similarity_ >= 0.5) { // Adjust threshold
      best_match = newItem;
      best_similarity = similarity_;
    }
  });

  if (best_match) {
    return best_match;
  }
  return null;
}


