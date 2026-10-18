import * as ais from '@razomy/ais';

export function getComposePrompt(texts: string[], queryText: string) {
  const contextStr = texts.map((c, i) => `Context ${i + 1}:\n${c}`).join('\n\n');
  return [
    ais.chats.sM(`Based on the provided contexts, formulate a final, concise, and accurate answer.`),
    ais.chats.uM(`${contextStr}\n\nTask: ${queryText}`),
  ];
}
