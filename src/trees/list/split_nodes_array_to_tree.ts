import {ListTree} from 'razomy/trees/list/list_tree';


export function split_nodes_array_to_tree(nodes: string[], leafs: string[]) {
  // We use a virtual root to simplify traversal logic
  const root: ListTree<string> = {value: 'root', children: []};

  // Helper to process a single path
  const add_path_to_tree = (path: string) => {
    // Split path by slash, remove empty segments (e.g., caused by leading slash)
    const parts = path.split('/').filter(part => part.length > 0);

    let current_level = root;

    parts.forEach((part, index) => {
      const is_last_part = index === parts.length - 1;

      // Check if this part already exists in the current level's children
      let existing_node = current_level.children.find(child => child.value === part);

      if (existing_node) {
        // If it exists, just move deeper
        current_level = existing_node;
      } else {
        const new_node: ListTree<string> = {
          value: part,
          children: []
        };

        current_level.children.push(new_node);
        current_level = new_node;
      }
    });
  };

  // 1. Process folders (nodes) first to ensure structure exists
  nodes.forEach(path => add_path_to_tree(path));

  // 2. Process files (leafs)
  leafs.forEach(path => add_path_to_tree(path));

  return root.children;
}
