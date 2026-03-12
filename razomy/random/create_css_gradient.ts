import * as random from "@razomy/random";

const maxRgb = 0xffffff;

export function createCssGradient(): string {
  const angle = random.createInt(0, 360);
  const color1 = `#${random.createInt(0, maxRgb).toString(16).padStart(6, '0')}`;
  const color2 = `#${random.createInt(0, maxRgb).toString(16).padStart(6, '0')}`;

  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}
