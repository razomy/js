import * as aiAgentProject from "@razomy/ai-agent-project";
import * as cliAis from "@razomy/cli-ais";

export async function askAnyCli(message: string) {
    aiAgentProject.PERFORMANCE_LOGGER.tickAndLog('start')
    await cliAis.project.apis.askIndependent(message.trim());
    aiAgentProject.PERFORMANCE_LOGGER.tickAndLog('end')
}
askAnyCli(
  'Проверь доку во всех файлах в папкe, чтобы там был @summary и @description',
).then(console.error);
