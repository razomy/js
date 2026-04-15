import simpleGit from "simple-git";
import * as git_ from "@razomy/git";

/**
 * Compares two commits and returns a categorized list of changed files.
 *
 * @param repoPath - Path to the local git repository
 * @param fromCommit - The older commit hash
 * @param toCommit - The newer commit hash
 */
export async function getChangedFilesBetweenCommits(repoPath: string, fromCommit: string, toCommit: string): Promise<git_.FileChanges> {
    if (fromCommit === toCommit) {
    return {
      created: [],
      modified: [],
      deleted: [],
    }
    }

    const git = simpleGit(repoPath);
    const diffOutput = await git.diff(['--name-status', fromCommit, toCommit]);
    const result: git_.FileChanges = {
            created: [],
            modified: [],
            deleted: [],
          };
    if (!diffOutput.trim()) {
    return result; // No changes between commits
    }

    const lines = diffOutput.trim().split('\n');
    for (const line of lines) {
    git_.statusFilesToFileChangesMut(result, line);
    }

    return result;
}
