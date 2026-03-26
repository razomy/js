import { CLIENT, MODELS } from '../client';
import { wait } from './wait';
import { getResult } from './get_result';
import { delete_ } from './delete_';
import { printPrice } from './print_price';
import type { BatchJobSourceUnion, InlinedRequest } from '@google/genai';

export async function asksWithCache(texts: string[], systemText: string, sameTextCache: string) {
  const cache = await CLIENT.caches.create({
    model: MODELS.expensive,
    config: {
      contents: sameTextCache,
      systemInstruction: systemText,
    },
  });
  console.log('cache.name', cache.name);
  const cacheId = cache.name;
  const inlinedRequests: BatchJobSourceUnion = texts.map((text) => {
    return {
      contents: [
        {
          parts: [{ text }],
          role: 'user',
        },
      ],
      config: { cachedContent: cacheId },
    } as InlinedRequest;
  });

  const response = await CLIENT.batches.create({
    model: MODELS.expensive,
    src: inlinedRequests,
  });
  console.log(response.name);
  const jobId = response.name!;
  await wait(jobId);
  const result = await getResult(jobId);
  printPrice(result!);
  await delete_(jobId);
  await CLIENT.caches.delete({ name: cacheId! });
  return result;
}
