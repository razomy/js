import {get_status_sync} from 'razomy.js/git/get_status';
import {SourcePathString} from 'src/fs/path/pathString';
import {is_with_git} from 'razomy.js/languages/programming/fs/is_packages';
import path from 'path';

export function get_recursive_status(source_path: SourcePathString) {
  const repos: string[] = [];
  const files: string[] = [];
  const paths = [path.join(source_path)]
  while (paths.length) {
    const path_ = paths.pop()!
    if (is_with_git(path_)) {
      const status = get_status_sync(path_)
      const next_files = status.files.map(i => path.join(path_, i.path))
      paths.push(...next_files)
      repos.push(path_)
    } else {
      files.push(path_)
    }
  }
  return {files, repos};
}

// console.log(get_recursive_status('/Volumes/resource/resource/').repos.join("\n"));

