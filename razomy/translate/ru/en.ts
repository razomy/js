import { translateText } from '../translate_text';

/**
 * Перевод с RU на EN
 */
export async function en(text: string): Promise<string> {
    return await translateText(text, 'ru', 'en');
}

