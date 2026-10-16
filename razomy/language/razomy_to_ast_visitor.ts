import { createToken, Lexer, CstParser } from "chevrotain";

// =============================================================================
// 1. ЛЕКСЕР (Razomy Lexer V4.0)
// =============================================================================

export const WHITE_SPACE = createToken({
  name: "WhiteSpace",
  pattern: /[ \t\f\r]+/,
  group: Lexer.SKIPPED
});

export const CRLF2 = createToken({ name: "CRLF2", pattern: /\r?\n/ });

export const DOC_COMMENT = createToken({
  name: "DocComment",
  pattern: /#[^#]*#/,
  group: Lexer.SKIPPED
});

export const LINE_COMMENT = createToken({
  name: "LineComment",
  pattern: /\/\/[^\r\n]*/,
  group: Lexer.SKIPPED
});

// Скобки
export const LBRACE = createToken({ name: "LBrace", pattern: /\{/ });
export const RBRACE = createToken({ name: "RBrace", pattern: /\}/ });
export const LBRACKET = createToken({ name: "LBracket", pattern: /\[/ });
export const RBRACKET = createToken({ name: "RBracket", pattern: /\]/ });
export const LPAREN = createToken({ name: "LParen", pattern: /\(/ });
export const RPAREN = createToken({ name: "RParen", pattern: /\)/ });

// Операторы пайплайна (Морфизмы)
export const DOT_GT = createToken({ name: "DotGt", pattern: /\.>/ });
export const DOT_AMP = createToken({ name: "DotAmp", pattern: /\.&/ });
export const DOT_PIPE = createToken({ name: "DotPipe", pattern: /\.\|/ });
export const DOT_QM = createToken({ name: "DotQm", pattern: /\.\?/ });
export const DOT_RANGE = createToken({ name: "DotRange", pattern: /\.\./ });

// Контекстная точка пайплайна (перед пробелом, переносом строки или открывающей скобкой)
export const PIPE_DOT = createToken({ name: "PipeDot", pattern: /\.(?=[ \t\r\n\{\[\(])/ });
// Слитная точка доступа к полям (User.Id, Jonn.0, Jonn.-1)
export const DOT = createToken({ name: "Dot", pattern: /\./ });

// Сравнение, логика, сдвиги и степень
export const EQ_EQ = createToken({ name: "EqEq", pattern: /==/ });
export const NOT_EQ = createToken({ name: "NotEq", pattern: /!=/ });
export const LTE = createToken({ name: "Lte", pattern: /<=/ });
export const GTE = createToken({ name: "Gte", pattern: />=/ });
export const AND_AND = createToken({ name: "AndAnd", pattern: /&&/ });
export const OR_OR = createToken({ name: "OrOr", pattern: /\|\|/ });
export const POW = createToken({ name: "Pow", pattern: /\*\*/ });
export const SHIFT_L = createToken({ name: "ShiftL", pattern: /<</ });
export const SHIFT_R = createToken({ name: "ShiftR", pattern: />>/ });
export const LANGLE = createToken({ name: "LAngle", pattern: /</ });
export const RANGLE = createToken({ name: "RAngle", pattern: />/ });
export const EQ = createToken({ name: "Eq", pattern: /=/ });

// Алгебра типов и арифметика
export const AMP = createToken({ name: "Amp", pattern: /&/ });
export const PIPE = createToken({ name: "Pipe", pattern: /\|/ });
export const SLASH = createToken({ name: "Slash", pattern: /\// });
export const PLUS = createToken({ name: "Plus", pattern: /\+/ });
export const MINUS = createToken({ name: "Minus", pattern: /-/ });
export const MUL = createToken({ name: "Mul", pattern: /\*/ });
export const MOD = createToken({ name: "Mod", pattern: /%/ });
export const BANG = createToken({ name: "Bang", pattern: /!/ });
export const QM = createToken({ name: "Qm", pattern: /\?/ });

// Разделители
export const COMMA = createToken({ name: "Comma", pattern: /,/ });
export const COLON = createToken({ name: "Colon", pattern: /:/ });
export const SEMICOLON = createToken({ name: "Semicolon", pattern: /;/ });
export const UNDERSCORE = createToken({ name: "Underscore", pattern: /_/ });

// Литералы и идентификаторы
export const TRUE_KW = createToken({ name: "True", pattern: /true\b/ });
export const FALSE_KW = createToken({ name: "False", pattern: /false\b/ });
export const IDENTIFIER = createToken({
  name: "Identifier",
  pattern: /[a-zA-Z][a-zA-Z0-9_]*|_[a-zA-Z0-9_]+/
});

// Float требует цифр после точки, чтобы `1..10` лексилось как NUMBER, DOT_RANGE, NUMBER
export const NUMBER = createToken({
  name: "Number",
  pattern: /0x[0-9a-fA-F]+|[0-9]+\.[0-9]+|[0-9]+/
});

export const STRING = createToken({
  name: "String",
  pattern: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/
});

export const ALL_TOKENS = [
  WHITE_SPACE, DOC_COMMENT, LINE_COMMENT, CRLF2,
  LBRACE, RBRACE, LBRACKET, RBRACKET, LPAREN, RPAREN,
  DOT_GT, DOT_AMP, DOT_PIPE, DOT_QM, DOT_RANGE, PIPE_DOT,
  EQ_EQ, NOT_EQ, LTE, GTE, AND_AND, OR_OR, POW, SHIFT_L, SHIFT_R, LANGLE, RANGLE, EQ,
  AMP, PIPE, SLASH, PLUS, MINUS, MUL, MOD, BANG, QM,
  COMMA, COLON, SEMICOLON,
  TRUE_KW, FALSE_KW,
  IDENTIFIER, UNDERSCORE, NUMBER, STRING,
  DOT
];

export const RAZOMY_LEXER = new Lexer(ALL_TOKENS);

// =============================================================================
// 2. СИНТАКСИЧЕСКИЙ АНАЛИЗАТОР (CST Parser V4.0)
// =============================================================================

class RazomyParserClass extends CstParser {
  constructor() {
    super(ALL_TOKENS, { maxLookahead: 2 });
    this.performSelfAnalysis();
  }

  private isOperatorAhead(expectedTokens: any[]): boolean {
    let idx = 1;
    let tok = this.LA(idx);
    while (tok.tokenType === CRLF2) {
      idx++;
      tok = this.LA(idx);
    }
    for (const expected of expectedTokens) {
      if (tok.tokenType === expected) return true;
    }
    return false;
  }

  // 1. Корень файла: razomyFile ::= (CRLF2 | SEMICOLON | declaration)*
  public razomyFile = this.RULE("razomyFile", () => {
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(CRLF2) },
        { ALT: () => this.CONSUME(SEMICOLON) },
        { ALT: () => this.SUBRULE(this.declaration) }
      ]);
    });
  });

  // 2. Декларация: declaration ::= expr expr*
  public declaration = this.RULE("declaration", () => {
    this.AT_LEAST_ONE(() => {
      this.SUBRULE(this.expr, { LABEL: "exprs" });
    });
  });

  public expr = this.RULE("expr", () => {
    this.SUBRULE(this.pipelineExpr);
  });

  // 1. Цепочки пайплайнов (., .., .?, .&, .>, .|)
  public pipelineExpr = this.RULE("pipeline_expr", () => {
    this.SUBRULE1(this.unionExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([DOT_GT, DOT_AMP, DOT_PIPE, DOT_QM, DOT_RANGE, PIPE_DOT]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(CRLF2));
        this.OR([
          { ALT: () => this.CONSUME(DOT_GT, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(DOT_AMP, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(DOT_PIPE, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(DOT_QM, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(DOT_RANGE, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(PIPE_DOT, { LABEL: "op" }) }
        ]);
        this.MANY2(() => this.CONSUME2(CRLF2));
        this.SUBRULE2(this.unionExpr, { LABEL: "rhs" });
      }
    });
  });

  // 2. Алгебра типов и морфизмов (|, &, /)
  public unionExpr = this.RULE("union_expr", () => {
    this.SUBRULE1(this.mergeExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([PIPE]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(CRLF2));
        this.CONSUME(PIPE, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(CRLF2));
        this.SUBRULE2(this.mergeExpr, { LABEL: "rhs" });
      }
    });
  });

  public mergeExpr = this.RULE("merge_expr", () => {
    this.SUBRULE1(this.subtractExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([AMP]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(CRLF2));
        this.CONSUME(AMP, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(CRLF2));
        this.SUBRULE2(this.subtractExpr, { LABEL: "rhs" });
      }
    });
  });

  public subtractExpr = this.RULE("subtract_expr", () => {
    this.SUBRULE1(this.logicExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([SLASH]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(CRLF2));
        this.CONSUME(SLASH, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(CRLF2));
        this.SUBRULE2(this.logicExpr, { LABEL: "rhs" });
      }
    });
  });

  // 3. Булева логика (&&, ||) и Сравнения (==, !=, <, >, <=, >=, =)
  public logicExpr = this.RULE("logic_expr", () => {
    this.SUBRULE1(this.compareExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([AND_AND, OR_OR]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(CRLF2));
        this.OR([
          { ALT: () => this.CONSUME(AND_AND, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(OR_OR, { LABEL: "op" }) }
        ]);
        this.MANY2(() => this.CONSUME2(CRLF2));
        this.SUBRULE2(this.compareExpr, { LABEL: "rhs" });
      }
    });
  });

  public compareExpr = this.RULE("compare_expr", () => {
    this.SUBRULE1(this.shiftExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([EQ_EQ, NOT_EQ, LTE, GTE, LANGLE, RANGLE, EQ]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(CRLF2));
        this.OR([
          { ALT: () => this.CONSUME(EQ_EQ, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(NOT_EQ, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(LTE, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(GTE, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(LANGLE, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(RANGLE, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(EQ, { LABEL: "op" }) }
        ]);
        this.MANY2(() => this.CONSUME2(CRLF2));
        this.SUBRULE2(this.shiftExpr, { LABEL: "rhs" });
      }
    });
  });

  // 4. Битовые сдвиги и Арифметика (<<, >>, +, -, *, %, **)
  public shiftExpr = this.RULE("shift_expr", () => {
    this.SUBRULE1(this.addExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([SHIFT_L, SHIFT_R]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(CRLF2));
        this.OR([
          { ALT: () => this.CONSUME(SHIFT_L, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(SHIFT_R, { LABEL: "op" }) }
        ]);
        this.MANY2(() => this.CONSUME2(CRLF2));
        this.SUBRULE2(this.addExpr, { LABEL: "rhs" });
      }
    });
  });

  public addExpr = this.RULE("add_expr", () => {
    this.SUBRULE1(this.mulExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([PLUS, MINUS]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(CRLF2));
        this.OR([
          { ALT: () => this.CONSUME(PLUS, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(MINUS, { LABEL: "op" }) }
        ]);
        this.MANY2(() => this.CONSUME2(CRLF2));
        this.SUBRULE2(this.mulExpr, { LABEL: "rhs" });
      }
    });
  });

  public mulExpr = this.RULE("mul_expr", () => {
    this.SUBRULE1(this.powExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([MUL, MOD]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(CRLF2));
        this.OR([
          { ALT: () => this.CONSUME(MUL, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(MOD, { LABEL: "op" }) }
        ]);
        this.MANY2(() => this.CONSUME2(CRLF2));
        this.SUBRULE2(this.powExpr, { LABEL: "rhs" });
      }
    });
  });

  public powExpr = this.RULE("pow_expr", () => {
    this.SUBRULE1(this.unaryExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([POW]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(CRLF2));
        this.CONSUME(POW, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(CRLF2));
        this.SUBRULE2(this.unaryExpr, { LABEL: "rhs" });
      }
    });
  });

  // 5. Унарные операторы (!X, -5)
  public unaryExpr = this.RULE("unary_expr", () => {
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(BANG, { LABEL: "ops" }) },
        { ALT: () => this.CONSUME(MINUS, { LABEL: "ops" }) }
      ]);
    });
    this.SUBRULE(this.postfixExpr, { LABEL: "expr" });
  });

  // 6. Постфиксные цепочки: primary_expr (slot | form_block | flow_block)*
  public postfixExpr = this.RULE("postfix_expr", () => {
    this.SUBRULE(this.primaryExpr, { LABEL: "base" });
    this.MANY(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.slot, { LABEL: "suffixes" }) },
        { ALT: () => this.SUBRULE(this.formBlock, { LABEL: "suffixes" }) },
        { ALT: () => this.SUBRULE(this.flowBlock, { LABEL: "suffixes" }) }
      ]);
    });
  });

  public primaryExpr = this.RULE("primary_expr", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.literal) },
      { ALT: () => this.SUBRULE(this.formBlock) },
      { ALT: () => this.SUBRULE(this.flowBlock) },
      { ALT: () => this.SUBRULE(this.slot) },
      { ALT: () => this.SUBRULE(this.path) }
    ]);
  });

  public literal = this.RULE("literal", () => {
    this.OR([
      { ALT: () => this.CONSUME(NUMBER) },
      { ALT: () => this.CONSUME(STRING) },
      { ALT: () => this.CONSUME(TRUE_KW) },
      { ALT: () => this.CONSUME(FALSE_KW) }
    ]);
  });

  // path ::= (IDENTIFIER | UNDERSCORE) (DOT (IDENTIFIER | NUMBER | MINUS NUMBER))*
  public path = this.RULE("path", () => {
    this.OR([
      { ALT: () => this.CONSUME(IDENTIFIER, { LABEL: "root" }) },
      { ALT: () => this.CONSUME(UNDERSCORE, { LABEL: "root" }) }
    ]);
    this.MANY(() => {
      this.CONSUME(DOT);
      this.SUBRULE(this.pathNode, { LABEL: "nodes" });
    });
  });

  public pathNode = this.RULE("path_node", () => {
    this.OR([
      { ALT: () => this.CONSUME(IDENTIFIER) },
      { ALT: () => this.CONSUME(NUMBER) },
      {
        ALT: () => {
          this.CONSUME(MINUS);
          this.CONSUME2(NUMBER);
        }
      }
    ]);
  });

  // () — Слот
  public slot = this.RULE("slot", () => {
    this.CONSUME(LPAREN);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(CRLF2) },
        { ALT: () => this.CONSUME(SEMICOLON) },
        { ALT: () => this.CONSUME(COMMA) },
        { ALT: () => this.SUBRULE(this.slotItem) }
      ]);
    });
    this.CONSUME(RPAREN);
  });

  public slotItem = this.RULE("slot_item", () => {
    this.AT_LEAST_ONE(() => {
      this.SUBRULE(this.expr, { LABEL: "exprs" });
    });
  });

  // {} — Форма
  public formBlock = this.RULE("form_block", () => {
    this.CONSUME(LBRACE);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(CRLF2) },
        { ALT: () => this.CONSUME(SEMICOLON) },
        { ALT: () => this.CONSUME(COMMA) },
        { ALT: () => this.SUBRULE(this.formItem) }
      ]);
    });
    this.CONSUME(RBRACE);
  });

  public formItem = this.RULE("form_item", () => {
    this.AT_LEAST_ONE(() => {
      this.SUBRULE(this.expr, { LABEL: "exprs" });
    });
  });

  // [] — Поток
  public flowBlock = this.RULE("flow_block", () => {
    this.CONSUME(LBRACKET);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(CRLF2) },
        { ALT: () => this.CONSUME(SEMICOLON) },
        { ALT: () => this.CONSUME(COMMA) },
        { ALT: () => this.SUBRULE(this.flowItem) }
      ]);
    });
    this.CONSUME(RBRACKET);
  });

  public flowItem = this.RULE("flow_item", () => {
    this.AT_LEAST_ONE(() => {
      this.SUBRULE(this.expr, { LABEL: "exprs" });
    });
  });
}

export const PARSER = new RazomyParserClass();
const baseVisitor = PARSER.getBaseCstVisitorConstructor();

// =============================================================================
// 3. CST -> AST VISITOR
// =============================================================================

export class RazomyToAstVisitor extends baseVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  razomyFile(ctx: any) {
    const body = ctx.declaration ? ctx.declaration.map((d: any) => this.visit(d)) : [];
    return { type: "File", body };
  }

  declaration(ctx: any) {
    const exprs = ctx.exprs.map((e: any) => this.visit(e));
    return {
      type: "Declaration",
      left: exprs[0],
      right: exprs.length > 1 ? exprs[1] : null,
      extra: exprs.slice(2),
      exprs
    };
  }

  expr(ctx: any) {
    return this.visit(ctx.pipeline_expr);
  }

  private buildBinaryAst(ctx: any, exprType: string) {
    let result = this.visit(ctx.lhs[0]);
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsNode: any, i: number) => {
        result = {
          type: exprType,
          operator: ctx.op[i].image,
          left: result,
          right: this.visit(rhsNode)
        };
      });
    }
    return result;
  }

  pipelineExpr(ctx: any) { return this.buildBinaryAst(ctx, "PipelineExpr"); }
  unionExpr(ctx: any)    { return this.buildBinaryAst(ctx, "UnionExpr"); }
  mergeExpr(ctx: any)    { return this.buildBinaryAst(ctx, "MergeExpr"); }
  subtractExpr(ctx: any) { return this.buildBinaryAst(ctx, "SubtractExpr"); }
  logicExpr(ctx: any)    { return this.buildBinaryAst(ctx, "LogicExpr"); }
  compareExpr(ctx: any)  { return this.buildBinaryAst(ctx, "CompareExpr"); }
  shiftExpr(ctx: any)    { return this.buildBinaryAst(ctx, "ShiftExpr"); }
  addExpr(ctx: any)      { return this.buildBinaryAst(ctx, "MathExpr"); }
  mulExpr(ctx: any)      { return this.buildBinaryAst(ctx, "MathExpr"); }
  powExpr(ctx: any)      { return this.buildBinaryAst(ctx, "MathExpr"); }

  unaryExpr(ctx: any) {
    let res = this.visit(ctx.expr[0]);
    if (ctx.ops) {
      for (let i = ctx.ops.length - 1; i >= 0; i--) {
        const op = ctx.ops[i].image;
        if (op === "-" && res.type === "Number") {
          res = { type: "Number", value: -res.value };
        } else {
          res = { type: "UnaryExpr", operator: op, argument: res };
        }
      }
    }
    return res;
  }

  postfixExpr(ctx: any) {
    let res = this.visit(ctx.base[0]);
    if (ctx.suffixes) {
      for (const suffixCst of ctx.suffixes) {
        const suffix = this.visit(suffixCst);
        if (suffix.type === "Slot") {
          res = { type: "CallExpr", path: res, args: suffix };
        } else if (suffix.type === "FormBlock") {
          res = { type: "TypedFormBlock", path: res, block: suffix };
        } else if (suffix.type === "FlowBlock") {
          res = { type: "TypedFlowBlock", path: res, block: suffix };
        }
      }
    }
    return res;
  }

  primaryExpr(ctx: any) {
    if (ctx.literal) return this.visit(ctx.literal);
    if (ctx.form_block) return this.visit(ctx.form_block);
    if (ctx.flow_block) return this.visit(ctx.flow_block);
    if (ctx.slot) return this.visit(ctx.slot);
    if (ctx.path) return this.visit(ctx.path);
  }

  literal(ctx: any) {
    if (ctx.Number) {
      const img = ctx.Number[0].image;
      const val = img.startsWith("0x") ? parseInt(img, 16) : Number(img);
      return { type: "Number", value: val, raw: img };
    }
    if (ctx.String) {
      const raw = ctx.String[0].image;
      return { type: "String", value: raw.slice(1, -1) };
    }
    if (ctx.True) return { type: "Bool", value: true };
    if (ctx.False) return { type: "Bool", value: false };
    throw new Error("Unknown literal");
  }

  path(ctx: any) {
    const root = ctx.root[0].image;
    const parts = [root];
    if (ctx.nodes) {
      ctx.nodes.forEach((n: any) => parts.push(this.visit(n)));
    }
    return { type: "Path", value: parts.join("."), parts };
  }

  pathNode(ctx: any) {
    if (ctx.Identifier) return ctx.Identifier[0].image;
    if (ctx.Minus) return "-" + ctx.Number[0].image;
    return ctx.Number[0].image;
  }

  slot(ctx: any) {
    const items = ctx.slot_item ? ctx.slot_item.map((i: any) => this.visit(i)) : [];
    return { type: "Slot", items };
  }

  slotItem(ctx: any) {
    const exprs = ctx.exprs.map((e: any) => this.visit(e));
    return {
      type: "SlotItem",
      left: exprs[0],
      right: exprs.length > 1 ? exprs[1] : null,
      exprs
    };
  }

  formBlock(ctx: any) {
    const items = ctx.form_item ? ctx.form_item.map((i: any) => this.visit(i)) : [];
    return { type: "FormBlock", items };
  }

  formItem(ctx: any) {
    const exprs = ctx.exprs.map((e: any) => this.visit(e));
    return {
      type: "FormItem",
      left: exprs[0],
      right: exprs.length > 1 ? exprs[1] : null,
      exprs
    };
  }

  flowBlock(ctx: any) {
    const items = ctx.flow_item ? ctx.flow_item.map((i: any) => this.visit(i)) : [];
    return { type: "FlowBlock", items };
  }

  flowItem(ctx: any) {
    const exprs = ctx.exprs.map((e: any) => this.visit(e));
    if (exprs.length === 1) return exprs[0];
    return {
      type: "FlowItem",
      left: exprs[0],
      right: exprs[1],
      exprs
    };
  }
}

export const AST_VISITOR = new RazomyToAstVisitor();

export function parseRazomyCode(text: string) {
  const lexResult = RAZOMY_LEXER.tokenize(text);
  if (lexResult.errors.length > 0) {
    console.error("Ошибки лексера:", lexResult.errors);
    return null;
  }
  PARSER.input = lexResult.tokens;
  const cst = PARSER.razomyFile();
  if (PARSER.errors.length > 0) {
    console.error("ОШИБКИ ПАРСИНГА:", PARSER.errors);
    return null;
  }
  return AST_VISITOR.visit(cst);
}
