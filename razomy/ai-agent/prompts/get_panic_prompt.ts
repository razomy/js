import * as ai from '@razomy/ai';

export function getPanicPrompt() {
  return [ai.sM(`If you cannot answer. Answer ONLY "PANIC". No extra words.`)];
}
