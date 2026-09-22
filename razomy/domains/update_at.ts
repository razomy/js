import * as abstracts from "@razomy/abstracts";

export function updateAt(ctx: abstracts.domains.HasUpdatedAt) {
    ctx.updatedAt = new Date();
}
