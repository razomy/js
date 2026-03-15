import { translateText } from '../translate_text';

/**
 * Перевод с EN на RU
 */
export async function ru(text: string): Promise<string> {
    return await translateText(text, 'en', 'ru');
}

