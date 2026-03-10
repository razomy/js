import type { RecursiveDict } from '@razomy/dict';
import { isObject } from '@razomy/object';

export type DiffCreated = { type: 'CREATED'; newValue: any };
export type DiffDeleted = { type: 'DELETED'; oldValue: any };
export type DiffUpdated = { type: 'UPDATED'; oldValue: any; newValue: any };
export type DiffNested = { type: 'NESTED_UPDATE'; children: DiffNode };

export type DiffEntry = DiffCreated | DiffDeleted | DiffUpdated | DiffNested;
export type DiffNode = Record<string, DiffEntry>;

export function getDetailedDiff(oldObj: RecursiveDict, newObj: RecursiveDict): DiffNode {
  const diff: DiffNode = {};

  // Get all unique keys from both objects
  const keys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  keys.forEach((key) => {
    const oldVal = oldObj[key];
    const newVal = newObj[key];

    // 1. If key exists in old but not new: DELETED
    if (key in oldObj && !(key in newObj)) {
      diff[key] = { type: 'DELETED', oldValue: oldVal };
    }
    // 2. If key exists in new but not old: CREATED
    else if (!(key in oldObj) && key in newObj) {
      diff[key] = { type: 'CREATED', newValue: newVal };
    }
    // 3. If both are objects: RECURSIVE CHECK
    else if (isObject(oldVal) && isObject(newVal)) {
      const nestedDiff = getDetailedDiff(oldVal, newVal);
      // Only add to result if there are actual changes inside
      if (Object.keys(nestedDiff).length > 0) {
        diff[key] = { type: 'NESTED_UPDATE', children: nestedDiff };
      }
    }
    // 4. If values are different (primitives): UPDATED
    else if (oldVal !== newVal) {
      // I uncommented this so the diff logic is complete
      diff[key] = { type: 'UPDATED', oldValue: oldVal, newValue: newVal };
    }
  });

  return diff;
}

// Re-assembled from diff entries
