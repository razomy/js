import {ChangeDifference, Difference, ReplaceDifference} from "razomy.js/difference/difference";
import {similarity} from "razomy.js/string/similarity";

export function get_similar(str, items) {
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

export function get_string(oldArray: string[], newArray: string[]): ChangeDifference<string>[] {
  const newSet = new Set(newArray);
  const oldSet = new Set(oldArray);

  // Identify new and deleted items
  const newItems = newArray.filter(item => !oldSet.has(item));
  const deletedItems = oldArray.filter(item => !newSet.has(item));

  // Identify renamed items
  const renamedItems: ReplaceDifference<string>[] = [];
  const remainingNewItems = new Set(newItems);

  deletedItems.forEach(deletedItem => {
    let bestMatch: string | null = get_similar(deletedItem, renamedItems);

    if (bestMatch) {
      renamedItems.push({old_value: deletedItem, value: bestMatch, type: "replace"});
      remainingNewItems.delete(bestMatch); // Avoid reusing the same match
    }
  });

  // Remove renamed items from new and deleted lists
  const finalNewItems = newItems
    .filter(item => !renamedItems.some(pair => pair.value === item))
    .map(item => ({value: item, type: "added"} as Difference<string>));
  const finalDeletedItems = deletedItems
    .filter(item => !renamedItems.some(pair => pair.old_value === item))
    .map(item => ({value: item, type: "removed"} as Difference<string>));
  return [
    ...finalNewItems,
    ...finalDeletedItems,
    ...renamedItems
  ];
}
