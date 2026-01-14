import {OpenAI} from 'openai';

export default function create_openai(ctx: { openai: OpenAI }): { openai: OpenAI } {
  ctx.openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return ctx;
}


