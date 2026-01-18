import {models} from 'razomy.openai';

export function setTokens(ctx) {
  const model = ctx.model || models.mild;
  const messagesText = JSON.stringify(ctx.messages) + JSON.stringify(ctx.functions);
  const updated = {model: model.name};
  Object.assign(ctx, updated);
  return ctx;
}
