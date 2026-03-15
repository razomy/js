import { getStatus } from './get_status';

export async function isStatusClean(dirPath: string) {
  return (await getStatus(dirPath)).clean;
}
