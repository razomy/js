import * as json from "@razomy/json";
import * as abstracts from "@razomy/abstracts";

export function tryJsonToCtx(ctx: json.Ctx, data: { [key: string]: abstracts.domains.Serializable }) {
  for (const [k, v] of Object.entries(data)) {
    ctx.setIfDefault(k, v);
  }
}
