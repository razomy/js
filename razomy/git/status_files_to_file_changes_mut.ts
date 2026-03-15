import type {FileChanges} from './get_changed_files_between_commits_or_all';

export function statusFilesToFileChangesMut(result: FileChanges, line) {
    const parts = line.split('\t');
    if (parts.length < 2) return;
    const statusFlag = parts[0][0];
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
