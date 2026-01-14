import {OpenAI} from 'openai';

export interface OpenAiCtx {
    openai: OpenAI
}

export interface WithOpenAiCtx {
    openai: OpenAiCtx
}
