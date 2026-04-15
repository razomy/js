import * as translate from "@razomy/translate";

/**
 * Перевод с RU на FR
 */
export async function fr(text: string): Promise<string> {
    return await translate.translateText(text, 'ru', 'fr');
}

