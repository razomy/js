import * as random from '@razomy/random';

export function shuffleArray<T>(array: readonly T[]): T[] {
  const result: T[] = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j: number = random.createInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
