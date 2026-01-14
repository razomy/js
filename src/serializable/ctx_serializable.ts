import {Ctx, Serializable, to_serializable_type} from './serializable2';

export function ctx_serializable(ctx: Ctx): { [key: string]: Serializable } {
    const result: { [key: string]: Serializable } = {};
    for (const [k, v] of Object.entries(ctx.items())) {
    const s = to_serializable_type(v);
    if (s !== undefined) {
      result[k] = s;
    }
    }

    return result;
}
