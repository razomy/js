import * as ais from "@razomy/ais";

export function getDonePrompt() {
  return [ais.chats.sM(`If you complete task. Answer ONLY "DONE". No extra words.`)];
}
