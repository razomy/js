import * as translate from "@razomy/translate";

/**
 * Перевод с DE на EN
 */
export async function en(text: string): Promise<string> {
    return await translate.translateText(text, 'de', 'en');
}

