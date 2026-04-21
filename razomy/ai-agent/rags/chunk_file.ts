import * as fss from '@razomy/fss';
import * as random from '@razomy/random';
import * as string from '@razomy/string';
import * as tsRefactor from '@razomy/ts-refactor';
import * as vgd from '../../db-rag';

export function chunkFile(projectPath, filePath, project): vgd.ChunkFile {
  const sourceFile = project.getSourceFile(projectPath + '/' + filePath);
  let chunks = [] as string[];
  if (!sourceFile) {
    chunks = string.chunkByByteLength(fss.file.getSync(projectPath + '/' + filePath), 700);
  } else {
    chunks = tsRefactor
      .getFirstLevelElementsTextFromSource(sourceFile)
      .map((i) => {
        return string.chunkByByteLength(i, 700);
      })
      .flat(1);
  }

  return {
    filePath: filePath,
    chunks: chunks.map((i) => {
      return {
        id: random.createUuid(),
        text: i,
      };
    }),
  };
}
