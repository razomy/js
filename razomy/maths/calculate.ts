import * as math from 'mathjs';

export function calculate(text:string) {
  return math.evaluate(text)
}