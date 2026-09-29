type Predicate<T> = (value: T) => boolean;
type TypeGuard<T, S extends T> = (value: T) => value is S;

// Добавили второй дженерик Remaining — остаток необработанных типов
export interface Switch<T, Remaining, R> {
  // 1. Точное значение — вычитаем тип V из оставшихся: Exclude<Remaining, V>
  with_<V extends Remaining, U>(
    expected: V,
    handler: (value: V) => U
  ): Switch<T, Exclude<Remaining, V>, R | U>;

  // 2. TypeGuard (Smart Cast) — вычитаем тип S из оставшихся: Exclude<Remaining, S>
  with_<S extends Remaining, U>(
    guard: TypeGuard<Remaining, S>,
    handler: (value: S) => U
  ): Switch<T, Exclude<Remaining, S>, R | U>;

  // 3. Предикат (условие) — не вычитает типы, т.к. TS не знает, что именно отфильтровано
  with_<U>(
    predicate: Predicate<Remaining>,
    handler: (value: Remaining) => U
  ): Switch<T, Remaining, R | U>;

  // Ветка по умолчанию (если хотим разрешить неполное покрытие)
  otherwise<U>(fallback: (value: Remaining) => U): R | U;

  // 🔥 МЕТОД ПРОВЕРКИ НА ИСЧЕРПЫВАЕМОСТЬ:
  // this может быть только Switch с Remaining = never.
  // Если что-то осталось, TS выдаст ошибку!
  exhaustive(this: Switch<any, never, R>): R;
}

export function switch_<T>(value: T): Switch<T, any, any> {
  let matched = false;
  let result: any;

  const actualValue =
    value !== null && typeof value === 'object' && 'valueOf' in value
      ? (value as any).valueOf()
      : value;

  const matcher: Switch<T, never, any> = {
    with_(condition: any, handler: any) {
      if (matched) return matcher;

      const isMatch =
        typeof condition === 'function'
          ? condition(actualValue)
          : condition === actualValue;

      if (isMatch) {
        matched = true;
        result = handler(actualValue);
      }

      return matcher;
    },

    otherwise(fallback) {
      if (matched) return result;
      return fallback(actualValue as never);
    },

    exhaustive() {
      if (matched) return result;
      // В рантайме бросаем исключение, если TS обошли через any
      throw new Error(`Non-exhaustive switch. Unhandled value: ${JSON.stringify(actualValue)}`);
    }
  };

  return matcher;
}

