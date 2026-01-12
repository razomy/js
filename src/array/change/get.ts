import {ChangeDifference, Difference, ReplaceDifference} from 'razomy/difference/difference';
import {get_similar} from 'razomy/array/change/get_similar';

export function get_string(oldArray: string[], newArray: string[]): ChangeDifference<string>[] {
  const new_set = new Set(newArray);
  const old_set = new Set(oldArray);

  // Identify new and deleted items
  const new_items = newArray.filter(item => !old_set.has(item));
  const deleted_items = oldArray.filter(item => !new_set.has(item));

  // Identify renamed items
  const renamed_items: ReplaceDifference<string>[] = [];
  const remaining_new_items = new Set(new_items);

  deleted_items.forEach(deletedItem => {
    let best_match: string | null = get_similar(deletedItem, renamed_items);

    if (best_match) {
      renamed_items.push({old_value: deletedItem, value: best_match, type: 'replace'});
      remaining_new_items.delete(best_match); // Avoid reusing the same match
    }
  });

  // Remove renamed items from new and deleted lists
  const final_new_items = new_items
    .filter(item => !renamed_items.some(pair => pair.value === item))
    .map(item => ({value: item, type: 'added'} as Difference<string>));
  const final_deleted_items = deleted_items
    .filter(item => !renamed_items.some(pair => pair.old_value === item))
    .map(item => ({value: item, type: 'removed'} as Difference<string>));
  return [
    ...final_new_items,
    ...final_deleted_items,
    ...renamed_items
  ];
}
