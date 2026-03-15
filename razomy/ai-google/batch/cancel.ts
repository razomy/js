import { ai } from '../call_tool';

export async function cancel(name: string) {
  await ai.batches.cancel({ name: name });
}
