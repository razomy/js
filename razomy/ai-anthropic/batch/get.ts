import { client } from '../client';

export async function get() {
  for await (const messageBatch of client.messages.batches.list({
    limit: 20,
  })) {
    console.log(`${messageBatch.id} - ${messageBatch.processing_status}`);
  }
}
