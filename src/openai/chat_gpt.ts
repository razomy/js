import OpenAI from 'openai';

export const openai = new OpenAI();


export function add_system_message(ctx, task) {
  const messages = ctx.messages || [];
  messages.push(
    {
      role: 'system',
      content: task,
    },
  );
  ctx.messages = messages;
}
