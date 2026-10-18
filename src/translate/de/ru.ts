import * as translateRemote from '@razomy/translate/remote';

/**
 * Перевод с DE на RU
 */
export async function ru(text: string): Promise<string> {
  return await translateRemote.translate(text, 'de', 'ru');
}
