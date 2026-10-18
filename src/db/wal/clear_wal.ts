import * as db from "@razomy/db";

export function clearWal(ctx: db.wal.Wal) {
    ctx.walHead = 0;
}
