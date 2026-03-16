import { performanceLogger } from "../logger";
import {askIndependent} from './ask_independent';

export async function askAnyCli(message: string) {
    performanceLogger.tickAndLog('start')
    await askIndependent(message.trim());
    performanceLogger.tickAndLog('end')
}
askAnyCli(
  'Проверь доку во всех файлах в папкe, чтобы там был @summary и @description',
).then(console.error);
