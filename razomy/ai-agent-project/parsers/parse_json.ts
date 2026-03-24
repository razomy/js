import * as ai from "@razomy/ai";

export function parseJson<T>(text: string): T {
    try {
    const match = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
    if (match) {
      return JSON.parse(match[1]);
    }
    return JSON.parse(text);
    } catch {
    throw new ai.TypedAnswerLlmException(text,"АNot a valid JSON");
    }
}
