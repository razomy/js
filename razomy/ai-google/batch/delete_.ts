import { ai } from '../call_tool';

export async function delete_(name: string) {
  await ai.batches.delete({ name: name });
}
