import { TypedAnswerLlmException } from "../llms/must_use_tool_llm_exception";

export function parseArray(text: string): string[] {
    const jsonMatch = text.match(/\[.*\]/s);
    if (!jsonMatch) throw new TypedAnswerLlmException(text, 'A valid JSON array pattern');
    let parsed;
    try {
    parsed = JSON.parse(jsonMatch[0]);
    } catch {
    throw new TypedAnswerLlmException(text, 'Parsable JSON string');
    }

    if (!Array.isArray(parsed)) {
    throw new TypedAnswerLlmException(text, 'JSON array, not an object');
    }

    return parsed;
}
