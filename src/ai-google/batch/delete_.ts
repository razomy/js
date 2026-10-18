import * as aiGoogle from '@razomy/ai-google';

export async function delete_(name: string) {
  await aiGoogle.CLIENT.batches.delete({ name: name });
}
