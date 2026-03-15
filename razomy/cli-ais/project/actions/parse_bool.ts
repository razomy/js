import { TypedAnswerLlmException } from "../llms/must_use_tool_llm_exception";

export function parseBool(text: string): boolean {
    const match = text.match(/\b(true|false|yes|no|1|0|panic)\b/i);
    if (!match) throw new TypedAnswerLlmException(text, 'true, false or panic');
    const val = match[1].toLowerCase();
    const isYes = ['true', 'yes', '1'].includes(val);
    const isNo = ['false', 'no', '0'].includes(val);
    if (isYes && isNo) throw new TypedAnswerLlmException(text, 'Cannot contain true and false at the same time');
    if (isYes) return true;
    if (isNo) return false;
    throw new TypedAnswerLlmException(text, 'true or false');
}
