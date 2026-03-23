import { TypedAnswerLlmException } from "../llms/must_use_tool_llm_exception";

export function parseNumber(text: string): number {
    const match = text.match(/-?\d+(\.\d+)?/g);
    if (!match) throw new TypedAnswerLlmException(text, 'A numeric value');
    if (match.length > 1) throw new TypedAnswerLlmException(text, 'Exactly one numeric value, not multiple');
    return parseFloat(match[0]);
}
