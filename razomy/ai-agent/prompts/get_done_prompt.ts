import * as ai from "@razomy/ai";

export function getDonePrompt() {
  return [ai.sM(`If you complete task. Answer ONLY "DONE". No extra words.`)];
}
