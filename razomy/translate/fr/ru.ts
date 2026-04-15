import * as translate from '@razomy/translate';

/**
 * Перевод с FR на RU
 */
export async function ru(text: string): Promise<string> {
  return await translate.translateText(text, 'fr', 'ru');
}
