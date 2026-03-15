import { translateText } from '../translateText';

/**
 * Перевод с EN на DE
 */
export async function de(text: string): Promise<string> {
    return await translateText(text, 'en', 'de');
}

