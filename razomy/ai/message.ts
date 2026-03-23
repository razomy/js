import * as fns from "@razomy/fns";

export interface TextAiMessage {
  sender: 'system' | 'user' | string,
  type: 'text'
  content: string
}

export interface ToolsAiMessage {
  sender: 'system' | 'user' | string,
  type: 'tools'
  tools: fns.FunctionSpecification[],
}

export type AiMessage = TextAiMessage;

export interface AiLlmContext {
  messages: AiMessage[],
  tools: fns.FunctionSpecification[],
}
