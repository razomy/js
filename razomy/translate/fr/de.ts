import { translateText } from '../translate_text';

/**
 * Перевод с FR на DE
 */
export async function de(text: string): Promise<string> {
    return await translateText(text, 'fr', 'de');
}

