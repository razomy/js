import {OpenAI} from 'openai';

function openai(ctx: { openai: OpenAI }): { openai: OpenAI } {
  ctx.openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return ctx;
}

export default openai;
