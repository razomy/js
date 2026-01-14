export type Serializable = string | number | boolean | null | Serializable[] | { [key: string]: Serializable };

export interface ISerializable {
  toSerializable(): Serializable;

  fromSerializable(data: Serializable): void;
}

export interface Ctx {
  has(key: string): boolean;

  get(key: string): any;

  set(key: string, value: any): void;

  setIfDefault(key: string, value: any): void;

  items(): { [key: string]: any };
}

export default function pipe_ctx_serializable<T extends Ctx>(ctx: T, data: { [key: string]: Serializable }): T {
  for (const [k, v] of Object.entries(data)) {
    if (v === null) continue;

    if (!ctx.has(k)) {
      ctx.set(k, v);
      continue;
    }

    const attribute = ctx.get(k);

    if (attribute === null) {
      ctx.set(k, v);
      continue;
    }

    if (typeof attribute === 'object' && 'fromSerializable' in attribute) {
      (attribute as ISerializable).fromSerializable(v);
      continue;
    }

    if (v !== ctx.get(k)) {
      console.error(`Already set key=${k} v=${v} ctx[k]=${ctx.get(k)}.`);
      ctx.set(k, v);
    } else {
      if (k === 'ctx_id') continue;
      console.error(`Already set equal value key=${k} v=${v} ctx[k]=${ctx.get(k)}.`);
    }
  }
  return ctx;
}
