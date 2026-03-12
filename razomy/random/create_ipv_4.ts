import * as random from "@razomy/random";

export function createIpv4(): string {
  return `${random.createInt(0, 255)}.${random.createInt(0, 255)}.${random.createInt(0, 255)}.${random.createInt(0, 255)}`;
}
