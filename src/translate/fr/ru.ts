import * as translateRemote from '@razomy/translate/remote';

/**
 * Перевод с FR на RU
 */
export async function ru(text: string): Promise<string> {
  return await translateRemote.translate(text, 'fr', 'ru');
}
