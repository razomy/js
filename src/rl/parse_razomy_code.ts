import * as rl from "@razomy/rl";

export function parseRazomyCode(text: string) {
    const lexResult = rl.tokenize(text);
    if (lexResult.errors.length > 0) {
    console.error("Ошибки лексера:", lexResult.errors);
    return null;
    }

    const ast = rl.PARSER.parse(lexResult.tokens);
    if (rl.PARSER.errors.length > 0) {
    console.error("ОШИБКИ ПАРСИНГА:", rl.PARSER.errors);
    return null;
    }

    return ast;
}
