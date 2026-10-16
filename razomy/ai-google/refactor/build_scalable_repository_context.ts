import * as path from "path";
import * as aiGoogle from "@razomy/ai-google";

/**
 * Собирает контекст репозитория для кэша, не переполняя память на больших проектах.
 * Читает ключевые файлы и строит карту путей проекта.
 */
export async function buildScalableRepositoryContext(targetDir: string, ignoreList: string[] = aiGoogle.refactor.DEFAULT_IGNORE_LIST, maxFullFiles: number = 200, priorityFilePattern: RegExp = /^(readme|package\.json|tsconfig|index\.|architecture)/i): Promise<{ contextText: string; totalFilesCount: number }> {
    const filePaths: string[] = [];
    const priorityFilesContent: string[] = [];
    let fullFilesCount = 0;
    for await (const entry of aiGoogle.refactor.walkDirectoryStream(targetDir, targetDir, ignoreList)) {
    filePaths.push(entry.relativePath);

    const isPriority = priorityFilePattern.test(path.basename(entry.relativePath));

    if ((isPriority || fullFilesCount < maxFullFiles) && fullFilesCount < maxFullFiles) {
      const content = aiGoogle.refactor.readFileSafe(entry.fullPath);
      if (content !== null && content.length < 100_000) {
        priorityFilesContent.push(
          `===FILE: ${entry.relativePath}===\n${content}\n===END FILE: ${entry.relativePath}===`,
        );
        fullFilesCount++;
      }
    }
    }

    const treeSummary = filePaths.length > 5000
              ? filePaths.slice(0, 5000).join('\n') + `\n... (and ${filePaths.length - 5000} more files)`
              : filePaths.join('\n');
    const contextText = [
            `Repository Structure (${filePaths.length} total files):`,
            treeSummary,
            `\nReference Files Snapshot (${priorityFilesContent.length} files):`,
            priorityFilesContent.join('\n\n'),
          ].join('\n\n');
    return { contextText, totalFilesCount: filePaths.length };
}
