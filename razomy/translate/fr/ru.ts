import { translateText } from '../translate_text';

/**
 * Перевод с FR на RU
 */
export async function ru(text: string): Promise<string> {
    return await translateText(text, 'fr', 'ru');
}

