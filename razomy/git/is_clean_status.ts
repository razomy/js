import {getStatus} from './get_status';

export async function isCleanStatus(dirPath: string) {
  return (await getStatus(dirPath)).clean;
}
