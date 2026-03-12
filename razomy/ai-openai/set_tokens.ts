import { models } from '@razomy/ai-openai';

export function setTokens(ctx) {
  const model = ctx.model || models.mild;
  const updated = { model: model.name };
  Object.assign(ctx, updated);
  return ctx;
}
