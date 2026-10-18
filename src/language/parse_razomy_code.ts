import * as language from "@razomy/language";

export function parseRazomyCode(text: string) {
    const lexResult = language.tokenize(text);
    if (lexResult.errors.length > 0) {
    console.error("Ошибки лексера:", lexResult.errors);
    return null;
    }

    const ast = language.PARSER.parse(lexResult.tokens);
    if (language.PARSER.errors.length > 0) {
    console.error("ОШИБКИ ПАРСИНГА:", language.PARSER.errors);
    return null;
    }

    return ast;
}
