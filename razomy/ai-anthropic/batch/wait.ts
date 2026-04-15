import * as aiAnthropic from "@razomy/ai-anthropic";

export async function wait(messageBatchId: string) {
  let messageBatch;
  while (true) {
    messageBatch = await aiAnthropic.CLIENT.messages.batches.retrieve(messageBatchId);

    if (messageBatch.processing_status === 'ended') {
      break;
    }

    // Break out to prevent infinite loops if something goes wrong
    if (['canceled', 'errored', 'expired'].includes(messageBatch.processing_status)) {
      throw new Error(`Batch stopped with status: ${messageBatch.processing_status}`);
    }

    console.log(`Batch ${messageBatchId} is still processing... waiting`);
    await new Promise((resolve) => setTimeout(resolve, 15_000)); // check every 15 seconds
  }

  console.log('Batch finished processing.');
}
