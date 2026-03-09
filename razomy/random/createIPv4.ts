import {createInt} from './createInt';

export const createIPv4 = (): string =>
  Array.from({length: 4}, () => createInt(0, 255)).join('.');