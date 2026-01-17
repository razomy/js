import {get} from './get';

export async function getBool(query: string) {
  const r = await get(query);
  return r.toLowerCase().trim().startsWith('y');
}
