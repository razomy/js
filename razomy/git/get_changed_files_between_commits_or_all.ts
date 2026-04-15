import simpleGit from 'simple-git';
import * as git from "@razomy/git";

export interface FileChanges {
  created: string[];
  modified: string[];
  deleted: string[];
}

export async function getChangedFilesBetweenCommitsOrAll(
  repoPath: string,
  fromCommit: string | null,
  toCommit: string | null
): Promise<FileChanges> {
  if (!fromCommit || !toCommit) {
    const git = simpleGit(repoPath);
    const allFilesOutput = await git.raw(['ls-files']);
    return {
      created: allFilesOutput.trim().split(/\r?\n/).filter(Boolean),
      modified: [],
      deleted: [],
    }
  }
  return git.getChangedFilesBetweenCommits(
    repoPath,
    fromCommit,
    toCommit
  )
}
