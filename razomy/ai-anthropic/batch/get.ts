import { CLIENT } from '../client';

export async function get() {
  for await (const messageBatch of CLIENT.messages.batches.list({
    limit: 20,
  })) {
    console.log(`${messageBatch.id} - ${messageBatch.processing_status}`);
  }
}
