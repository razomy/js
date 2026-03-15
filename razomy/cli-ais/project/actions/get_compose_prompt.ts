import {s, u} from '../llms';

export function getComposePrompt(contexts: string[], query: string) {
    const contextStr = contexts.map((c, i) => `Context ${i + 1}:\n${c}`).join('\n\n');
    return [
    s(`Based on the provided contexts, formulate a final, concise, and accurate answer.`),
    u(`${contextStr}\n\nTask: ${query}`)
    ];
}
