import * as translate from "@razomy/translate";

/**
 * Перевод с RU на EN
 */
export async function en(text: string): Promise<string> {
    return await translate.translateText(text, 'ru', 'en');
}

