import { translateText } from '../translate_text';

/**
 * Перевод с DE на EN
 */
export async function en(text: string): Promise<string> {
    return await translateText(text, 'de', 'en');
}

