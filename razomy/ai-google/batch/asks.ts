import type { BatchJobSourceUnion, InlinedRequest } from '@google/genai';
import { client, models } from '../client';
import { wait } from './wait';
import { getResult } from './get_result';
import { delete_ } from './delete_';
import { printPrice } from './print_price';

export async function asks(texts: string[], systemText: string) {
  const inlinedRequests: BatchJobSourceUnion = texts.map((text) => {
    return {
      contents: [{ parts: [{ text: systemText + '\n\n' + text }], role: 'user' }],
    } as InlinedRequest;
  });

  const response = await client.batches.create({
    model: models.expensive,
    src: inlinedRequests,
  });
  console.log(response.name);
  const jobId = response.name!;
  await wait(jobId);
  const result = await getResult(jobId)!;
  printPrice(result!);
  await delete_(jobId);
  return result;
}
