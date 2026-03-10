import Anthropic from '@anthropic-ai/sdk';
import {models} from '../batch/asks';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ANTHROPIC_API_KEY: string
    }
  }
}

const anthropic = new Anthropic({apiKey: process.env.ANTHROPIC_API_KEY});


export async function ask(req: string) {
  const msg = await anthropic.messages.create({
    model: models.cheap,
    max_tokens: 100,
    messages: [
      {
        role: 'user',
        content: req
      }
    ]
  });
  console.log(msg);
}
