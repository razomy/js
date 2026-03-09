import {createFloat} from './createFloat';

/**
 * Генерирует криптографически безопасное целое число в диапазоне [min, max]
 */
export const createInt = (min: number = 0, max: number = 100): number => {
  return Math.floor(createFloat() * (max - min + 1)) + min;
};