export function addUserMessage(ctx, task) {
  const messages = ctx.messages || [];
  messages.push(
    {
      role: 'user',
      content: task,
    },
  );
  ctx.messages = messages;
}
