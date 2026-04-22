import * as dbRag from '@razomy/db-rag';
import * as aiAgent from '@razomy/ai-agent';

export async function askProject(message: string) {
  aiAgent.PERFORMANCE_LOGGER.tickAndLog('askProject');
  const db = await dbRag.create();
  await dbRag.trySetUp(db);
  const result = await dbRag.search(db, message);
  await db.close();
  aiAgent.PERFORMANCE_LOGGER.tickAndLog('end askProject');
  return result;
}
