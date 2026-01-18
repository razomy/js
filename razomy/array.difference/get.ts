import {ChangeDifference, Difference, ReplaceDifference} from 'razomy.difference';
import {getSimilar} from 'razomy.array.difference';

export function get(oldArray: string[], newArray: string[]): ChangeDifference<string>[] {
  const newSet = new Set(newArray);
  const oldSet = new Set(oldArray);

  // Identify new and deleted items
  const newItems = newArray.filter(item => !oldSet.has(item));
  const deletedItems = oldArray.filter(item => !newSet.has(item));

  // Identify renamed items
  const renamedItems: ReplaceDifference<string>[] = [];
  const remainingNewItems = new Set(newItems);

  deletedItems.forEach(deletedItem => {
    let bestMatch: string | null = getSimilar(deletedItem, renamedItems);

    if (bestMatch) {
      renamedItems.push({oldValue: deletedItem, value: bestMatch, type: 'replace'});
      remainingNewItems.delete(bestMatch); // Avoid reusing the same match
    }
  });

  // Remove renamed items from new and deleted lists
  const finalNewItems = newItems
    .filter(item => !renamedItems.some(pair => pair.value === item))
    .map(item => ({value: item, type: 'added'} as Difference<string>));
  const finalDeletedItems = deletedItems
    .filter(item => !renamedItems.some(pair => pair.oldValue === item))
    .map(item => ({value: item, type: 'removed'} as Difference<string>));
  return [
    ...finalNewItems,
    ...finalDeletedItems,
    ...renamedItems
  ];
}


