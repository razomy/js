import { getRecursiveStatuses } from './get_recursive_statuses';
import { execSync } from 'node:child_process';
import * as treeList from '@razomy/tree-list';
import * as abstracts from '@razomy/abstracts';

export function restore(sourcePath: abstracts.graphs.SourcePathString) {
  const { files, repos } = getRecursiveStatuses(sourcePath);
  const tree = treeList.nodesArrayToTree(repos, files);
  treeList.iterateReverse(tree[0], (node) => {
    if (node.children.length !== 0) {
      for (const child of node.children) {
        const commitCommand = `git restore ` + child.value;
        execSync(commitCommand, { cwd: node.value });
      }
    }
  });
}

// restore('/Volumes/resource/resource/')
