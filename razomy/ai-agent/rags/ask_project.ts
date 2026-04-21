import * as vgd from '../../db-rag';
import * as aiAgentProject from '..';

export async function askProject(message: string) {
  aiAgentProject.PERFORMANCE_LOGGER.tickAndLog('askProject');
  const db = await vgd.create();
  await vgd.trySetUp(db);
  const result = await vgd.search(db, message);
  await db.close();
  aiAgentProject.PERFORMANCE_LOGGER.tickAndLog('end askProject');
  return result;
}
