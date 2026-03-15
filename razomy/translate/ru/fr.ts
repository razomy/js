import { translateText } from '../translateText';

/**
 * Перевод с RU на FR
 */
export async function fr(text: string): Promise<string> {
    return await translateText(text, 'ru', 'fr');
}

