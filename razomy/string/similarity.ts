import {levenshtein_distance} from './levenshtein_distance';

export function similarity(str_1: string, str_2: string): number {
  const length = Math.max(str_1.length, str_2.length);
  const distance = levenshtein_distance(str_1, str_2);
  return 1 - distance / length;
}


