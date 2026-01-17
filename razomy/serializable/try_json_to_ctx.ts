import {Serializable} from './serializable';

import {Ctx} from './ctx';

export function try_json_to_ctx(ctx: Ctx, data: { [key: string]: Serializable }) {
    for (const [k, v] of Object.entries(data)) {
    ctx.setIfDefault(k, v);
    }
}
