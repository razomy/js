import { client } from '../client';

export async function cancel(id) {
  await client.messages.batches.cancel(id);
}
