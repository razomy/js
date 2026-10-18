import * as aiOpenai from '@razomy/ai-openai';

export async function apiMessage(request) {
  aiOpenai.setWeightAnTokens(request);
  const response = await aiOpenai.CLIENT.chat.completions.create(request);
  return response.choices[0].message;
}
