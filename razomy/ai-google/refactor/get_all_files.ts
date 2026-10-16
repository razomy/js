import * as aiGoogle from "@razomy/ai-google";

/**
 * Рекурсивно считывает все текстовые файлы в директории в массив FileData
 */
export async function getAllFiles(dirPath: string, baseDir: string = dirPath, ignoreList: string[] = aiGoogle.refactor.DEFAULT_IGNORE_LIST): Promise<aiGoogle.refactor.FileData[]> {
    const results: aiGoogle.refactor.FileData[] = [];
    for await (const entry of aiGoogle.refactor.walkDirectoryStream(dirPath, baseDir, ignoreList)) {
    const content = aiGoogle.refactor.readFileSafe(entry.fullPath);
    if (content !== null) {
      results.push({
        relativePath: entry.relativePath,
        content,
      });
    }
    }

    return results;
}
