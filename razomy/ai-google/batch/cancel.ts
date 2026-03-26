import { CLIENT } from '../client';

export async function cancel(name: string) {
  await CLIENT.batches.cancel({ name: name });
}
