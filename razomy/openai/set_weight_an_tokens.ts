import {setTokens} from './set_tokens';
import {setWeight} from './set_weight';

export function setWeightAnTokens(request) {
  setWeight(request);
  setTokens(request);
}
