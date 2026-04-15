import * as aiOpenai from "@razomy/ai-openai";

export async function gptApiV2(params = { messages: [] }) {
  const request = {
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    ...params,
  };
  const response = await aiOpenai.CLIENT.chat.completions.create(request as any);
  return response;
}
