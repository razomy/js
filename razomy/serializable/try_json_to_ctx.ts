import {Serializable} from './serializable';

import {Ctx} from './ctx';

export function tryJsonToCtx(ctx: Ctx, data: { [key: string]: Serializable }) {
  for (const [k, v] of Object.entries(data)) {
    ctx.setIfDefault(k, v);
  }
}
