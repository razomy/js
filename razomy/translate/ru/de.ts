import { translateText } from '../translate_text';

/**
 * Перевод с RU на DE
 */
export async function de(text: string): Promise<string> {
    return await translateText(text, 'ru', 'de');
}

