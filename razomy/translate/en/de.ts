import { translateText } from '../translate_text';

/**
 * Перевод с EN на DE
 */
export async function de(text: string): Promise<string> {
    return await translateText(text, 'en', 'de');
}

