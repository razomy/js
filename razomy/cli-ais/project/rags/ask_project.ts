import * as vgd from "@razomy/vgd";
import { performanceLogger } from "../logger";

export async function askProject(message: string) {
    performanceLogger.tickAndLog('askProject');
    const db = await vgd.create();
    await vgd.trySetUp(db);
    const result = await vgd.search(db, message);
    await db.close();
    performanceLogger.tickAndLog('end askProject');
    return result;
}
