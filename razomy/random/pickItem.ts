import {createInt} from './createInt';

/**
 * Случайный выбор элемента
 */
export const pickItem = <T>(array: T[]): T | undefined => {
  if (array.length === 0) return undefined;
  return array[createInt(0, array.length - 1)];
};