import * as path from 'path';
import * as git from "@razomy/git";
import * as abstracts from "@razomy/abstracts";
import * as languagesProgrammingFs from "@razomy/languages-programming-fs";

export function getRecursiveStatus(sourcePath: abstracts.graphs.SourcePathString) {
  const repos: string[] = [];
  const files: string[] = [];
  const paths = [path.join(sourcePath)];
  while (paths.length) {
    const path_ = paths.pop()!;
    if (languagesProgrammingFs.isWithGit(path_)) {
      const status = git.getStatusSync(path_);
      const nextFiles = status.files.map((i) => path.join(path_, i.path));
      paths.push(...nextFiles);
      repos.push(path_);
    } else {
      files.push(path_);
    }
  }
  return { files, repos };
}

// console.log(get_recursive_status('/Volumes/resource/resource/').repos.join("\n"));
