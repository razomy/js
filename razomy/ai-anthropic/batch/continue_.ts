import { wait } from './wait';
import { getResult } from './get_result';
import { printPrice } from './print_price';
import { delete_ } from './delete_';

export async function continue_(jobId: string) {
  await wait(jobId);
  const result = await getResult(jobId);
  printPrice(result);
  await delete_(jobId);
  return result.map((c) => ({ text: c.result.message.content[0]['text'] }));
}
