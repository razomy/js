import { setWeightAnTokens } from './set_weight_an_tokens';

import { CLIENT } from './client';

export async function apiMessage(request) {
  setWeightAnTokens(request);
  const response = await CLIENT.chat.completions.create(request);
  return response.choices[0].message;
}
