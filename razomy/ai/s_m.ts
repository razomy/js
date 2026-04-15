import * as ai from "@razomy/ai";

export function sM(m: string) {
  return {sender: 'system', content: m, type: "text"} satisfies ai.AiMessage;
}
