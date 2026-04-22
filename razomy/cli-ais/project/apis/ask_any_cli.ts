import * as aiAgent from '@razomy/ai-agent';
import * as cliAis from '@razomy/cli-ais';

export async function askAnyCli(message: string) {
  aiAgent.PERFORMANCE_LOGGER.tickAndLog('start');
  await cliAis.project.apis.askIndependent(message.trim());
  aiAgent.PERFORMANCE_LOGGER.tickAndLog('end');
}
askAnyCli('Проверь доку во всех файлах в папкe, чтобы там был @summary и @description').then(console.error);
