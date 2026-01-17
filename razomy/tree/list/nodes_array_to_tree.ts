import {ListTree} from 'razomy.tree/list/list_tree';

export function nodesArrayToTree(nodes: string[], leafs: string[]) {
  let allItems = [
    ...nodes.map(value => ({value, children: []} as ListTree<string>)),
    ...leafs.map(value => ({value, children: []} as ListTree<string>))
  ];

  // 2. Sort alphabetically
  // This ensures 'src' comes before 'src/components'
  allItems.sort((a, b) => a.value.localeCompare(b.value));

  const root = [] as ListTree<string>[];
  const stack = [] as ListTree<string>[]; // Keeps track of the current parent chain

  for (const item of allItems) {
    // Unwind the stack:
    // Pop items from the stack until we find the parent of the current item.
    // We know it's a parent if current path starts with "parentPath/"
    while (stack.length > 0) {
      const activeParent = stack[stack.length - 1];

      // Check if 'item' is a child of 'activeParent'
      // We add '/' to ensure "image-2" is not treated as a child of "image"
      if (item.value.startsWith(activeParent.value)) {
        break; // Found the correct parent!
      }

      stack.pop(); // Not a child of this one, step back up
    }

    // Add to tree
    if (stack.length > 0) {
      // Add as child to the current active parent
      const parent = stack[stack.length - 1];
      parent.children.push(item);
    } else {
      // Stack is empty, so this is a top-level root item
      root.push(item);
    }

    // Push current item to stack (it might be a parent to the next items)
    stack.push(item);
  }

  return root;
}


