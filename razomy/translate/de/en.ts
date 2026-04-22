import * as translateRemote from '@razomy/translate/remote';

/**
 * Перевод с DE на EN
 */
export async function en(text: string): Promise<string> {
  return await translateRemote.translate(text, 'de', 'en');
}
