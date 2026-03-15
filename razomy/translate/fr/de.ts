import { translateText } from '../translateText';

/**
 * Перевод с FR на DE
 */
export async function de(text: string): Promise<string> {
    return await translateText(text, 'fr', 'de');
}

