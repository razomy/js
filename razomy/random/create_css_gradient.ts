import {createInt} from './create_int';

export function createCssGradient () : string {
  const angle = createInt(0, 360);
  // 16777215 это FFFFFF в десятичной системе
  const color1 = `#${createInt(0, 16777215).toString(16).padStart(6, '0')}`;
  const color2 = `#${createInt(0, 16777215).toString(16).padStart(6, '0')}`;
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}