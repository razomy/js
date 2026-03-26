import * as vgd from "@razomy/vgd";
import * as git from "@razomy/git";
import * as array from "@razomy/array";
import { Project } from "ts-morph";
import { PERFORMANCE_LOGGER } from "../logger";
import {chunkFile} from './chunk_file';

export async function syncProjectWithVgd(db) {
    PERFORMANCE_LOGGER.tickAndLog('syncProjectWithVgd');
    const projectPath = (await git.findGitRoot())!;
    console.info('Project root path:', projectPath);
    const lastDbCommitId = (await vgd.getLastCommitId(db, projectPath))?.trim();
    const lastFsCommitId = git.getLastCommitId({dirPath: projectPath})?.trim();
    const commitsFiles = await git.getChangedFilesBetweenCommitsOrAll(projectPath, lastDbCommitId!, lastFsCommitId);
    const statusFiles = git.getStatusFileChanges(projectPath);
    await vgd.deleteFiles(db, projectPath, array.uniq([...commitsFiles.deleted, ...statusFiles.deleted]));
    const project = new Project({tsConfigFilePath: projectPath + '/tsconfig.json'});
    await vgd.indexFs(db, projectPath, lastFsCommitId, array.uniq([
    ...commitsFiles.created,
    ...commitsFiles.modified,
    ...statusFiles.created,
    ...statusFiles.modified,
    ]).map(i => chunkFile(projectPath, i, project)));
    PERFORMANCE_LOGGER.tickAndLog('end syncProjectWithVgd');
}
