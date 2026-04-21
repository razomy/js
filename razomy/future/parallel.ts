export async function parallel<T extends Promise<any>[]>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]>; }> {
  return Promise.all(values)
}
