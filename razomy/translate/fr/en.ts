import * as translate from "@razomy/translate";

/**
 * Перевод с FR на EN
 */
export async function en(text: string): Promise<string> {
    return await translate.translateText(text, 'fr', 'en');
}

