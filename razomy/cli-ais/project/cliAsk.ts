// import {findGitRoot} from '../../git/commit';
// import {askProject} from './rag';
import {performanceLogger} from './logger';
import {runCompanyByCli} from './company';

export async function askIndependent(message: string) {
  await runCompanyByCli(
    message,
    {dirPath: '../../string-case'}
  );
}

export async function askAnyCli(message: string) {
  performanceLogger.tickAndLog('start')
  // const gitRoot = await findGitRoot();
  // if (gitRoot) {
  //   return askProject(message);
  // }
  await askIndependent(message.trim());
  performanceLogger.tickAndLog('end')
}

askAnyCli(
  'Проверь доку во всех файлах в папкe, чтобы там был @summary и @description',
).then(console.error);

