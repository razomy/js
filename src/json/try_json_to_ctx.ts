import * as json from "@razomy/json";
import * as abstractions from "@razomy/abstractions";

export function tryJsonToCtx(ctx: json.Ctx, data: { [key: string]: abstractions.patterns.Serializable }) {
  for (const [k, v] of Object.entries(data)) {
    ctx.setIfDefault(k, v);
  }
}
