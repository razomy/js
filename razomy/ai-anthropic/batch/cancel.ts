import { CLIENT } from '../client';

export async function cancel(id) {
  await CLIENT.messages.batches.cancel(id);
}
