import * as language from "@razomy/language";

// Порядок правил строго соответствует ALL_TOKENS из оригинала
const tokenDefs: TokenDef[] = [
  { type: "WhiteSpace", regex: /^[ \t\f\r]+/, skip: true },
  { type: "DocComment", regex: /^#[^#]*#/, skip: true },
  { type: "LineComment", regex: /^\/\/[^\r\n]*/, skip: true },
  { type: "CRLF2", regex: /^\r?\n/ },

  // Скобки
  { type: "LBrace", regex: /^\{/ },
  { type: "RBrace", regex: /^\}/ },
  { type: "LBracket", regex: /^\[/ },
  { type: "RBracket", regex: /^\]/ },
  { type: "LParen", regex: /^\(/ },
  { type: "RParen", regex: /^\)/ },

  // Операторы пайплайна (Морфизмы)
  { type: "DotGt", regex: /^\.>/ },
  { type: "DotAmp", regex: /^\.&/ },
  { type: "DotPipe", regex: /^\.\|/ },
  { type: "DotQm", regex: /^\.\?/ },
  { type: "DotRange", regex: /^\.\./ },
  { type: "PipeDot", regex: /^\.(?=[ \t\r\n\{\[\(])/ },

  // Сравнение, логика, сдвиги и степень
  { type: "EqEq", regex: /^==/ },
  { type: "NotEq", regex: /^!=/ },
  { type: "Lte", regex: /^<=/ },
  { type: "Gte", regex: /^>=/ },
  { type: "AndAnd", regex: /^&&/ },
  { type: "OrOr", regex: /^\|\|/ },
  { type: "Pow", regex: /^\*\*/ },
  { type: "ShiftL", regex: /^<</ },
  { type: "ShiftR", regex: /^>>/ },
  { type: "LAngle", regex: /^</ },
  { type: "RAngle", regex: /^>/ },
  { type: "Eq", regex: /^=/ },

  // Алгебра типов и арифметика
  { type: "Amp", regex: /^&/ },
  { type: "Pipe", regex: /^\|/ },
  { type: "Slash", regex: /^\// },
  { type: "Plus", regex: /^\+/ },
  { type: "Minus", regex: /^-/ },
  { type: "Mul", regex: /^\*/ },
  { type: "Mod", regex: /^%/ },
  { type: "Bang", regex: /^!/ },
  { type: "Qm", regex: /^\?/ },

  // Разделители
  { type: "Comma", regex: /^,/ },
  { type: "Colon", regex: /^:/ },
  { type: "Semicolon", regex: /^;/ },

  // Литералы и идентификаторы
  { type: "True", regex: /^true\b/ },
  { type: "False", regex: /^false\b/ },
  { type: "Identifier", regex: /^(?:[a-zA-Z][a-zA-Z0-9_]*|_[a-zA-Z0-9_]+)/ },
  { type: "Underscore", regex: /^_/ },
  { type: "Number", regex: /^(?:0x[0-9a-fA-F]+|[0-9]+\.[0-9]+|[0-9]+)/ },
  { type: "String", regex: /^(?:"([^"\\]|\\.)*"|'([^'\\]|\\.)*')/ },

  // Обычная точка
  { type: "Dot", regex: /^\./ }
];


interface TokenDef {
  type: language.TokenType;
  regex: RegExp;
  skip?: boolean;
}

export function tokenize(text: string): { tokens: language.Token[]; errors: language.LexerError[] } {
    const tokens: language.Token[] = [];
    const errors: language.LexerError[] = [];
    let offset = 0;
    let line = 1;
    let column = 1;
    while (offset < text.length) {
    const slice = text.slice(offset);
    let matched = false;

    for (const def of tokenDefs) {
      const match = def.regex.exec(slice);
      if (match) {
        const image = match[0];
        if (!def.skip) {
          tokens.push({ type: def.type, image, offset, line, column });
        }

        // Обновляем координаты строк и колонок
        const lines = image.split(/\r?\n/);
        if (lines.length > 1) {
          line += lines.length - 1;
          column = lines[lines.length - 1].length + 1;
        } else {
          column += image.length;
        }

        offset += image.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      errors.push({
        message: `Неизвестный символ: '${text[offset]}'`,
        offset,
        line,
        column
      });
      offset++;
      column++;
    }
    }

    tokens.push({ type: "EOF", image: "", offset, line, column });
    return { tokens, errors };
}
