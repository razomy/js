import * as translateRemote from '@razomy/translate/remote';

/**
 * Перевод с FR на DE
 */
export async function de(text: string): Promise<string> {
  return await translateRemote.translate(text, 'fr', 'de');
}
