import * as translateRemote from '@razomy/translate/remote';

/**
 * Перевод с RU на FR
 */
export async function fr(text: string): Promise<string> {
  return await translateRemote.translate(text, 'ru', 'fr');
}
