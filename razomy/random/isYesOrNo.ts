import {createFloat} from './createFloat';

/**
 * Подбрасывает монетку
 */
export const isYesOrNo = (): boolean =>
  createFloat() > 0.5;