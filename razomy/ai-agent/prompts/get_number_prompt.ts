import * as ai from '@razomy/ai';

export function getNumberPrompt() {
  return [
    ai.sM(`You are a math parser. Return ONLY a number, or "PANIC" if you cannot answer. No text, no explanations.`),
  ];
}
