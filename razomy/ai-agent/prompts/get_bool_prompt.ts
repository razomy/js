import * as ais from '@razomy/ais';

export function getBoolPrompt() {
  return [ais.chats.sM(`You are a strict logic analyzer. Answer ONLY "TRUE", "FALSE", or "PANIC". No extra words.`)];
}
