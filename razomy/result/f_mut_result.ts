
export function fMutResult<C extends { results: R }, R extends any[], V>(f: (c: C, r: R) => V) {
  return (c: C) => ({...c, result: f(c, c.results)})
}
