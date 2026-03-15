import simpleGit from "simple-git";
import {statusFilesToFileChangesMut} from './status_files_to_file_changes_mut';
import type {FileChanges} from './get_changed_files_between_commits_or_all';

/**
 * Compares two commits and returns a categorized list of changed files.
 *
 * @param repoPath - Path to the local git repository
 * @param fromCommit - The older commit hash
 * @param toCommit - The newer commit hash
 */
export async function getChangedFilesBetweenCommits(repoPath: string, fromCommit: string, toCommit: string): Promise<FileChanges> {
    if (fromCommit === toCommit) {
    return {
      created: [],
      modified: [],
      deleted: [],
    }
    }

    const git = simpleGit(repoPath);
    const diffOutput = await git.diff(['--name-status', fromCommit, toCommit]);
    const result: FileChanges = {
            created: [],
            modified: [],
            deleted: [],
          };
    if (!diffOutput.trim()) {
    return result; // No changes between commits
    }

    const lines = diffOutput.trim().split('\n');
    for (const line of lines) {
    statusFilesToFileChangesMut(result, line);
    }

    return result;
}
