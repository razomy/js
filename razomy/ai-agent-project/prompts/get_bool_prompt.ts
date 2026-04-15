import * as ai from '@razomy/ai';

export function getBoolPrompt() {
  return [ai.sM(`You are a strict logic analyzer. Answer ONLY "true", "false", or "panic". No extra words.`)];
}
