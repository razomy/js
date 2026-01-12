export function has_sub(master: string[], sub: string[]): boolean {
  return sub.every(
    (i => v => i = master.indexOf(v, i) + 1)(0)
  );
}