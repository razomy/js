import * as abstracts from "@razomy/abstracts";

export function createAt(ctx: abstracts.domains.HasCreatedAt) {
    ctx.createdAt = new Date();
}
