import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();
const models = {
  cheap: 'claude-sonnet-4-6',
  expensive: 'claude-opus-4-6',
}

const m = 1_000_000;
const batchSale = 2;
const pricing = {
  cheap: {
    in_: 3 / m,
    out_: 15 / m,
  },
  expensive: {
    in_: 5 / m,
    out_: 25 / m,
  },
}


function rec(text: string) {
  return {
    custom_id: 'my-first-request',
    params: {
      model: models.expensive,
      max_tokens: 1024,
      messages: [{role: 'user', content: text}]
    }
  };
}

export async function asks(texts: string[]) {
  const messageBatch = await anthropic.messages.batches.create({
    requests: texts.map(rec)
  });

  await wait(messageBatch.id);
}

async function wait(messageBatchId:string) {
  let messageBatch;
  while (true) {
    messageBatch = await anthropic.messages.batches.retrieve(messageBatchId);
    if (messageBatch.processing_status === 'ended') {
      break;
    }

    console.log(`Batch ${messageBatchId} is still processing... waiting`);
    await new Promise((resolve) => setTimeout(resolve, 60_000));
  }
  console.log(messageBatch);
}

async function get() {
  // Automatically fetches more pages as needed.
  for await (const messageBatch of anthropic.messages.batches.list({
    limit: 20
  })) {
    console.log(messageBatch);
  }
}