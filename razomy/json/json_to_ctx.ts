import * as abstracts from "@razomy/abstracts";
import * as json from "@razomy/json";

export function jsonToCtx<T extends json.Ctx>(ctx: T, data: { [key: string]: abstracts.domains.Serializable }): T {
  for (const [k, v] of Object.entries(data)) {
    if (!ctx.has(k)) {
      ctx.set(k, v);
      continue;
    }

    const attribute = ctx.get(k);
    if (attribute === null) {
      ctx.set(k, v);
      continue;
    }

    if (typeof attribute === 'object' && 'fromSerializable' in attribute) {
      (attribute as abstracts.domains.WithSerializable).fromSerializable(v);
      continue;
    }

    if (v !== ctx.get(k)) {
      console.error(`Already set key=${k} v=${v} ctx[k]=${ctx.get(k)}.`);
      ctx.set(k, v);
    } else {
      if (k === 'ctx_id') continue;
      console.error(`Already set equal value key=${k} v=${v} ctx[k]=${ctx.get(k)}.`);
    }
  }
  return ctx;
}
