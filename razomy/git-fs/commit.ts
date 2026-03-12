import { getRecursiveStatus } from './get_recursive_status';
import { execSync } from 'node:child_process';
import * as treeList from '@razomy/tree-list';
import * as abstracts from '@razomy/abstracts';

export function commit(sourcePath: abstracts.graphs.SourcePathString) {
  const { files, repos } = getRecursiveStatus(sourcePath);
  const tree = treeList.nodesArrayToTree(repos, files);
  treeList.iterateReverse(tree[0], (node) => {
    if (node.children.length !== 0) {
      const commitCommand = `git add . && git commit -m "update"`;
      execSync(commitCommand, { cwd: node.value });
    }
  });
}

// commit('/Volumes/resource/resource/')
