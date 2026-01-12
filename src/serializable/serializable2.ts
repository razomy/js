type Serializable = string | number | boolean | null | Serializable[] | { [key: string]: Serializable };

interface ISerializable {
  toSerializable(): Serializable;

  fromSerializable(data: Serializable): void;
}

interface Ctx {
  has(key: string): boolean;

  get(key: string): any;

  set(key: string, value: any): void;

  setIfDefault(key: string, value: any): void;

  items(): { [key: string]: any };
}

function pipe_ctx_serializable<T extends Ctx>(ctx: T, data: { [key: string]: Serializable }): T {
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

function to_serializable_type(value: any): Serializable | undefined {
  if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) {
    return value;
  } else if (Array.isArray(value)) {
    return ctx_serializables(value);
  } else if (typeof value === 'object') {
    if ('toSerializable' in value) {
      return (value as ISerializable).toSerializable();
    }
    return ctx_serializable(value);
  }
  return undefined;
}

function serializable_ctx(d: { [key: string]: any }): { [key: string]: Serializable } {
  const result: { [key: string]: Serializable } = {};
  for (const [k, v] of Object.entries(d)) {
    const s = to_serializable_type(v);
    if (s !== undefined) {
      result[k] = s;
    }
  }
  return result;
}

function ctx_serializables(data: any[]): Serializable[] {
  return data.map(to_serializable_type).filter(s => s !== undefined) as Serializable[];
}

function ctx_serializable(ctx: Ctx): { [key: string]: Serializable } {
  const result: { [key: string]: Serializable } = {};
  for (const [k, v] of Object.entries(ctx.items())) {
    const s = to_serializable_type(v);
    if (s !== undefined) {
      result[k] = s;
    }
  }
  return result;
}

function ctx_try_set_serializable(ctx: Ctx, data: { [key: string]: Serializable }) {
  for (const [k, v] of Object.entries(data)) {
    ctx.setIfDefault(k, v);
  }
}
