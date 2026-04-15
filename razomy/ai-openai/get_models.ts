import * as aiOpenai from '@razomy/ai-openai';

export async function getModels() {
  const res = await aiOpenai.CLIENT.models.list();
  console.log(res.data.map((i) => i.id));
  return res.data;
}
