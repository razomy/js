import {createInt} from './createInt';

export const createMAC = (): string =>
  Array.from({length: 6}, () => createInt(0, 255).toString(16).padStart(2, '0')).join(':').toUpperCase();