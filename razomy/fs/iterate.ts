import fs, {Dirent} from 'fs';
import path from 'path';

export interface IterateNode {
  stats: Dirent;
  slug: string;
  path: string;
}

// 1. Pre-allocate the object we will pass to the callback.
// We recycle this SINGLE object for every file in the system.
export const sharedNode: IterateNode = {
  stats: null as unknown as Dirent,
  slug: '',
  path: '',
};

export function iterate(dirPath: string, cb: (iterate_node: IterateNode) => void | boolean) {
  // 2. Use a specific stack size if known, otherwise dynamic array
  const stack: string[] = [dirPath];

  // 3. Cache the OS separator (avoid looking it up repeatedly)
  const sep = path.sep;

  // 4. Hoist variables outside the loop to prevent closure allocation
  let currentPath: string | undefined;
  let entries: Dirent[];
  let i: number;
  let len: number;
  let entry: Dirent;
  let fullPath: string;
  let result: void | boolean;

  while ((currentPath = stack.pop())) {
    try {
      // 5. readdirSync is faster than opendirSync for raw throughput
      // because it crosses the C++ to JS boundary once per folder, not per file.
      entries = fs.readdirSync(currentPath, {withFileTypes: true});
    } catch (e) {
      continue; // Skip folders we don't have permission for
    }

    len = entries.length;

    // 6. Standard for loop is faster than for..of or .forEach
    for (i = 0; i < len; i++) {
      entry = entries[i];

      // 7. Manual string concatenation is ~4x faster than path.join
      // (path.join handles edge cases like '..' which we know don't exist here)
      fullPath = `${currentPath}${sep}${entry.name}`;

      // 8. MUTATE the shared object instead of creating a new one.
      // This saves millions of heap allocations.
      sharedNode.stats = entry;
      sharedNode.slug = entry.name;
      sharedNode.path = fullPath;

      result = cb(sharedNode);

      if (result === false) return; // Hard Stop
      if (result === true) continue; // Skip Recursion (Prune)

      if (entry.isDirectory()) {
        stack.push(fullPath);
      }
    }
  }
}


