import type { BatchJobSourceUnion, InlinedRequest } from '@google/genai';
import * as aiGoogle from "@razomy/ai-google";

export async function asksWithCache(texts: string[], systemText: string, sameTextCache: string) {
  const cache = await aiGoogle.CLIENT.caches.create({
    model: aiGoogle.MODELS.expensive,
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

  const response = await aiGoogle.CLIENT.batches.create({
    model: aiGoogle.MODELS.expensive,
    src: inlinedRequests,
  });
  console.log(response.name);
  const jobId = response.name!;
  await aiGoogle.batch.wait(jobId);
  const result = await aiGoogle.batch.getResult(jobId);
  aiGoogle.batch.printPrice(result!);
  await aiGoogle.batch.delete_(jobId);
  await aiGoogle.CLIENT.caches.delete({ name: cacheId! });
  return result;
}
