import { client } from '../client';

export async function getResult(jobName: string) {
  try {
    const batchJob = await client.batches.get({ name: jobName });

    if (batchJob.state === 'JOB_STATE_SUCCEEDED') {
      // console.log('Found completed batch:', batchJob.displayName);
      // console.log(batchJob);

      // If batch job was created with a file destination
      if (batchJob.dest?.fileName) {
        const resultFileName = batchJob.dest.fileName;
        console.log(`Results are in file: ${resultFileName}`);

        console.log('Downloading result file content...');
        await client.files.download({ file: resultFileName, downloadPath: '.' });

        // Process fileContentBuffer (Buffer) as needed
        // console.log(fileContentBuffer.toString('utf-8'));
      }

      // If batch job was created with inline responses
      else if (batchJob.dest?.inlinedResponses) {
        const result: ({ tokens: { in_: number; out: number }; text: string } | null)[] = [];
        // console.log('Results are inline:');
        for (let i = 0; i < batchJob.dest.inlinedResponses.length; i++) {
          const inlineResponse = batchJob.dest.inlinedResponses[i];
          // console.log(`Response ${i + 1}:`);
          if (inlineResponse.response) {
            // Accessing response, structure may vary.
            if (inlineResponse.response.text !== undefined) {
              // console.log(inlineResponse.response.text);
              result.push({
                tokens: {
                  in_: inlineResponse.response.usageMetadata!.promptTokenCount!,
                  out:
                    inlineResponse.response.usageMetadata!.thoughtsTokenCount! +
                    inlineResponse.response.usageMetadata!.candidatesTokenCount!,
                },
                text: inlineResponse.response.text,
              });
            } else if (inlineResponse.response.candidates?.[0]?.content?.parts?.[0]?.text) {
              result.push({
                tokens: {
                  in_: inlineResponse.response.usageMetadata!.promptTokenCount!,
                  out:
                    inlineResponse.response!.usageMetadata!.thoughtsTokenCount! +
                    inlineResponse.response!.usageMetadata!.candidatesTokenCount!,
                },
                text: inlineResponse.response.candidates[0].content?.parts[0].text,
              });
            } else {
              result.push(null);
            }
          } else if (inlineResponse.error) {
            console.error(`Error: ${inlineResponse.error}`);
            result.push(null);
          }
        }
        return result;
      }

      // If batch job was an embedding batch with inline responses
      else if (batchJob.dest?.inlinedEmbedContentResponses) {
        console.log('Embedding results found inline:');
        for (let i = 0; i < batchJob.dest.inlinedEmbedContentResponses.length; i++) {
          const inlineResponse = batchJob.dest.inlinedEmbedContentResponses[i];
          console.log(`Response ${i + 1}:`);
          if (inlineResponse.response) {
            console.log(inlineResponse.response);
          } else if (inlineResponse.error) {
            console.error(`Error: ${inlineResponse.error}`);
          }
        }
      } else {
        console.log('No results found (neither file nor inline).');
      }
    } else {
      console.log(`Job did not succeed. Final state: ${batchJob.state}`);
      if (batchJob.error) {
        console.error(
          `Error: ${
            typeof batchJob.error === 'string'
              ? batchJob.error
              : batchJob.error.message || JSON.stringify(batchJob.error)
          }`,
        );
      }
    }
  } catch (error) {
    console.error(`An error occurred while processing job ${jobName}:`, error);
    throw error;
  }
  return [];
}
