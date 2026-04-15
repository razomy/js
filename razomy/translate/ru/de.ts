import * as translate from "@razomy/translate";

/**
 * Перевод с RU на DE
 */
export async function de(text: string): Promise<string> {
    return await translate.translateText(text, 'ru', 'de');
}

