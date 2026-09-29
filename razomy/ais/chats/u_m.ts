import * as ai from '@razomy/ai';

export function uM(m: string) {
  return { sender: 'user', content: m, type: 'text' } satisfies ai.AiMessage;
}
