import * as translate from "@razomy/translate";

/**
 * Перевод с EN на RU
 */
export async function ru(text: string): Promise<string> {
    return await translate.translateText(text, 'en', 'ru');
}

