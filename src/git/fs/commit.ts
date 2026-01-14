import get_recursive_status from './get_recursive_status';
import nodes_array_to_tree from 'razomy.trees/list/nodes_array_to_tree';
import iterate_reverse from 'razomy.trees/list/iterate_reverse';
import {execSync} from 'node:child_process';
import {SourcePathString} from 'razomy.path/string/path_string';

export default function commit(source_path: SourcePathString) {
  const {files, repos} = get_recursive_status(source_path)
  const tree = nodes_array_to_tree(repos, files);
  iterate_reverse(tree[0], (node)=>{
    if(node.children.length !== 0){
      const commit_command = `git add . && git commit -m "update"`;
      execSync(commit_command, {cwd: node.value});
    }
  })
}

// commit('/Volumes/resource/resource/')