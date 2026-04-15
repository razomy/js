import * as serializable from "@razomy/serializable";

export function tryJsonToCtx(ctx: serializable.Ctx, data: { [key: string]: serializable.Serializable }) {
  for (const [k, v] of Object.entries(data)) {
    ctx.setIfDefault(k, v);
  }
}
