import { client } from '../client';

export async function cancel(name: string) {
  await client.batches.cancel({ name: name });
}
