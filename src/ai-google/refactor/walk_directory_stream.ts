import fs from "fs/promises";
import path from "path";
import * as aiGoogle from "@razomy/ai-google";

/**
 * Потоковый обход директории (AsyncGenerator).
 * Позволяет обходить сотни тысяч файлов без потребления оперативной памяти.
 */
export async function* walkDirectoryStream(dirPath: string, baseDir: string = dirPath, ignoreList: string[] = aiGoogle.refactor.DEFAULT_IGNORE_LIST): AsyncGenerator<aiGoogle.refactor.FileEntry> {
    let entries;
    try {
    entries = await fs.readdir(dirPath, { withFileTypes: true });
    } catch (err) {
    console.warn(`⚠️ Не удалось прочитать директорию ${dirPath}:`, err);
    return;
    }

    for (const entry of entries) {
    if (aiGoogle.refactor.shouldIgnoreEntry(entry.name, ignoreList)) continue;

    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      yield* walkDirectoryStream(fullPath, baseDir, ignoreList);
    } else if (entry.isFile()) {
      yield { fullPath, relativePath };
    }
    }
}
