import {generateFile} from './generate_file';

export function generateRandomCharacter() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
}

export const filePath = '../../../razomy.notation.editor.web.server/output.txt';

export const million = 1e+6;
export const tenMillion = 1e+7;
export const hundredMillion = 1e+8;
export const milliard = 1e+9;
export const billion = 1e+12;
export const trillion = 1e+18;
export const quadrillion = 1e+24;
export const quintillion = 1e+30;
export const sextillion = 1e+36;
export const septillion = 1e+42;
export const octillion = 1e+48;
export const nonillion = 1e+54;
export const decillion = 1e+60;
export const undecillion = 1e+66;
export const duodecillion = 1e+72;
export const tredecillion = 1e+78;
export const quattuordecillion = 1e+84;
export const quindecillion = 1e+90;
export const sexdecillion = 1e+96;
export const septendecillion = 1e+102;
export const octodecillion = 1e+108;
export const novemdecillion = 1e+114;
export const vigintillion = 1e+120;
export const centillion = 1e+600;

generateFile(filePath, tenMillion);
