import * as aiOpenai from "@razomy/ai-openai";

export function setTokens(ctx) {
  const model = ctx.model || aiOpenai.models.mild;
  const updated = { model: model.name };
  Object.assign(ctx, updated);
  return ctx;
}
