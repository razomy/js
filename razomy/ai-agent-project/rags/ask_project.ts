import * as vgd from '@razomy/vgd';
import * as aiAgentProject from '@razomy/ai-agent-project';

export async function askProject(message: string) {
  aiAgentProject.PERFORMANCE_LOGGER.tickAndLog('askProject');
  const db = await vgd.create();
  await vgd.trySetUp(db);
  const result = await vgd.search(db, message);
  await db.close();
  aiAgentProject.PERFORMANCE_LOGGER.tickAndLog('end askProject');
  return result;
}
