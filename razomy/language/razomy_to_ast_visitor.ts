import { createToken, Lexer, CstParser } from "chevrotain";

// =============================================================================
// 1. ЛЕКСЕР (Razomy Lexer)
// =============================================================================

export const WHITE_SPACE = createToken({
  name: "WhiteSpace",
  pattern: /[ \t]+/,
  group: Lexer.SKIPPED
});

export const NEW_LINE = createToken({ name: "NewLine", pattern: /\r?\n/ });

export const COMMENT = createToken({
  name: "Comment",
  pattern: /\/\/[^\n\r]*/,
  group: Lexer.SKIPPED
});

export const LBRACE = createToken({ name: "LBrace", pattern: /\{/ });
export const RBRACE = createToken({ name: "RBrace", pattern: /\}/ });
export const LBRACKET = createToken({ name: "LBracket", pattern: /\[/ });
export const RBRACKET = createToken({ name: "RBracket", pattern: /\]/ });
export const LPAREN = createToken({ name: "LParen", pattern: /\(/ });
export const RPAREN = createToken({ name: "RParen", pattern: /\)/ });

export const DOT_GT = createToken({ name: "DotGt", pattern: /\.>/ });
export const DOT_AMP = createToken({ name: "DotAmp", pattern: /\.&/ });
export const MIGRATION = createToken({ name: "Migration", pattern: /->/ });

export const EQ_EQ = createToken({ name: "EqEq", pattern: /==/ });
export const NOT_EQ = createToken({ name: "NotEq", pattern: /!=/ });
export const LTE = createToken({ name: "Lte", pattern: /<=/ });
export const GTE = createToken({ name: "Gte", pattern: />=/ });
export const LANGLE = createToken({ name: "LAngle", pattern: /</ });
export const RANGLE = createToken({ name: "RAngle", pattern: />/ });
export const EQ = createToken({ name: "Eq", pattern: /=/ });

export const AMP = createToken({ name: "Amp", pattern: /&/ });
export const PIPE = createToken({ name: "Pipe", pattern: /\|/ });
export const SLASH = createToken({ name: "Slash", pattern: /\// });
export const PLUS = createToken({ name: "Plus", pattern: /\+/ });
export const MINUS = createToken({ name: "Minus", pattern: /-/ });
export const MUL = createToken({ name: "Mul", pattern: /\*/ });

export const COMMA = createToken({ name: "Comma", pattern: /,/ });
export const SEMICOLON = createToken({ name: "Semicolon", pattern: /;/ });
export const UNDERSCORE = createToken({ name: "Underscore", pattern: /_/ });

export const PIPE_DOT = createToken({ name: "PipeDot", pattern: /\.(?=\s|\r|\n)/ });
export const DOT = createToken({ name: "Dot", pattern: /\./ });

export const TRUE_KW = createToken({ name: "TrueKw", pattern: /true\b/ });
export const FALSE_KW = createToken({ name: "FalseKw", pattern: /false\b/ });
export const IDENTIFIER = createToken({ name: "Identifier", pattern: /[a-zA-Z][a-zA-Z0-9_]*|_[a-zA-Z0-9_]+/ });
export const NUMBER_LITERAL = createToken({ name: "NumberLiteral", pattern: /[0-9]+(\.[0-9]+)?/ });
export const STRING_LITERAL = createToken({ name: "StringLiteral", pattern: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/ });

export const ALL_TOKENS = [
  WHITE_SPACE, COMMENT, NEW_LINE,
  LBRACE, RBRACE, LBRACKET, RBRACKET, LPAREN, RPAREN,
  DOT_GT, DOT_AMP, PIPE_DOT, MIGRATION,
  EQ_EQ, NOT_EQ, LTE, GTE, LANGLE, RANGLE, EQ,
  AMP, PIPE, SLASH, PLUS, MINUS, MUL,
  COMMA, SEMICOLON, UNDERSCORE, DOT,
  TRUE_KW, FALSE_KW,
  IDENTIFIER, NUMBER_LITERAL, STRING_LITERAL
];

export const RAZOMY_LEXER = new Lexer(ALL_TOKENS);

// =============================================================================
// 2. СИНТАКСИЧЕСКИЙ АНАЛИЗАТОР (CST Parser)
// =============================================================================

class RazomyParserClass extends CstParser {
  constructor() {
    super(ALL_TOKENS);
    this.performSelfAnalysis();
  }

  private isOperatorAhead(expectedTokens: any[]): boolean {
    let idx = 1;
    let tok = this.LA(idx);
    while (tok.tokenType === NEW_LINE) {
      idx++;
      tok = this.LA(idx);
    }
    for (const expected of expectedTokens) {
      if (tok.tokenType === expected) return true;
    }
    return false;
  }

  public razomyFile = this.RULE("razomyFile", () => {
    this.MANY({
      DEF: () => {
        this.OR([
          { ALT: () => this.CONSUME(NEW_LINE) },
          { ALT: () => this.CONSUME(SEMICOLON) },
          { ALT: () => this.SUBRULE(this.declaration) }
        ]);
      }
    });
  });

  public declaration = this.RULE("declaration", () => {
    this.SUBRULE1(this.expr, { LABEL: "left" });
    this.OPTION(() => {
      this.SUBRULE2(this.expr, { LABEL: "right" });
    });
  });

  public expr = this.RULE("expr", () => {
    this.SUBRULE(this.pipelineExpr);
  });

  public pipelineExpr = this.RULE("pipeline_expr", () => {
    this.SUBRULE1(this.migrateExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([DOT_GT, DOT_AMP, PIPE_DOT, DOT]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NEW_LINE));
        this.OR([
          { ALT: () => this.CONSUME(DOT_GT, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(DOT_AMP, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(PIPE_DOT, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(DOT, { LABEL: "op" }) }
        ]);
        this.MANY2(() => this.CONSUME2(NEW_LINE));
        this.SUBRULE2(this.migrateExpr, { LABEL: "rhs" });
      }
    });
  });

  public migrateExpr = this.RULE("migrate_expr", () => {
    this.SUBRULE1(this.unionExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([MIGRATION]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NEW_LINE));
        this.CONSUME(MIGRATION, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(NEW_LINE));
        this.SUBRULE2(this.unionExpr, { LABEL: "rhs" });
      }
    });
  });

  public unionExpr = this.RULE("union_expr", () => {
    this.SUBRULE1(this.mergeExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([PIPE]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NEW_LINE));
        this.CONSUME(PIPE, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(NEW_LINE));
        this.SUBRULE2(this.mergeExpr, { LABEL: "rhs" });
      }
    });
  });

  public mergeExpr = this.RULE("merge_expr", () => {
    this.SUBRULE1(this.subtractExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([AMP]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NEW_LINE));
        this.CONSUME(AMP, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(NEW_LINE));
        this.SUBRULE2(this.subtractExpr, { LABEL: "rhs" });
      }
    });
  });

  public subtractExpr = this.RULE("subtract_expr", () => {
    this.SUBRULE1(this.compareExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([SLASH]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NEW_LINE));
        this.CONSUME(SLASH, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(NEW_LINE));
        this.SUBRULE2(this.compareExpr, { LABEL: "rhs" });
      }
    });
  });

  public compareExpr = this.RULE("compare_expr", () => {
    this.SUBRULE1(this.addExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([EQ_EQ, NOT_EQ, LTE, GTE, LANGLE, RANGLE, EQ]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NEW_LINE));
        this.OR([
          { ALT: () => this.CONSUME(EQ_EQ, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(NOT_EQ, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(LTE, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(GTE, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(LANGLE, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(RANGLE, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(EQ, { LABEL: "op" }) }
        ]);
        this.MANY2(() => this.CONSUME2(NEW_LINE));
        this.SUBRULE2(this.addExpr, { LABEL: "rhs" });
      }
    });
  });

  public addExpr = this.RULE("add_expr", () => {
    this.SUBRULE1(this.mulExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([PLUS, MINUS]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NEW_LINE));
        this.OR([
          { ALT: () => this.CONSUME(PLUS, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(MINUS, { LABEL: "op" }) }
        ]);
        this.MANY2(() => this.CONSUME2(NEW_LINE));
        this.SUBRULE2(this.mulExpr, { LABEL: "rhs" });
      }
    });
  });

  public mulExpr = this.RULE("mul_expr", () => {
    this.SUBRULE1(this.primaryExpr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([MUL]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NEW_LINE));
        this.CONSUME(MUL, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(NEW_LINE));
        this.SUBRULE2(this.primaryExpr, { LABEL: "rhs" });
      }
    });
  });

  public primaryExpr = this.RULE("primary_expr", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.literal) },
      { ALT: () => this.SUBRULE(this.formBlock) },
      { ALT: () => this.SUBRULE(this.flowBlock) },
      { ALT: () => this.SUBRULE(this.slot) },
      { ALT: () => this.SUBRULE(this.pathBasedExpr) }
    ]);
  });

  // Расширено: теперь путь может сопровождаться аргументами И/ИЛИ телом блока!
  // Пример: Func(Arg) [ ... ] или Type { ... }
  public pathBasedExpr = this.RULE("path_based_expr", () => {
    this.SUBRULE(this.path);
    this.OPTION1(() => {
      this.SUBRULE(this.slot, { LABEL: "slot" });
    });
    this.OPTION2(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.formBlock, { LABEL: "typed_form" }) },
        { ALT: () => this.SUBRULE(this.flowBlock, { LABEL: "typed_flow" }) }
      ]);
    });
  });

  public literal = this.RULE("literal", () => {
    this.OR([
      { ALT: () => this.CONSUME(NUMBER_LITERAL) },
      { ALT: () => this.CONSUME(STRING_LITERAL) },
      { ALT: () => this.CONSUME(TRUE_KW) },
      { ALT: () => this.CONSUME(FALSE_KW) }
    ]);
  });

  public path = this.RULE("path", () => {
    this.OR([
      { ALT: () => this.CONSUME(IDENTIFIER) },
      { ALT: () => this.CONSUME(UNDERSCORE) }
    ]);
    this.MANY(() => {
      this.CONSUME(DOT);
      this.CONSUME2(IDENTIFIER);
    });
  });

  public formBlock = this.RULE("form_block", () => {
    this.CONSUME(LBRACE);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(NEW_LINE) },
        { ALT: () => this.CONSUME(SEMICOLON) },
        { ALT: () => this.CONSUME(COMMA) },
        { ALT: () => this.SUBRULE(this.formItem) }
      ]);
    });
    this.CONSUME(RBRACE);
  });

  public formItem = this.RULE("form_item", () => {
    this.SUBRULE1(this.expr, { LABEL: "left" });
    this.OPTION(() => {
      this.SUBRULE2(this.expr, { LABEL: "right" });
    });
  });

  public flowBlock = this.RULE("flow_block", () => {
    this.CONSUME(LBRACKET);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(NEW_LINE) },
        { ALT: () => this.CONSUME(SEMICOLON) },
        { ALT: () => this.SUBRULE(this.flowItem) }
      ]);
    });
    this.CONSUME(RBRACKET);
  });

  public flowItem = this.RULE("flow_item", () => {
    this.SUBRULE(this.expr);
  });

  public slot = this.RULE("slot", () => {
    this.CONSUME(LPAREN);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(NEW_LINE) },
        { ALT: () => this.CONSUME(SEMICOLON) },
        { ALT: () => this.CONSUME(COMMA) },
        { ALT: () => this.SUBRULE(this.slotItem) }
      ]);
    });
    this.CONSUME(RPAREN);
  });

  public slotItem = this.RULE("slot_item", () => {
    this.SUBRULE1(this.expr, { LABEL: "left" });
    this.OPTION(() => {
      this.SUBRULE2(this.expr, { LABEL: "right" });
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
    const left = this.visit(ctx.left[0]);
    const right = ctx.right ? this.visit(ctx.right[0]) : null;
    return { type: "Declaration", left, right };
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
  migrateExpr(ctx: any)  { return this.buildBinaryAst(ctx, "MigrationExpr"); }
  unionExpr(ctx: any)    { return this.buildBinaryAst(ctx, "UnionExpr"); }
  mergeExpr(ctx: any)    { return this.buildBinaryAst(ctx, "MergeExpr"); }
  subtractExpr(ctx: any) { return this.buildBinaryAst(ctx, "SubtractExpr"); }
  compareExpr(ctx: any)  { return this.buildBinaryAst(ctx, "CompareExpr"); }
  addExpr(ctx: any)      { return this.buildBinaryAst(ctx, "MathExpr"); }
  mulExpr(ctx: any)      { return this.buildBinaryAst(ctx, "MathExpr"); }

  primaryExpr(ctx: any) {
    if (ctx.literal) return this.visit(ctx.literal);
    if (ctx.form_block) return this.visit(ctx.form_block);
    if (ctx.flow_block) return this.visit(ctx.flow_block);
    if (ctx.slot) return this.visit(ctx.slot);
    if (ctx.path_based_expr) return this.visit(ctx.path_based_expr);
  }

  pathBasedExpr(ctx: any) {
    let res: any = this.visit(ctx.path[0]);
    if (ctx.slot) {
      res = { type: "CallExpr", path: res, args: this.visit(ctx.slot[0]) };
    }
    if (ctx.typed_form) {
      res = { type: "TypedFormBlock", path: res, block: this.visit(ctx.typed_form[0]) };
    }
    if (ctx.typed_flow) {
      res = { type: "TypedFlowBlock", path: res, block: this.visit(ctx.typed_flow[0]) };
    }
    return res;
  }

  literal(ctx: any) {
    if (ctx.NumberLiteral) return { type: "Number", value: Number(ctx.NumberLiteral[0].image) };
    if (ctx.StringLiteral) {
      const raw = ctx.StringLiteral[0].image;
      return { type: "String", value: raw.slice(1, -1) };
    }
    if (ctx.TrueKw) return { type: "Bool", value: true };
    if (ctx.FalseKw) return { type: "Bool", value: false };
    throw new Error("Unknown literal");
  }

  path(ctx: any) {
    const root = ctx.Identifier ? ctx.Identifier[0].image : ctx.Underscore[0].image;
    const parts = [root];
    if (ctx.Identifier && ctx.Identifier.length > 1) {
      const tail = ctx.Underscore ? ctx.Identifier : ctx.Identifier.slice(1);
      tail.forEach((id: any) => parts.push(id.image));
    }
    return { type: "Path", value: parts.join("."), parts };
  }

  formBlock(ctx: any) {
    const items = ctx.form_item ? ctx.form_item.map((i: any) => this.visit(i)) : [];
    return { type: "FormBlock", items };
  }

  formItem(ctx: any) {
    return {
      type: "FormItem",
      left: this.visit(ctx.left[0]),
      right: ctx.right ? this.visit(ctx.right[0]) : null
    };
  }

  flowBlock(ctx: any) {
    const items = ctx.flow_item ? ctx.flow_item.map((i: any) => this.visit(i)) : [];
    return { type: "FlowBlock", items };
  }

  flowItem(ctx: any) {
    return this.visit(ctx.expr);
  }

  slot(ctx: any) {
    const items = ctx.slot_item ? ctx.slot_item.map((i: any) => this.visit(i)) : [];
    return { type: "Slot", items };
  }

  slotItem(ctx: any) {
    return {
      type: "SlotItem",
      left: this.visit(ctx.left[0]),
      right: ctx.right ? this.visit(ctx.right[0]) : null
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

