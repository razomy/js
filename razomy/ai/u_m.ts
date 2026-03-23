import type {AiMessage} from "./message";

export function uM(m: string) {
  return {sender: 'user', content: m, type: 'text'}satisfies AiMessage;
}
