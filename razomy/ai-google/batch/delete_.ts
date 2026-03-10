import { ai } from '../client';

export async function delete_(name: string) {
  await ai.batches.delete({ name: name });
}
