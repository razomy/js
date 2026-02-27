/**
 * Набор калькуляторов для преобразования реального размера данных (n)
 * в линеаризованный dataSize для эстиматора.
 */

/** O(1) - Константная сложность. Эстиматор будет возвращать всегда одно и то же время. */
export const constant = (n: number = 0) => 1;

/** O(log n) - Логарифмическая. Защищаем от log(0), который равен -Infinity. */
export const log_n = (n: number) => (n > 0 ? Math.log2(n) : 0);

/** O(n) - Линейная сложность. */
export const n = (n: number) => n;

/** O(n log n) - Линеаритмическая. Часто встречается во встроенных сортировках. */
export const n_log_n = (n: number) => (n > 0 ? n * Math.log2(n) : 0);

/** O(n^2) - Квадратичная. */
export const n_squared = (n: number) => Math.pow(n, 2);

/** O(n^3) - Кубическая. */
export const n_cubed = (n: number) => Math.pow(n, 3);

/** O(2^n) - Экспоненциальная. Осторожно: числа будут расти ОЧЕНЬ быстро. */
export const exponential = (n: number) => Math.pow(2, n);

export const array_n = (arr: any[]) => n(arr.length)
