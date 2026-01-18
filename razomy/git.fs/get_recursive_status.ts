import {getStatusSync} from 'razomy.git';
import {SourcePathString} from 'razomy.path.string';
import {isWithGit} from 'razomy.languages.programming.fs';
import path from 'path';

export function getRecursiveStatus(sourcePath: SourcePathString) {
  const repos: string[] = [];
  const files: string[] = [];
  const paths = [path.join(sourcePath)]
  while (paths.length) {
    const path_ = paths.pop()!
    if (isWithGit(path_)) {
      const status = getStatusSync(path_)
      const nextFiles = status.files.map(i => path.join(path_, i.path))
      paths.push(...nextFiles)
      repos.push(path_)
    } else {
      files.push(path_)
    }
  }
  return {files, repos};
}

// console.log(get_recursive_status('/Volumes/resource/resource/').repos.join("\n"));

