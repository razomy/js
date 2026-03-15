import { translateText } from '../translate_text';

/**
 * Перевод с DE на FR
 */
export async function fr(text: string): Promise<string> {
    return await translateText(text, 'de', 'fr');
}

