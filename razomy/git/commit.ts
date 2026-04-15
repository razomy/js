import {execSync} from 'node:child_process';
import * as treeList from '@razomy/tree-list';
import * as abstracts from '@razomy/abstracts';
import * as git from "@razomy/git";

export function commit(sourcePath: abstracts.graphs.SourcePathString) {
  const {files, repos} = git.getRecursiveStatuses(sourcePath);
  const tree = treeList.nodesArrayToTree(repos, files);
  treeList.iterateReverse(tree[0], (node) => {
    if (node.children.length !== 0) {
      const commitCommand = `git add . && git commit -m "update"`;
      execSync(commitCommand, {cwd: node.value});
    }
  });
}


// commit('/Volumes/resource/resource/')
