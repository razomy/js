import * as random from "@razomy/random";

export function isYesOrNo(): boolean {
  return random.createFloat() > 0.5;
}
