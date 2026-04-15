import type { BatchJobSourceUnion, InlinedRequest } from '@google/genai';
import * as aiGoogle from '@razomy/ai-google';

export async function asks(texts: string[], systemText: string) {
  const inlinedRequests: BatchJobSourceUnion = texts.map((text) => {
    return {
      contents: [{ parts: [{ text: systemText + '\n\n' + text }], role: 'user' }],
    } as InlinedRequest;
  });

  const response = await aiGoogle.CLIENT.batches.create({
    model: aiGoogle.MODELS.expensive,
    src: inlinedRequests,
  });
  console.log(response.name);
  const jobId = response.name!;
  await aiGoogle.batch.wait(jobId);
  const result = await aiGoogle.batch.getResult(jobId)!;
  aiGoogle.batch.printPrice(result!);
  await aiGoogle.batch.delete_(jobId);
  return result;
}
