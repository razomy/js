import { ai } from '../client';

export async function cancel(name: string) {
  await ai.batches.cancel({ name: name });
}
