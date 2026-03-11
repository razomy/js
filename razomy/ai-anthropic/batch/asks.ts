import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

export const models = {
  cheap: 'claude-sonnet-4-6',
  expensive: 'claude-opus-4-6',
};

export const m = 1_000_000;
export const batchSale = 2;
export const pricing = {
  cheap: {
    in_: 3 / m,
    out_: 15 / m,
  },
  expensive: {
    in_: 15 / m,
    out_: 75 / m,
  },
};

export function printPrice(results: any[]) {
  let p = 0;

  results.forEach((c) => {
    // Only calculate prices for requests that successfully returned usage data
    if (c.result.type === 'succeeded') {
      const usage = c.result.message.usage;
      const inputTokens = usage.input_tokens || 0;
      const outputTokens = usage.output_tokens || 0;

      // Applying the batch sale (divide by 2)
      const inP_ = (pricing.expensive.in_ * inputTokens) / batchSale;
      const outP_ = (pricing.expensive.out_ * outputTokens) / batchSale;

      p += inP_;
      p += outP_;

      const inP = `in=${inputTokens}=$${inP_.toFixed(5)}`;
      const outP = `ot=${outputTokens}=$${outP_.toFixed(5)}`;
      console.log(`Price tokens [${c.custom_id}] | ${inP} | ${outP}`);
    } else {
      console.log(`Skipped pricing for [${c.custom_id}] - Status: ${c.result.type}`);
    }
  });

  console.log('Total $' + p.toFixed(5));
}

export async function cancel(id) {
  await anthropic.messages.batches.cancel(id)
}

export async function asks(texts: string[], systemText: string) {
  // 1. Prepare requests mapping to the Anthropic batch format
  const requests: Anthropic.Messages.Batches.BatchCreateParams.Request[] = texts.map((text, index) => {
    return {
      custom_id: `req-${index + 1}`, // custom_ids must be unique per item in the batch
      params: {
        model: models.expensive,
        max_tokens: 5024,
        system: systemText, // Anthropic system prompts go here
        messages: [{role: 'user', content: text}],
      },
    };
  });

  // 2. Create the batch job
  const response = await anthropic.messages.batches.create({
    requests,
  });

  const jobId = response.id;
  console.log(`Created Job ID: ${jobId}`);

  return await continue_(jobId);
}

export async function wait(messageBatchId: string) {
  let messageBatch;
  while (true) {
    messageBatch = await anthropic.messages.batches.retrieve(messageBatchId);

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

export async function getResult(jobId: string) {
  const results: (any | null)[] = [];

  // Stream results file in memory-efficient chunks, processing one at a time
  for await (const result of await anthropic.messages.batches.results(jobId)) {
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

  return results; // Return the array so printPrice can use it
}

export async function delete_(jobId: string) {
  // Note: Anthropic retains batch results for 29 days and does not expose
  // a manual DELETE endpoint. This is kept here to match your required code structure.
  console.log(`Cleanup Job reference called for: ${jobId}`);
}

export async function get() {
  // Automatically fetches more pages as needed.
  for await (const messageBatch of anthropic.messages.batches.list({
    limit: 20,
  })) {
    console.log(`${messageBatch.id} - ${messageBatch.processing_status}`);
  }
}

export async function continue_(jobId: string) {
  // 3. Wait for the batch to complete
  await wait(jobId);

  // 4. Retrieve results array
  const result = await getResult(jobId);

  // 5. Calculate and print total cost
  printPrice(result);

  // 6. Cleanup (Placeholder)
  await delete_(jobId);

  return result.map((c) => ({text: c.result.message.content[0]['text']}));
}
