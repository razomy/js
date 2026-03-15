import { translateText } from '../translate_text';

/**
 * Перевод с EN на FR
 */
export async function fr(text: string): Promise<string> {
    return await translateText(text, 'en', 'fr');
}

