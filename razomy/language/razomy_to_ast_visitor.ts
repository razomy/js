// =============================================================================
// 1. ТИПЫ И ЛЕКСЕР (Razomy Pure TS Lexer V4.0)
// =============================================================================

export type TokenType =
  | "WhiteSpace" | "DocComment" | "LineComment" | "CRLF2"
  | "LBrace" | "RBrace" | "LBracket" | "RBracket" | "LParen" | "RParen"
  | "DotGt" | "DotAmp" | "DotPipe" | "DotQm" | "DotRange" | "PipeDot" | "Dot"
  | "EqEq" | "NotEq" | "Lte" | "Gte" | "AndAnd" | "OrOr" | "Pow" | "ShiftL" | "ShiftR" | "LAngle" | "RAngle" | "Eq"
  | "Amp" | "Pipe" | "Slash" | "Plus" | "Minus" | "Mul" | "Mod" | "Bang" | "Qm"
  | "Comma" | "Colon" | "Semicolon" | "Underscore"
  | "True" | "False" | "Identifier" | "Number" | "String"
  | "EOF";

export interface Token {
  type: TokenType;
  image: string;
  offset: number;
  line: number;
  column: number;
}

export interface LexerError {
  message: string;
  offset: number;
  line: number;
  column: number;
}

interface TokenDef {
  type: TokenType;
  regex: RegExp;
  skip?: boolean;
}

// Порядок правил строго соответствует ALL_TOKENS из оригинала
const TOKEN_DEFS: TokenDef[] = [
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

export function tokenize(text: string): { tokens: Token[]; errors: LexerError[] } {
  const tokens: Token[] = [];
  const errors: LexerError[] = [];
  let offset = 0;
  let line = 1;
  let column = 1;

  while (offset < text.length) {
    const slice = text.slice(offset);
    let matched = false;

    for (const def of TOKEN_DEFS) {
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

// =============================================================================
// 2. СИНТАКСИЧЕСКИЙ АНАЛИЗАТОР (Recursive Descent -> AST V4.0)
// =============================================================================

export class RazomyParser {
  private tokens: Token[] = [];
  private pos = 0;
  public errors: string[] = [];

  public parse(tokens: Token[]) {
    this.tokens = tokens;
    this.pos = 0;
    this.errors = [];
    return this.razomyFile();
  }

  // --- Утилиты навигации по токенам ---

  private LA(howMuch = 1): Token {
    const idx = this.pos + howMuch - 1;
    if (idx >= this.tokens.length) {
      return this.tokens[this.tokens.length - 1]; // EOF
    }
    return this.tokens[idx];
  }

  private match(...types: TokenType[]): boolean {
    const current = this.LA(1).type;
    return types.includes(current);
  }

  private consume(...expected: TokenType[]): Token {
    const tok = this.LA(1);
    if (expected.length === 0 || expected.includes(tok.type)) {
      this.pos++;
      return tok;
    }
    this.errors.push(
      `Ошибка парсинга [${tok.line}:${tok.column}]: Ожидался ${expected.join(" или ")}, но получен ${tok.type} ('${tok.image}')`
    );
    this.pos++;
    return tok;
  }

  // Аналог GATE: () => this.isOperatorAhead(...)
  private isOperatorAhead(expectedTokens: TokenType[]): boolean {
    let idx = 1;
    let tok = this.LA(idx);
    while (tok.type === "CRLF2") {
      idx++;
      tok = this.LA(idx);
    }
    return expectedTokens.includes(tok.type);
  }

  // Проверка, может ли текущий токен быть началом выражения `expr`
  private canStartExpr(): boolean {
    return this.match(
      "Bang", "Minus",
      "Number", "String", "True", "False",
      "LBrace", "LBracket", "LParen",
      "Identifier", "Underscore"
    );
  }

  // --- Правила грамматики (сразу возвращают узлы AST) ---

  // 1. Корень файла: razomyFile ::= (CRLF2 | SEMICOLON | declaration)*
  public razomyFile() {
    const body: any[] = [];
    while (!this.match("EOF")) {
      if (this.match("CRLF2", "Semicolon")) {
        this.consume();
      } else if (this.canStartExpr()) {
        body.push(this.declaration());
      } else {
        const badTok = this.consume();
        this.errors.push(
          `Неожиданный токен на верхнем уровне [${badTok.line}:${badTok.column}]: ${badTok.type} ('${badTok.image}')`
        );
      }
    }
    return { type: "File", body };
  }

  // 2. Декларация: declaration ::= expr expr*
  private declaration() {
    const exprs: any[] = [];
    do {
      exprs.push(this.expr());
    } while (this.canStartExpr());

    return {
      type: "Declaration",
      left: exprs[0],
      right: exprs.length > 1 ? exprs[1] : null,
      extra: exprs.slice(2),
      exprs
    };
  }

  private expr(): any {
    return this.pipelineExpr();
  }

  // Универсальный сборщик левоассоциативных бинарных операторов с пропуском CRLF2
  private parseBinaryChain(
    subrule: () => any,
    operators: TokenType[],
    astType: string
  ): any {
    let result = subrule();
    while (this.isOperatorAhead(operators)) {
      while (this.match("CRLF2")) this.consume("CRLF2");
      const op = this.consume(...operators);
      while (this.match("CRLF2")) this.consume("CRLF2");
      const right = subrule();
      result = {
        type: astType,
        operator: op.image,
        left: result,
        right
      };
    }
    return result;
  }

  // 1. Цепочки пайплайнов
  private pipelineExpr() {
    return this.parseBinaryChain(
      () => this.unionExpr(),
      ["DotGt", "DotAmp", "DotPipe", "DotQm", "DotRange", "PipeDot"],
      "PipelineExpr"
    );
  }

  // 2. Алгебра типов и морфизмов (|, &, /)
  private unionExpr() {
    return this.parseBinaryChain(() => this.mergeExpr(), ["Pipe"], "UnionExpr");
  }

  private mergeExpr() {
    return this.parseBinaryChain(() => this.subtractExpr(), ["Amp"], "MergeExpr");
  }

  private subtractExpr() {
    return this.parseBinaryChain(() => this.logicExpr(), ["Slash"], "SubtractExpr");
  }

  // 3. Булева логика и Сравнения
  private logicExpr() {
    return this.parseBinaryChain(() => this.compareExpr(), ["AndAnd", "OrOr"], "LogicExpr");
  }

  private compareExpr() {
    return this.parseBinaryChain(
      () => this.shiftExpr(),
      ["EqEq", "NotEq", "Lte", "Gte", "LAngle", "RAngle", "Eq"],
      "CompareExpr"
    );
  }

  // 4. Битовые сдвиги и Арифметика
  private shiftExpr() {
    return this.parseBinaryChain(() => this.addExpr(), ["ShiftL", "ShiftR"], "ShiftExpr");
  }

  private addExpr() {
    return this.parseBinaryChain(() => this.mulExpr(), ["Plus", "Minus"], "MathExpr");
  }

  private mulExpr() {
    return this.parseBinaryChain(() => this.powExpr(), ["Mul", "Mod"], "MathExpr");
  }

  private powExpr() {
    return this.parseBinaryChain(() => this.unaryExpr(), ["Pow"], "MathExpr");
  }

  // 5. Унарные операторы (!X, -5)
  private unaryExpr(): any {
    const ops: Token[] = [];
    while (this.match("Bang", "Minus")) {
      ops.push(this.consume());
    }
    let res = this.postfixExpr();
    for (let i = ops.length - 1; i >= 0; i--) {
      const op = ops[i].image;
      if (op === "-" && res.type === "Number") {
        res = { type: "Number", value: -res.value };
      } else {
        res = { type: "UnaryExpr", operator: op, argument: res };
      }
    }
    return res;
  }

  // 6. Постфиксные цепочки: primary_expr (slot | form_block | flow_block)*
  private postfixExpr(): any {
    let res = this.primaryExpr();
    while (this.match("LParen", "LBrace", "LBracket")) {
      if (this.match("LParen")) {
        const suffix = this.slot();
        res = { type: "CallExpr", path: res, args: suffix };
      } else if (this.match("LBrace")) {
        const suffix = this.formBlock();
        res = { type: "TypedFormBlock", path: res, block: suffix };
      } else if (this.match("LBracket")) {
        const suffix = this.flowBlock();
        res = { type: "TypedFlowBlock", path: res, block: suffix };
      }
    }
    return res;
  }

  private primaryExpr(): any {
    if (this.match("Number", "String", "True", "False")) {
      return this.literal();
    }
    if (this.match("LBrace")) return this.formBlock();
    if (this.match("LBracket")) return this.flowBlock();
    if (this.match("LParen")) return this.slot();
    if (this.match("Identifier", "Underscore")) return this.path();

    const tok = this.consume();
    this.errors.push(`Ожидалось выражение [${tok.line}:${tok.column}], получен ${tok.type}`);
    return { type: "Error", token: tok };
  }

  private literal(): any {
    if (this.match("Number")) {
      const img = this.consume("Number").image;
      const val = img.startsWith("0x") ? parseInt(img, 16) : Number(img);
      return { type: "Number", value: val, raw: img };
    }
    if (this.match("String")) {
      const raw = this.consume("String").image;
      return { type: "String", value: raw.slice(1, -1) };
    }
    if (this.match("True")) {
      this.consume("True");
      return { type: "Bool", value: true };
    }
    if (this.match("False")) {
      this.consume("False");
      return { type: "Bool", value: false };
    }
    throw new Error("Unknown literal");
  }

  // path ::= (IDENTIFIER | UNDERSCORE) (DOT (IDENTIFIER | NUMBER | MINUS NUMBER))*
  private path(): any {
    const root = this.consume("Identifier", "Underscore").image;
    const parts = [root];
    while (this.match("Dot")) {
      this.consume("Dot");
      parts.push(this.pathNode());
    }
    return { type: "Path", value: parts.join("."), parts };
  }

  private pathNode(): string {
    if (this.match("Identifier")) {
      return this.consume("Identifier").image;
    }
    if (this.match("Minus")) {
      this.consume("Minus");
      return "-" + this.consume("Number").image;
    }
    return this.consume("Number").image;
  }

  // () — Слот
  private slot(): any {
    this.consume("LParen");
    const items: any[] = [];
    while (!this.match("RParen", "EOF")) {
      if (this.match("CRLF2", "Semicolon", "Comma")) {
        this.consume();
      } else if (this.canStartExpr()) {
        items.push(this.slotItem());
      } else {
        break;
      }
    }
    this.consume("RParen");
    return { type: "Slot", items };
  }

  private slotItem(): any {
    const exprs: any[] = [];
    do {
      exprs.push(this.expr());
    } while (this.canStartExpr());

    return {
      type: "SlotItem",
      left: exprs[0],
      right: exprs.length > 1 ? exprs[1] : null,
      exprs
    };
  }

  // {} — Форма
  private formBlock(): any {
    this.consume("LBrace");
    const items: any[] = [];
    while (!this.match("RBrace", "EOF")) {
      if (this.match("CRLF2", "Semicolon", "Comma")) {
        this.consume();
      } else if (this.canStartExpr()) {
        items.push(this.formItem());
      } else {
        break;
      }
    }
    this.consume("RBrace");
    return { type: "FormBlock", items };
  }

  private formItem(): any {
    const exprs: any[] = [];
    do {
      exprs.push(this.expr());
    } while (this.canStartExpr());

    return {
      type: "FormItem",
      left: exprs[0],
      right: exprs.length > 1 ? exprs[1] : null,
      exprs
    };
  }

  // [] — Поток
  private flowBlock(): any {
    this.consume("LBracket");
    const items: any[] = [];
    while (!this.match("RBracket", "EOF")) {
      if (this.match("CRLF2", "Semicolon", "Comma")) {
        this.consume();
      } else if (this.canStartExpr()) {
        items.push(this.flowItem());
      } else {
        break;
      }
    }
    this.consume("RBracket");
    return { type: "FlowBlock", items };
  }

  private flowItem(): any {
    const exprs: any[] = [];
    do {
      exprs.push(this.expr());
    } while (this.canStartExpr());

    if (exprs.length === 1) return exprs[0];
    return {
      type: "FlowItem",
      left: exprs[0],
      right: exprs[1],
      exprs
    };
  }
}

// =============================================================================
// 3. ТОЧКА ВХОДА
// =============================================================================

export const PARSER = new RazomyParser();

export function parseRazomyCode(text: string) {
  const lexResult = tokenize(text);
  if (lexResult.errors.length > 0) {
    console.error("Ошибки лексера:", lexResult.errors);
    return null;
  }
  const ast = PARSER.parse(lexResult.tokens);
  if (PARSER.errors.length > 0) {
    console.error("ОШИБКИ ПАРСИНГА:", PARSER.errors);
    return null;
  }
  return ast;
}
