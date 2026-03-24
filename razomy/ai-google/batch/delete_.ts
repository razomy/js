import { client } from '../client';

export async function delete_(name: string) {
  await client.batches.delete({ name: name });
}
