import * as fs from "fs/promises";
import * as aiGoogle from "@razomy/ai-google";

/**
 * Дописывает одну операцию в формате JSONL (O(1) по памяти и диску)
 */
export async function appendOperationJsonl(jsonlPath: string, op: aiGoogle.refactor.FileOperation): Promise<void> {
    const record = JSON.stringify({
            action: op.action,
            path: op.path,
            reason: op.reason,
            contentLength: op.content.length,
          });
    await fs.appendFile(jsonlPath, record + '\n', 'utf-8');
}
