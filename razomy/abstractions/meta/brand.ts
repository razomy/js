import * as abstractions from "@razomy/abstractions";

/**
 * Утилита для создания номинальных типов (Branded Types)
 * Позволяет отличать type I8 = number от type U32 = number на уровне компилятора
 */
export type Brand<T, K> = T & { readonly brand: K } & abstractions.meta.IHas;
