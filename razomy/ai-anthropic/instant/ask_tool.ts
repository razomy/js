import {CLIENT, MAX_TOKENS, MODELS} from '../client';
import {specToTool} from "./spec_to_tool";
import * as main from "@razomy/main";
import * as fns from "@razomy/fns";
import * as abstracts from "@razomy/abstracts";
import * as ai from "@razomy/ai";

export async function askTool(
  texts: string[],
  toolSpec: abstracts.translators.FunctionDeclaration[]
): Promise<string | abstracts.translators.PropertyDeclaration> {

  const payload: any = {
    model: MODELS.expensive,
    max_tokens: MAX_TOKENS,
    messages: texts.map(i => ({ content: i, role: 'user' })),
  };
  payload.tools = toolSpec.map(specToTool);

  if (toolSpec.length  === 1) {
    payload.tool_choice = { type: "tool", name: toolSpec[0].identifier.name };
  }

  const result = await CLIENT.messages.create(payload);

  const toolsRequest = result.content.filter((block: any) => block.type === 'tool_use');

  if(toolsRequest.length === 0) {
    const textBlock = result.content.find((block: any) => block.type === 'text') as any;
    throw new ai.MustUseToolLlmException(textBlock, "")
  }

    const payloadArgs = toolsRequest.map((toolRequest,ix) => {
      const tool = toolSpec.find((block) => block.identifier.name === toolRequest.type)!;
      // const arguments_ =
      // return ({
      //   name: key,
      //   kind: 'Property',
      //   item: toolSpec[ix],
      //   // Your interface expects the value as a string. We stringify it if it's an object/number.
      //   value: typeof val === 'string' ? val : JSON.stringify(val),
      // } as abstracts.translators.Property)

      return {
        name: tool.identifier.name,
        arguments_: []
      }
    });

    return payloadArgs as any;

}

main.ifMain(import.meta.url, async () => {
  console.log(await askTool(['call hello'], [fns.createPackageFunction({
    name: 'hello',
    description: 'says hello',
  })]));
})
