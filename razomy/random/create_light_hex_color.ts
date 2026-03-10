import {createInt} from './create_int';

export function createLightHexColor () : string {
  const r = createInt(127, 255).toString(16).padStart(2, '0');
  const g = createInt(127, 255).toString(16).padStart(2, '0');
  const b = createInt(127, 255).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}