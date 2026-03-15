import { translateText } from '../translateText';

/**
 * Перевод с RU на DE
 */
export async function de(text: string): Promise<string> {
    return await translateText(text, 'ru', 'de');
}

