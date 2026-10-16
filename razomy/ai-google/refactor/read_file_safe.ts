import * as fsFile from "@razomy/fs-file";

/**
 * Безопасное чтение одного файла по требованию
 */
export function readFileSafe(fullPath: string): string | null {
    try {
    return fsFile.getSync(fullPath);
    } catch {
    console.warn(`⚠️ Пропуск файла ${fullPath} (бинарный или недоступен для чтения)`);
    return null;
    }
}
