import * as abstracts from "@razomy/abstracts";

/**
 * Утилита для создания номинальных типов (Branded Types)
 * Позволяет отличать type I8 = number от type U32 = number на уровне компилятора
 */
export type Brand<T, K> = T & { readonly brand: K } & abstracts.meta.IHas;
