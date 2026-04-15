import * as aiAnthropic from "@razomy/ai-anthropic";

export async function get() {
  for await (const messageBatch of aiAnthropic.CLIENT.messages.batches.list({
    limit: 20,
  })) {
    console.log(`${messageBatch.id} - ${messageBatch.processing_status}`);
  }
}
