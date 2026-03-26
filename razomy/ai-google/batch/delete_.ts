import { CLIENT } from '../client';

export async function delete_(name: string) {
  await CLIENT.batches.delete({ name: name });
}
