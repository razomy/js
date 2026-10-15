import * as abstractions from '@razomy/abstractions';

export interface TextAiMessage {
  sender: 'system' | 'user' | 'assistant' | 'tool' | string;
  type: 'text' | 'request' | 'response';
  content: string;
}

export interface ToolsAiMessage {
  sender: 'system' | 'user' | string;
  type: 'tools';
  tools: abstractions.translators.FunctionHirn[];
}

export type AiMessage = TextAiMessage;

export interface AiLlmContext {
  messages: AiMessage[];
  tools: abstractions.translators.FunctionHirn[];
}
