import {Ctx, Serializable} from './pipe_ctx_serializable';

export function ctx_try_set_serializable(ctx: Ctx, data: { [key: string]: Serializable }) {
    for (const [k, v] of Object.entries(data)) {
    ctx.setIfDefault(k, v);
    }
}
