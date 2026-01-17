export function addSystemMessage(ctx, task) {
  const messages = ctx.messages || [];
  messages.push(
    {
      role: 'system',
      content: task,
    },
  );
  ctx.messages = messages;
}