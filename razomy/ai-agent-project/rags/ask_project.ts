import * as vgd from "@razomy/vgd";
import { PERFORMANCE_LOGGER } from "../logger";

export async function askProject(message: string) {
    PERFORMANCE_LOGGER.tickAndLog('askProject');
    const db = await vgd.create();
    await vgd.trySetUp(db);
    const result = await vgd.search(db, message);
    await db.close();
    PERFORMANCE_LOGGER.tickAndLog('end askProject');
    return result;
}
