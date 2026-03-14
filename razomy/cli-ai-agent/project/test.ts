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
import {Performance} from '@razomy/performance';
import {createUuid} from '@razomy/random';

const per = new Performance();

function splitStringByLength(text: string, maxLength) {
  const result: string[] = [];
  for (let i = 0; i < text.length; i += maxLength) {
    result.push(text.slice(i, i + maxLength));
  }
  return result;
}

function splitStringByByteLengthMath(text: string, maxBytes: number = 700): string[] {
  const result: string[] = [];
  let currentChunk = "";
  let currentBytes = 0;

  // for...of iterates cleanly over Unicode characters (preventing emoji slicing)
  for (const char of text) {
    const code = char.codePointAt(0)!;

    // Calculate the UTF-8 byte length of the current character
    let charBytes = 1;
    if (code <= 0x007f) charBytes = 1;
    else if (code <= 0x07ff) charBytes = 2;
    else if (code <= 0xffff) charBytes = 3;
    else charBytes = 4; // Emojis and complex symbols

    // If adding this character exceeds the 700 byte limit, push and reset
    if (currentBytes + charBytes > maxBytes) {
      if (currentChunk) result.push(currentChunk);
      currentChunk = char;
      currentBytes = charBytes;
    } else {
      currentChunk += char;
      currentBytes += charBytes;
    }
  }

  // Push the final remaining chunk
  if (currentChunk) {
    result.push(currentChunk);
  }

  return result;
}


export function chunkFile(projectPath, filePath, project): ChunkFile {
  const sourceFile = project.getSourceFile(projectPath+'/'+ filePath);
  let chunks = [] as string[];
  if (!sourceFile) {
    chunks = splitStringByByteLengthMath(fss.file.getSync(projectPath + '/' + filePath), 700)
  } else {
    chunks = getFirstLevelElementsTextFromSource(sourceFile).map(i=>{
      return splitStringByByteLengthMath(i, 700)
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
  per.tickAndLog('syncProjectWithVgd');
  const projectPath = (await findGitRoot())!;
  console.info('Project root path:', projectPath);
  const lastDbCommitId = (await vgd.getLastCommitId(db, projectPath))?.trim();
  const lastFsCommitId = git.getLastCommitId({dirPath: projectPath})?.trim();
  const commitsFiles = await getChangedFilesBetweenCommitsOrAll(projectPath, lastDbCommitId, lastFsCommitId);
  const statusFiles = getStatusFileChanges(projectPath);
  await deleteFiles(db, projectPath, array.uniq([...commitsFiles.deleted, ...statusFiles.deleted]));
  const project = new Project({tsConfigFilePath: projectPath + '/tsconfig.json'});

  await indexFs(db, projectPath, lastFsCommitId, array.uniq([
    ...commitsFiles.created,
    ...commitsFiles.modified,
    ...statusFiles.created,
    ...statusFiles.modified,
  ]).map(i => chunkFile(projectPath, i, project)));
  per.tickAndLog('end syncProjectWithVgd');
}

export async function askProject(message: string) {
  per.tickAndLog('askProject');
  const db = await vgd.create();
  // await vgd.reset(db);
  await vgd.trySetUp(db);
  await syncProjectWithVgd(db);
  const result = await vgd.search(db, message);
  await db.close();
  per.tickAndLog('end askProject');
  return result;
}

export async function askIndependent(message: string) {

}

export async function askAny(message: string) {
  per.tickAndLog('start')
  const gitRoot = await findGitRoot();
  if (gitRoot) {
    return askProject(message);
  }
  return askIndependent(message);
}

// define self
// define goal
// define context
// - define tools
// define result
askAny('uppercase jack').then(console.error);
