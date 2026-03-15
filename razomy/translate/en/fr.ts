import { translateText } from '../translateText';

/**
 * Перевод с EN на FR
 */
export async function fr(text: string): Promise<string> {
    return await translateText(text, 'en', 'fr');
}

