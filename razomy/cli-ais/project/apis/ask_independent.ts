import * as cliAis from '@razomy/cli-ais';

// import {findGitRoot} from '../../git/commit';
// import {askProject} from './rag';

export async function askIndependent(message: string) {
  await cliAis.project.apis.askCompanyByCli(message, { dirPath: '../../string-case' });
}
