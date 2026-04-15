import * as aiOpenai from '@razomy/ai-openai';

export function setWeightAnTokens(request) {
  aiOpenai.setWeight(request);
  aiOpenai.setTokens(request);
}
