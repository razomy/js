import * as ai from "@razomy/ai";

export function getComposePrompt(texts: string[], queryText: string) {
    const contextStr = texts.map((c, i) => `Context ${i + 1}:\n${c}`).join('\n\n');
    return [
    ai.sM(`Based on the provided contexts, formulate a final, concise, and accurate answer.`),
    ai.uM(`${contextStr}\n\nTask: ${queryText}`)
    ];
}
