import {getRecursiveStatus} from './get_recursive_status';
import {iterateReverse, nodesArrayToTree} from '@razomy/tree-list';
import {execSync} from 'node:child_process';
import type {SourcePathString} from '@razomy/path-string';

export function restore(sourcePath: SourcePathString) {
  const {files, repos} = getRecursiveStatus(sourcePath)
  const tree = nodesArrayToTree(repos, files);
  iterateReverse(tree[0], (node) => {
    if (node.children.length !== 0) {
      for (let child of node.children) {
        const commitCommand = `git restore ` + child.value;
        execSync(commitCommand, {cwd: node.value});
      }
    }
  })
}

// restore('/Volumes/resource/resource/')
