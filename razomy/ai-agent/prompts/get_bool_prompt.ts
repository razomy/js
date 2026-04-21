import * as ai from '@razomy/ai';

export function getBoolPrompt() {
  return [ai.sM(`You are a strict logic analyzer. Answer ONLY "TRUE", "FALSE", or "PANIC". No extra words.`)];
}
