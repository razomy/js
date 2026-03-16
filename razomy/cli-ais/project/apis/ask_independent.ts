// import {findGitRoot} from '../../git/commit';
// import {askProject} from './rag';
import {askCompanyByCli} from './ask_company_by_cli';

export async function askIndependent(message: string) {
  await askCompanyByCli(
    message,
    {dirPath: '../../string-case'}
  );
}



