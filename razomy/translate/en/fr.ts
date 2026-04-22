import * as translateRemote from '@razomy/translate/remote';

/**
 * Перевод с EN на FR
 */
export async function fr(text: string): Promise<string> {
  return await translateRemote.translate(text, 'en', 'fr');
}
