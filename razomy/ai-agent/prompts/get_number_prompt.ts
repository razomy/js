import * as ais from '@razomy/ais';

export function getNumberPrompt() {
  return [
    ais.chats.sM(`You are a math parser. Return ONLY a number, or "PANIC" if you cannot answer. No text, no explanations.`),
  ];
}
