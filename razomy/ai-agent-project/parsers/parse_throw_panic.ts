import {PanicAnswerLlmException} from "../llms/must_use_tool_llm_exception";

export function parseThrowPanic(text: string) {
  if (text.toLowerCase().includes('panic')) {
    throw new PanicAnswerLlmException(text, 'Not have panic');
  }
  return;
}
