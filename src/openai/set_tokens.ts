import { models } from "razomy.openai/models";

export function set_tokens(ctx) {
    const model = ctx.model || models.mild;
    const messages_text = JSON.stringify(ctx.messages) + JSON.stringify(ctx.functions);
    const updated = { model: model.name };
    Object.assign(ctx, updated);
    return ctx;
}
