import * as fs from "fs/promises";
import * as path from "path";
import * as aiGoogle from "@razomy/ai-google";

/**
 * Инициализация папки и файлов бэкапа
 */
export async function initBackupSession(targetDir: string, backupDirName: string = '.gemini-backups'): Promise<aiGoogle.refactor.BackupPaths> {
    const dir = path.join(targetDir, backupDirName);
    await fs.mkdir(dir, { recursive: true });
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return {
    dir,
    rawLogPath: path.join(dir, `stream-raw-${timestamp}.log`),
    jsonlOpsPath: path.join(dir, `operations-${timestamp}.jsonl`),
    jsonSnapshotPath: path.join(dir, `operations-${timestamp}.json`),
    };
}
