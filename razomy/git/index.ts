// Imports
import { commit } from './commit';
import { compareVersions } from './compare_versions';
import { findGitRoot } from './find_git_root';
import { getChangedFilesBetweenCommits } from './get_changed_files_between_commits';
import { getChangedFilesBetweenCommitsOrAll } from './get_changed_files_between_commits_or_all';
import type { FileChanges } from './get_changed_files_between_commits_or_all';
import { getCommitsHash } from './get_commits_hash';
import { getCommitsId } from './get_commits_id';
import { getLastCommitId } from './get_last_commit_id';
import { getRecursiveStatuses } from './get_recursive_statuses';
import { getStatus } from './get_status';
import type { Status } from './get_status';
import { getStatusFileChanges } from './get_status_file_changes';
import { getStatusSync } from './get_status_sync';
import { gitFileCommitsToCommitJsonFile } from './git_file_commits_to_commit_json_file';
import { gitFileToNewGitFile } from './git_file_to_new_git_file';
import { init } from './init';
import { initWithFile } from './init_with_file';
import { isStatusClean } from './is_status_clean';
import { parseStatus } from './parse_status';
import { parseStatusRef } from './parse_status_ref';
import { restore } from './restore';
import { restoreSpaces } from './restore_spaces';
import { statusFilesToFileChangesMut } from './status_files_to_file_changes_mut';
import { vcsCommitsToGitFile } from './vcs_commits_to_git_file';

// Named exports
export {
  commit,
  compareVersions,
  findGitRoot,
  getChangedFilesBetweenCommits,
  getChangedFilesBetweenCommitsOrAll,
  getCommitsHash,
  getCommitsId,
  getLastCommitId,
  getRecursiveStatuses,
  getStatus,
  getStatusFileChanges,
  getStatusSync,
  gitFileCommitsToCommitJsonFile,
  gitFileToNewGitFile,
  init,
  initWithFile,
  isStatusClean,
  parseStatus,
  parseStatusRef,
  restore,
  restoreSpaces,
  statusFilesToFileChangesMut,
  vcsCommitsToGitFile
};
export type {
  FileChanges,
  Status
};

// Default export
const git = {
  commit,
  compareVersions,
  findGitRoot,
  getChangedFilesBetweenCommits,
  getChangedFilesBetweenCommitsOrAll,
  getCommitsHash,
  getCommitsId,
  getLastCommitId,
  getRecursiveStatuses,
  getStatus,
  getStatusFileChanges,
  getStatusSync,
  gitFileCommitsToCommitJsonFile,
  gitFileToNewGitFile,
  init,
  initWithFile,
  isStatusClean,
  parseStatus,
  parseStatusRef,
  restore,
  restoreSpaces,
  statusFilesToFileChangesMut,
  vcsCommitsToGitFile,
};


export default git;
