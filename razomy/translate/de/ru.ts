import { translateText } from '../translate_text';

/**
 * Перевод с DE на RU
 */
export async function ru(text: string): Promise<string> {
    return await translateText(text, 'de', 'ru');
}

