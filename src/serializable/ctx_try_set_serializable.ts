import {Ctx, Serializable} from './serializable2';

export function ctx_try_set_serializable(ctx: Ctx, data: { [key: string]: Serializable }) {
    for (const [k, v] of Object.entries(data)) {
    ctx.setIfDefault(k, v);
    }
}
