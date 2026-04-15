import * as shell from '@razomy/shell';

export async function getBool(query: string) {
  const r = await shell.get(query);
  return r.toLowerCase().trim().startsWith('y');
}
