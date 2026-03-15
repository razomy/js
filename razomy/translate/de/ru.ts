import { translateText } from '../translateText';

/**
 * Перевод с DE на RU
 */
export async function ru(text: string): Promise<string> {
    return await translateText(text, 'de', 'ru');
}

