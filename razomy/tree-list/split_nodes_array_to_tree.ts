import {ListTree} from '@razomy/tree-list';


export function splitNodesArrayToTree(nodes: string[], leafs: string[]) {
  // We use a virtual root to simplify traversal logic
  const root: ListTree<string> = {value: 'root', children: []};

  // Helper to process a single path
  function addPathToTree(path: string) {
    // Split path by slash, remove empty segments (e.g., caused by leading slash)
    const parts = path.split('/').filter(part => part.length > 0);

    let currentLevel = root;

    parts.forEach((part, index) => {
      const isLastPart = index === parts.length - 1;

      // Check if this part already exists in the current level's children
      let existingNode = currentLevel.children.find(child => child.value === part);

      if (existingNode) {
        // If it exists, just move deeper
        currentLevel = existingNode;
      } else {
        const newNode: ListTree<string> = {
          value: part,
          children: []
        };

        currentLevel.children.push(newNode);
        currentLevel = newNode;
      }
    });
  }

  // 1. Process folders (nodes) first to ensure structure exists
  nodes.forEach(path => addPathToTree(path));

  // 2. Process files (leafs)
  leafs.forEach(path => addPathToTree(path));

  return root.children;
}


