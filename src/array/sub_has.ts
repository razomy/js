export function sub_has(master: string[], sub: string[]): boolean {
  return sub.every(
    (i => v => i = master.indexOf(v, i) + 1)(0)
  );
}


