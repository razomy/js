import {get_recursive_status} from 'razomy.js/git/fs/get_status';
import {nodes_array_to_tree} from 'razomy.js/trees/list/nodes_array_to_tree';
import {iterate_reverse} from 'razomy.js/trees/list/iterate';
import {tryAsync} from 'razomy.js/async/promise';
import {executeAsync} from 'razomy.js/shell/executeAsync';
import {execSync} from 'node:child_process';
import {SourcePathString} from 'razomy.js/fs/pathString';

function commit(source_path: SourcePathString) {
  const {files, repos} = get_recursive_status(source_path)
  const tree = nodes_array_to_tree(repos, files);
  iterate_reverse(tree[0], (node)=>{
    if(node.children.length !== 0){
      const commitCommand = `git add . && git commit -m "update"`;
      execSync(commitCommand, {cwd: node.value});
    }
  })
}

// commit('/Volumes/resource/resource/')