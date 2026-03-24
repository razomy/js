import {askIndependent} from './ask_independent';
import * as aiAgentProject from "@razomy/ai-agent-project";

export async function askAnyCli(message: string) {
    aiAgentProject.performanceLogger.tickAndLog('start')
    await askIndependent(message.trim());
    aiAgentProject.performanceLogger.tickAndLog('end')
}
askAnyCli(
  'Проверь доку во всех файлах в папкe, чтобы там был @summary и @description',
).then(console.error);
