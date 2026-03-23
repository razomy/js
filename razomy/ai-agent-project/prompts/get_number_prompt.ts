import * as ai from "@razomy/ai";

export function getNumberPrompt() {
    return [ai.sM(`You are a math parser. Return ONLY a number, or "panic" if you cannot answer. No text, no explanations.`)];
}
