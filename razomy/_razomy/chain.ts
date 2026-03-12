import * as string from '@razomy/string';
import * as stringCase from '@razomy/string-case';
import * as array from '@razomy/array';
import * as dict from '@razomy/dict';
import * as object from '@razomy/object';
import * as pipes from "@razomy/pipes";

declare module '@razomy/pipes' {
  interface StringChainMethods extends pipes.Chainable<typeof string>, pipes.Chainable<typeof stringCase> {}

  interface ArrayChainMethods<V extends any[]>
    extends Omit<Omit<pipes.Chainable<typeof array & typeof dict>, 'filter'>, 'map'> {
    filter(predicate: (item: V[number], index: number) => boolean): pipes.Chain<V>;

    map<U>(mapper: (item: V[number], index: number) => U): pipes.Chain<U[]>;
  }
}

// RUNTIME REGISTRATION
export const registry = new pipes.ChainRegistry();
registry.register((val) => string.isString(val), { ...string, ...stringCase });
registry.register((val) => array.isArray(val), array);
registry.register((val) => object.isObject(val), dict);

export const fp = registry.fp.bind(registry);
