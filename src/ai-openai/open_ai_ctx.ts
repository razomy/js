import type { OpenAI } from 'openai';

export interface OpenAiCtx {
  openai: OpenAI;
}

export interface HasOpenAiCtx {
  openai: OpenAiCtx;
}
