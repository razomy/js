import { execSync } from 'node:child_process';
import * as treeList from '@razomy/tree-list';
import * as abstractions from '@razomy/abstractions';
import * as git from '@razomy/git';

export function commit(sourcePath: abstractions.components.SourcePath) {
  const { files, repos } = git.getRecursiveStatuses(sourcePath);
  const tree = treeList.nodesArrayToTree(repos, files);
  treeList.iterateReverse(tree[0], (node) => {
    if (node.children.length !== 0) {
      const commitCommand = `git add . && git commit -m "update"`;
      execSync(commitCommand, { cwd: node.value });
    }
  });
}

// commit('/Volumes/resource/resource/')
