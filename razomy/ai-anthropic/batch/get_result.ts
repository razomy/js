import { client } from '../client';

export async function getResult(jobId: string) {
  const results: (any | null)[] = [];
  for await (const result of await client.messages.batches.results(jobId)) {
    switch (result.result.type) {
      case 'succeeded':
        console.log(`Success! ${result.custom_id}`);
        results.push(result);
        break;
      case 'errored':
        if (result.result.error.type === 'error') {
          console.log(`Validation error: ${result.custom_id}`);
        } else {
          console.log(`Server error: ${result.custom_id}`);
        }
        results.push(null);
        break;
      case 'expired':
        console.log(`Request expired: ${result.custom_id}`);
        results.push(null);
        break;
    }
  }

  return results;
}
