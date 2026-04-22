import * as dbRag from '@razomy/db-rag';
import * as git from '@razomy/git';
import * as array from '@razomy/array';
import { Project } from 'ts-morph';
import * as aiAgent from '@razomy/ai-agent';

export async function syncProjectWithVgd(db) {
  aiAgent.PERFORMANCE_LOGGER.tickAndLog('syncProjectWithVgd');
  const projectPath = (await git.findGitRoot())!;
  console.info('Project root path:', projectPath);
  const lastDbCommitId = (await dbRag.getLastCommitId(db, projectPath))?.trim();
  const lastFsCommitId = git.getLastCommitId({ dirPath: projectPath })?.trim();
  const commitsFiles = await git.getChangedFilesBetweenCommitsOrAll(projectPath, lastDbCommitId!, lastFsCommitId);
  const statusFiles = git.getStatusFileChanges(projectPath);
  await dbRag.deleteFiles(db, projectPath, array.uniq([...commitsFiles.deleted, ...statusFiles.deleted]));
  const project = new Project({ tsConfigFilePath: projectPath + '/tsconfig.json' });
  await dbRag.indexFs(
    db,
    projectPath,
    lastFsCommitId,
    array
      .uniq([...commitsFiles.created, ...commitsFiles.modified, ...statusFiles.created, ...statusFiles.modified])
      .map((i) => aiAgent.rags.chunkFile(projectPath, i, project)),
  );
  aiAgent.PERFORMANCE_LOGGER.tickAndLog('end syncProjectWithVgd');
}
