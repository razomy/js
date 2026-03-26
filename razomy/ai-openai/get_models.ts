import { OPENAI } from './openai';

export async function getModels() {
  const res = await OPENAI.models.list();
  console.log(res.data.map((i) => i.id));
  return res.data;
}
