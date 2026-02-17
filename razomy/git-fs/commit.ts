import {getRecursiveStatus} from './get_recursive_status';
import {nodesArrayToTree} from '@razomy/tree-list';
import {iterateReverse} from '@razomy/tree-list';
import {execSync} from 'node:child_process';
import {SourcePathString} from '@razomy/path-string';

export function commit(sourcePath: SourcePathString) {
  const {files, repos} = getRecursiveStatus(sourcePath)
  const tree = nodesArrayToTree(repos, files);
  iterateReverse(tree[0], (node) => {
    if (node.children.length !== 0) {
      const commitCommand = `git add . && git commit -m "update"`;
      execSync(commitCommand, {cwd: node.value});
    }
  })
}

// commit('/Volumes/resource/resource/')