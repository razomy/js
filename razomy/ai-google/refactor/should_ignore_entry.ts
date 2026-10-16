import * as aiGoogle from "@razomy/ai-google";

/**
 * Проверяет, нужно ли игнорировать файл или папку
 */
export function shouldIgnoreEntry(entryName: string, ignoreList: string[] = aiGoogle.refactor.DEFAULT_IGNORE_LIST): boolean {
    return ignoreList.some((ignoreItem) => entryName.includes(ignoreItem));
}
