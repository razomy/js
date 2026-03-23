export function mapToDict<T, K extends keyof T>(arr: T[], key: K): Record<string | number | symbol, T> {
  return arr.reduce((acc, item) => {
    // Correctly index item[key] and assign to accumulator
    acc[item[key] as any] = item;
    return acc;
  }, {} as Record<string | number | symbol, T>);
}
