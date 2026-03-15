import { translateText } from '../translateText';

/**
 * Перевод с FR на EN
 */
export async function en(text: string): Promise<string> {
    return await translateText(text, 'fr', 'en');
}

