import { CLIENT } from './client';

export async function getModels() {
  const res = await CLIENT.models.list();
  console.log(res.data.map((i) => i.id));
  return res.data;
}
