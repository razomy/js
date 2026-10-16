import {createReadStream} from "node:fs";
import * as aiGoogle from "@razomy/ai-google";

/**
 * Потоковое чтение лог-файла бэкапа (любого размера) и применение операций на диск
 */
export async function applyFromBackupStream(targetDir: string, rawLogFilePath: string): Promise<number> {
  const parser = new aiGoogle.refactor.OperationStreamParser();
  const fileStream = createReadStream(rawLogFilePath, { encoding: 'utf-8', highWaterMark: 64 * 1024 });

  let totalApplied = 0;

  for await (const chunk of fileStream) {
    const ops = parser.feedChunk(chunk as string);
    for (const op of ops) {
      await aiGoogle.refactor.executeOperationOnDisk(targetDir, op);
      totalApplied++;
    }
  }

  return totalApplied;
}
