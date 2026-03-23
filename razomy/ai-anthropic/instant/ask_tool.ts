import {client, maxTokens, models} from '../client';
import {specToTool} from "./spec_to_tool";
import * as main from "@razomy/main";
import * as fns from "@razomy/fns";

export async function askTool(
  texts: string[],
  toolSpec: fns.FunctionSpecification[]
): Promise<string | fns.FunctionPayload> {

  const payload: any = {
    model: models.expensive,
    max_tokens: maxTokens,
    messages: texts.map(i => ({ content: i, role: 'user' })),
  };

  // If a tool specification is provided, attach it to the request
  if (toolSpec) {
    payload.tools = toolSpec.map(specToTool);

    // Optional: Force the model to use the tool.
    // Remove this if you want the model to decide whether to use the tool or just talk.
    payload.tool_choice = { type: "tool", name: toolSpec[0].name };
  }

  const result = await client.messages.create(payload);

  // Check if the model decided to use a tool
  const toolUseBlock = result.content.find((block: any) => block.type === 'tool_use');

  if (toolUseBlock && toolUseBlock.type === 'tool_use') {
    // Map the Anthropic tool use response back to your FunctionPayload format
    const payloadArgs: fns.FunctionPayloadArgument[] = Object.entries(toolUseBlock.input as any).map(([key, val]) => ({
      name: key,
      // Your interface expects the value as a string. We stringify it if it's an object/number.
      value: typeof val === 'string' ? val : JSON.stringify(val)
    }));

    return {
      name: toolUseBlock.name,
      arguments_: payloadArgs
    };
  }

  // Fallback: If no tool was used, return the standard text response
  const textBlock = result.content.find((block: any) => block.type === 'text') as any;
  return textBlock ? textBlock.text : "";
}

main.ifMain(import.meta.url, async () => {
  console.log(await askTool(['call hello'], [fns.create({
    name: 'hello',
    description: 'says hello',
  })]));
})
