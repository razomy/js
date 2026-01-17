import {openai} from './openai';

export async function getModels() {
  const res = await openai.models.list();
  console.log(res.data.map(i => i.id));
  return res.data;
}
