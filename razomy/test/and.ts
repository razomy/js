export function and(...value: boolean[]) {
  return value.reduce((acc, cur) => acc && cur, true);
}
