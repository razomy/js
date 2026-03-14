import simpleGit from 'simple-git';

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
  return getChangedFilesBetweenCommits(
    repoPath,
    fromCommit,
    toCommit
  )
}

/**
 * Compares two commits and returns a categorized list of changed files.
 *
 * @param repoPath - Path to the local git repository
 * @param fromCommit - The older commit hash
 * @param toCommit - The newer commit hash
 */
export async function getChangedFilesBetweenCommits(
  repoPath: string,
  fromCommit: string,
  toCommit: string
): Promise<FileChanges> {
  if (fromCommit === toCommit) {
    return {
      created: [],
      modified: [],
      deleted: [],
    }
  }

  const git = simpleGit(repoPath);
  // Use --name-status to get the files and their status flags
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

export function statusFilesToFileChangesMut(result: FileChanges, line) {
  const parts = line.split('\t');
  if (parts.length < 2) return;
  const statusFlag = parts[0][0]; // The first letter (A, M, D, R, C, etc.)
  const filePath = parts[1];
  switch (statusFlag) {
    case 'A': // Added
    case 'C': // Copied
      result.created.push(filePath);
      break;
    case 'M': // Modified
    case 'T': // Type changed
      result.modified.push(filePath);
      break;
    case 'D': // Deleted
      result.deleted.push(filePath);
      break;
    case 'R': // Renamed (Treat as: Deleted old file, Created new file)
      result.deleted.push(filePath); // Old filename is at parts[1]
      if (parts[2]) {
        result.created.push(parts[2]); // New filename is at parts[2]
      }
      break;
  }
}