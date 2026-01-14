import {Ctx, Serializable} from './serializable2';
import to_serializable_type from './to_serializable_type';

export default function ctx_serializable(ctx: Ctx): { [key: string]: Serializable } {
    const result: { [key: string]: Serializable } = {};
    for (const [k, v] of Object.entries(ctx.items())) {
    const s = to_serializable_type(v);
    if (s !== undefined) {
      result[k] = s;
    }
    }

    return result;
}
