import * as ais from '@razomy/ais';

export function getPanicPrompt() {
  return [ais.chats.sM(`If you cannot answer. Answer ONLY "PANIC". No extra words.`)];
}

