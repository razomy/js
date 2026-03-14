import * as vgd from '@razomy/vgd';
import {indexFs} from '@razomy/vgd';
import * as git from '@razomy/git';
import * as fss from '@razomy/fss';
import {findGitRoot} from '../../git/commit';
import {getStatusFileChanges} from '../../git/get_status_sync';
import {getChangedFilesBetweenCommitsOrAll} from '../../git/getChangesBetween';
import {type ChunkFile, deleteFiles} from '../../vgd/index_fs';
import * as array from '@razomy/array';
import {Project} from 'ts-morph';
import {getFirstLevelElementsTextFromSource} from '../../ts-refactor/get_exported_constants';
import {createUuid} from '@razomy/random';
import {chunkByByteLength} from '@razomy/string';
import {performanceLogger} from './logger';

export function chunkFile(projectPath, filePath, project): ChunkFile {
  const sourceFile = project.getSourceFile(projectPath + '/' + filePath);
  let chunks = [] as string[];
  if (!sourceFile) {
    chunks = chunkByByteLength(fss.file.getSync(projectPath + '/' + filePath), 700)
  } else {
    chunks = getFirstLevelElementsTextFromSource(sourceFile).map(i => {
      return chunkByByteLength(i, 700)
    }).flat(1);
  }

  return {
    filePath: filePath,
    chunks: chunks.map((i, ix) => {
      return {
        id: createUuid(),
        text: i
      }
    })
  }
}

export async function syncProjectWithVgd(db) {
  performanceLogger.tickAndLog('syncProjectWithVgd');
  const projectPath = (await findGitRoot())!;
  console.info('Project root path:', projectPath);
  //TODO: CHEck if commit exists
  const lastDbCommitId = (await vgd.getLastCommitId(db, projectPath))?.trim();
  const lastFsCommitId = git.getLastCommitId({dirPath: projectPath})?.trim();
  const commitsFiles = await getChangedFilesBetweenCommitsOrAll(projectPath, lastDbCommitId!, lastFsCommitId);
  const statusFiles = getStatusFileChanges(projectPath);
  await deleteFiles(db, projectPath, array.uniq([...commitsFiles.deleted, ...statusFiles.deleted]));
  const project = new Project({tsConfigFilePath: projectPath + '/tsconfig.json'});

  await indexFs(db, projectPath, lastFsCommitId, array.uniq([
    ...commitsFiles.created,
    ...commitsFiles.modified,
    ...statusFiles.created,
    ...statusFiles.modified,
  ]).map(i => chunkFile(projectPath, i, project)));
  performanceLogger.tickAndLog('end syncProjectWithVgd');
}

export async function askProject(message: string) {
  performanceLogger.tickAndLog('askProject');
  const db = await vgd.create();
  // await vgd.reset(db);
  await vgd.trySetUp(db);
  // await syncProjectWithVgd(db);
  const result = await vgd.search(db, message);
  await db.close();
  performanceLogger.tickAndLog('end askProject');
  return result;
}
