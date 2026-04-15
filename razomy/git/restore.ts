import { execSync } from 'node:child_process';
import * as treeList from '@razomy/tree-list';
import * as abstracts from '@razomy/abstracts';
import * as git from "@razomy/git";

export function restore(sourcePath: abstracts.graphs.SourcePathString) {
  const { files, repos } = git.getRecursiveStatuses(sourcePath);
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
