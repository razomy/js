import * as translate from '@razomy/translate';

/**
 * Перевод с DE на RU
 */
export async function ru(text: string): Promise<string> {
  return await translate.translateText(text, 'de', 'ru');
}
