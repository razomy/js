// 1. Base interface that always exists
export interface BaseChain<V> {
  value(): V;
}

// 2. Empty interfaces ready for declaration merging (Augmentation)
export interface StringChainMethods {}

export interface ArrayChainMethods<V extends any[]> {}

// 3. The Magic: Conditional Type that applies methods based on V's type
export type Chain<V> = BaseChain<V> &
  (V extends string ? StringChainMethods : unknown) &
  (V extends any[] ? ArrayChainMethods<V> : unknown);

// 4. Utility to strip first argument and return the new Chain<Type>
export type StripFirstArg<F, T = any> = F extends (first: T, ...args: infer P) => infer R
  ? (...args: P) => Chain<R>
  : never;

export type Chainable<T, T2 = any> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? StripFirstArg<T[K], T2> : never;
};

// 5. Registry and Proxy
export class ChainRegistry {
  public plugins: Array<{ match: (val: any) => boolean; methods: Record<string, Function> }> = [];

  register(match: (val: any) => boolean, methods: Record<string, Function>) {
    this.plugins.push({ match, methods });
  }

  fp<T>(initialValue: T): Chain<T> {
    return fp(initialValue, this);
  }
}

export function fp<T>(initialValue: T, registry: ChainRegistry): Chain<T> {
  return new Proxy({} as Chain<T>, {
    get(_, prop) {
      if (prop === 'value') return () => initialValue;

      // Notice we use flat method access.
      for (const plugin of registry.plugins) {
        if (plugin.match(initialValue) && prop in plugin.methods) {
          const fn = plugin.methods[prop as string];
          return (...args: any[]) => fp(fn(initialValue, ...args), registry);
        }
      }
      throw new Error(`Method '${String(prop)}' not found for value ${initialValue}.`);
    },
  });
}
