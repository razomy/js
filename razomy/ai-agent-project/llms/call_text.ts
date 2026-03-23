import {ask} from "../../ai-anthropic/instant";
import * as ai from "@razomy/ai";

export async function callText({messages}: ai.AiLlmContext) {
  const response = await ask(
    messages.filter(i=>i.type==='text').map((message) => message.content),
  );
  return response;
}
