import {createInt} from './create_int';

export function shuffleArray <T> (array: T[]) : T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = createInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}