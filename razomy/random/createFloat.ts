/**
 * Генерирует криптографически безопасное случайное число от 0 (включительно) до 1 (не включая 1).
 */
export const createFloat = (): number => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] / (0xFFFFFFFF + 1);
};