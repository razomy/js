import { type FileChanges } from "./get_changed_files_between_commits_or_all";
import {getStatusSync} from './get_status_sync';
import {statusFilesToFileChangesMut} from './status_files_to_file_changes_mut';

export function getStatusFileChanges(dirPath: string) {
    const result: FileChanges = {
            created: [],
            modified: [],
            deleted: [],
          };
    const status = getStatusSync(dirPath);
    status.files.map(i => statusFilesToFileChangesMut(result, i.type + '\t' + i.path.replaceAll(/ +-> +/g, '\t')));
    return result;
}
