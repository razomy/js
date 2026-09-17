// import * as main from '@razomy/main';
import * as abstracts from '@razomy/abstracts';
import * as ai from '@razomy/ai';
import * as aiAnthropic from '@razomy/ai-anthropic';

export async function askTool(
  texts: string[],
  toolSpec: [abstracts.translators.FunctionDocsAst, abstracts.translators.FunctionHir][],
): Promise<string | abstracts.translators.PropertyAst> {
  const payload: any = {
    model: aiAnthropic.MODELS.expensive,
    max_tokens: aiAnthropic.MAX_TOKENS,
    messages: texts.map((i) => ({ content: i, role: 'user' })),
  };
  payload.tools = toolSpec.map(aiAnthropic.instant.specToTool);

  if (toolSpec.length === 1) {
    payload.tool_choice = { type: 'tool', name: toolSpec[0][1].name };
  }

  const result = await aiAnthropic.CLIENT.messages.create(payload);

  const toolsRequest = result.content.filter((block: any) => block.type === 'tool_use');

  if (toolsRequest.length === 0) {
    const textBlock = result.content.find((block: any) => block.type === 'text') as any;
    throw new ai.MustUseToolLlmException(textBlock, '');
  }

  const payloadArgs = toolsRequest.map((toolRequest, ix) => {
    const tool = toolSpec.find((block) => block[1].name === toolRequest.type)!;
    // const arguments_ =
    // return ({
    //   name: key,
    //   kind: 'Property',
    //   item: toolSpec[ix],
    //   // Your interface expects the value as a string. We stringify it if it's an object/number.
    //   value: typeof val === 'string' ? val : JSON.stringify(val),
    // } as abstracts.translators.Property)

    return {
      name: tool[1].name,
      arguments_: [],
    };
  });

  return payloadArgs as any;
}

// main.ifMain(import.meta.url, async () => {
//   console.log(
//     await askTool(
//       ['call hello'],
//       [
//         tsRl.hir.createPackageFunction({
//           name: 'hello',
//           description: 'says hello',
//         }),
//       ],
//     ),
//   );
// });
