import * as fs from "fs/promises";

/**
 * Дописывает кусок сырого текста в лог-файл
 */
export async function appendRawLog(rawLogPath: string, text: string): Promise<void> {
    await fs.appendFile(rawLogPath, text, 'utf-8');
}
