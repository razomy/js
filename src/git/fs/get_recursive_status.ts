import get_status_sync from 'razomy.git/get_status_sync';
import {SourcePathString} from 'razomy.path/string/path_string';
import is_with_git from 'src/languages/programming/fs/is_with_git';
import path from 'path';

export default function get_recursive_status(source_path: SourcePathString) {
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

