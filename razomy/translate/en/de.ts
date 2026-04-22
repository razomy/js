import * as translateRemote from '@razomy/translate/remote';

/**
 * Перевод с EN на DE
 */
export async function de(text: string): Promise<string> {
  return await translateRemote.translate(text, 'en', 'de');
}
