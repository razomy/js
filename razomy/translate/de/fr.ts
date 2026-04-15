import * as translate from "@razomy/translate";

/**
 * Перевод с DE на FR
 */
export async function fr(text: string): Promise<string> {
    return await translate.translateText(text, 'de', 'fr');
}

