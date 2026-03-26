import * as abstracts from "@razomy/abstracts";

export interface TextAiMessage {
  sender: 'system' | 'user' | string,
  type: 'text'
  content: string
}

export interface ToolsAiMessage {
  sender: 'system' | 'user' | string,
  type: 'tools'
  tools: abstracts.ast.FunctionDeclaration[],
}

export type AiMessage = TextAiMessage;

export interface AiLlmContext {
  messages: AiMessage[],
  tools: abstracts.ast.FunctionDeclaration[],
}
