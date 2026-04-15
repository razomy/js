import Anthropic from '@anthropic-ai/sdk';

export const MODELS = {
  cheap: 'claude-sonnet-4-6',
  expensive: 'claude-opus-4-6',
};

export const MAX_TOKENS = 5024;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANTHROPIC_API_KEY: string;
    }
  }
}

export const CLIENT = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
