export async function sequentially<T extends Promise<any>[]>(values: T): Promise<{ [P in keyof T]: Awaited<T[P]>; }> {
  const res = [] as { [P in keyof T]: Awaited<T[P]>; };
  for (const fn of values) {
    const resN = await fn;
    res.push(resN);
  }
  return res;
}
