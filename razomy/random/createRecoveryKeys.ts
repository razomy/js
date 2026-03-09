import {createInt} from './createInt';

/**
 * Генерирует безопасные ключи восстановления (XXXX-XXXX-XXXX-XXXX)
 */
export const createRecoveryKeys = (count: number = 10, blocks: number = 4, blockLength: number = 4): string[] => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({length: count}, () => {
    return Array.from({length: blocks}, () => {
      return Array.from({length: blockLength}, () => chars[createInt(0, chars.length - 1)]).join('');
    }).join('-');
  });
};