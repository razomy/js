import {setWeightAnTokens} from './set_weight_an_tokens';

import {openai} from './openai';

export async function apiMessage(request) {
  setWeightAnTokens(request);
  const response = await openai.chat.completions.create(request);
  return response.choices[0].message;
}
