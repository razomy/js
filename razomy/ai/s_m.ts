import type {AiMessage} from "./message";

export function sM(m: string) {
  return {sender: 'system', content: m, type: "text"} satisfies AiMessage;
}
