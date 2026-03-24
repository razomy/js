import * as ai from "@razomy/ai";

export function parseThrowPanic(text: string) {
  if (text.toLowerCase().includes('panic')) {
    throw new ai.PanicAnswerLlmException(text, 'Not have panic');
  }
  return;
}
