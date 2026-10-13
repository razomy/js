import { createToken, Lexer, CstParser } from "chevrotain";

// =============================================================================
// 1. ЛЕКСЕР (Razomy Lexer)
// =============================================================================

export const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /[ \t]+/,
  group: Lexer.SKIPPED
});

export const NewLine = createToken({ name: "NewLine", pattern: /\r?\n/ });

export const Comment = createToken({
  name: "Comment",
  pattern: /\/\/[^\n\r]*/,
  group: Lexer.SKIPPED
});

export const LBrace = createToken({ name: "LBrace", pattern: /\{/ });
export const RBrace = createToken({ name: "RBrace", pattern: /\}/ });
export const LBracket = createToken({ name: "LBracket", pattern: /\[/ });
export const RBracket = createToken({ name: "RBracket", pattern: /\]/ });
export const LParen = createToken({ name: "LParen", pattern: /\(/ });
export const RParen = createToken({ name: "RParen", pattern: /\)/ });

export const DotGt = createToken({ name: "DotGt", pattern: /\.>/ });
export const DotAmp = createToken({ name: "DotAmp", pattern: /\.&/ });
export const Migration = createToken({ name: "Migration", pattern: /->/ });

export const EqEq = createToken({ name: "EqEq", pattern: /==/ });
export const NotEq = createToken({ name: "NotEq", pattern: /!=/ });
export const Lte = createToken({ name: "Lte", pattern: /<=/ });
export const Gte = createToken({ name: "Gte", pattern: />=/ });
export const LAngle = createToken({ name: "LAngle", pattern: /</ });
export const RAngle = createToken({ name: "RAngle", pattern: />/ });
export const Eq = createToken({ name: "Eq", pattern: /=/ });

export const Amp = createToken({ name: "Amp", pattern: /&/ });
export const Pipe = createToken({ name: "Pipe", pattern: /\|/ });
export const Slash = createToken({ name: "Slash", pattern: /\// });
export const Plus = createToken({ name: "Plus", pattern: /\+/ });
export const Minus = createToken({ name: "Minus", pattern: /-/ });
export const Mul = createToken({ name: "Mul", pattern: /\*/ });

export const Comma = createToken({ name: "Comma", pattern: /,/ });
export const Semicolon = createToken({ name: "Semicolon", pattern: /;/ });
export const Underscore = createToken({ name: "Underscore", pattern: /_/ });

export const PipeDot = createToken({ name: "PipeDot", pattern: /\.(?=\s|\r|\n)/ });
export const Dot = createToken({ name: "Dot", pattern: /\./ });

export const TrueKw = createToken({ name: "TrueKw", pattern: /true\b/ });
export const FalseKw = createToken({ name: "FalseKw", pattern: /false\b/ });
export const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z][a-zA-Z0-9_]*|_[a-zA-Z0-9_]+/ });
export const NumberLiteral = createToken({ name: "NumberLiteral", pattern: /[0-9]+(\.[0-9]+)?/ });
export const StringLiteral = createToken({ name: "StringLiteral", pattern: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/ });

export const allTokens = [
  WhiteSpace, Comment, NewLine,
  LBrace, RBrace, LBracket, RBracket, LParen, RParen,
  DotGt, DotAmp, PipeDot, Migration,
  EqEq, NotEq, Lte, Gte, LAngle, RAngle, Eq,
  Amp, Pipe, Slash, Plus, Minus, Mul,
  Comma, Semicolon, Underscore, Dot,
  TrueKw, FalseKw,
  Identifier, NumberLiteral, StringLiteral
];

export const RazomyLexer = new Lexer(allTokens);

// =============================================================================
// 2. СИНТАКСИЧЕСКИЙ АНАЛИЗАТОР (CST Parser)
// =============================================================================

class RazomyParserClass extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  private isOperatorAhead(expectedTokens: any[]): boolean {
    let idx = 1;
    let tok = this.LA(idx);
    while (tok.tokenType === NewLine) {
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
          { ALT: () => this.CONSUME(NewLine) },
          { ALT: () => this.CONSUME(Semicolon) },
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
    this.SUBRULE(this.pipeline_expr);
  });

  public pipeline_expr = this.RULE("pipeline_expr", () => {
    this.SUBRULE1(this.migrate_expr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([DotGt, DotAmp, PipeDot, Dot]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NewLine));
        this.OR([
          { ALT: () => this.CONSUME(DotGt, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(DotAmp, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(PipeDot, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(Dot, { LABEL: "op" }) }
        ]);
        this.MANY2(() => this.CONSUME2(NewLine));
        this.SUBRULE2(this.migrate_expr, { LABEL: "rhs" });
      }
    });
  });

  public migrate_expr = this.RULE("migrate_expr", () => {
    this.SUBRULE1(this.union_expr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([Migration]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NewLine));
        this.CONSUME(Migration, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(NewLine));
        this.SUBRULE2(this.union_expr, { LABEL: "rhs" });
      }
    });
  });

  public union_expr = this.RULE("union_expr", () => {
    this.SUBRULE1(this.merge_expr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([Pipe]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NewLine));
        this.CONSUME(Pipe, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(NewLine));
        this.SUBRULE2(this.merge_expr, { LABEL: "rhs" });
      }
    });
  });

  public merge_expr = this.RULE("merge_expr", () => {
    this.SUBRULE1(this.subtract_expr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([Amp]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NewLine));
        this.CONSUME(Amp, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(NewLine));
        this.SUBRULE2(this.subtract_expr, { LABEL: "rhs" });
      }
    });
  });

  public subtract_expr = this.RULE("subtract_expr", () => {
    this.SUBRULE1(this.compare_expr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([Slash]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NewLine));
        this.CONSUME(Slash, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(NewLine));
        this.SUBRULE2(this.compare_expr, { LABEL: "rhs" });
      }
    });
  });

  public compare_expr = this.RULE("compare_expr", () => {
    this.SUBRULE1(this.add_expr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([EqEq, NotEq, Lte, Gte, LAngle, RAngle, Eq]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NewLine));
        this.OR([
          { ALT: () => this.CONSUME(EqEq, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(NotEq, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(Lte, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(Gte, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(LAngle, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(RAngle, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(Eq, { LABEL: "op" }) }
        ]);
        this.MANY2(() => this.CONSUME2(NewLine));
        this.SUBRULE2(this.add_expr, { LABEL: "rhs" });
      }
    });
  });

  public add_expr = this.RULE("add_expr", () => {
    this.SUBRULE1(this.mul_expr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([Plus, Minus]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NewLine));
        this.OR([
          { ALT: () => this.CONSUME(Plus, { LABEL: "op" }) },
          { ALT: () => this.CONSUME(Minus, { LABEL: "op" }) }
        ]);
        this.MANY2(() => this.CONSUME2(NewLine));
        this.SUBRULE2(this.mul_expr, { LABEL: "rhs" });
      }
    });
  });

  public mul_expr = this.RULE("mul_expr", () => {
    this.SUBRULE1(this.primary_expr, { LABEL: "lhs" });
    this.MANY({
      GATE: () => this.isOperatorAhead([Mul]),
      DEF: () => {
        this.MANY1(() => this.CONSUME1(NewLine));
        this.CONSUME(Mul, { LABEL: "op" });
        this.MANY2(() => this.CONSUME2(NewLine));
        this.SUBRULE2(this.primary_expr, { LABEL: "rhs" });
      }
    });
  });

  public primary_expr = this.RULE("primary_expr", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.literal) },
      { ALT: () => this.SUBRULE(this.form_block) },
      { ALT: () => this.SUBRULE(this.flow_block) },
      { ALT: () => this.SUBRULE(this.slot) },
      { ALT: () => this.SUBRULE(this.path_based_expr) }
    ]);
  });

  // Расширено: теперь путь может сопровождаться аргументами И/ИЛИ телом блока!
  // Пример: Func(Arg) [ ... ] или Type { ... }
  public path_based_expr = this.RULE("path_based_expr", () => {
    this.SUBRULE(this.path);
    this.OPTION1(() => {
      this.SUBRULE(this.slot, { LABEL: "slot" });
    });
    this.OPTION2(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.form_block, { LABEL: "typed_form" }) },
        { ALT: () => this.SUBRULE(this.flow_block, { LABEL: "typed_flow" }) }
      ]);
    });
  });

  public literal = this.RULE("literal", () => {
    this.OR([
      { ALT: () => this.CONSUME(NumberLiteral) },
      { ALT: () => this.CONSUME(StringLiteral) },
      { ALT: () => this.CONSUME(TrueKw) },
      { ALT: () => this.CONSUME(FalseKw) }
    ]);
  });

  public path = this.RULE("path", () => {
    this.OR([
      { ALT: () => this.CONSUME(Identifier) },
      { ALT: () => this.CONSUME(Underscore) }
    ]);
    this.MANY(() => {
      this.CONSUME(Dot);
      this.CONSUME2(Identifier);
    });
  });

  public form_block = this.RULE("form_block", () => {
    this.CONSUME(LBrace);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(NewLine) },
        { ALT: () => this.CONSUME(Semicolon) },
        { ALT: () => this.CONSUME(Comma) },
        { ALT: () => this.SUBRULE(this.form_item) }
      ]);
    });
    this.CONSUME(RBrace);
  });

  public form_item = this.RULE("form_item", () => {
    this.SUBRULE1(this.expr, { LABEL: "left" });
    this.OPTION(() => {
      this.SUBRULE2(this.expr, { LABEL: "right" });
    });
  });

  public flow_block = this.RULE("flow_block", () => {
    this.CONSUME(LBracket);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(NewLine) },
        { ALT: () => this.CONSUME(Semicolon) },
        { ALT: () => this.SUBRULE(this.flow_item) }
      ]);
    });
    this.CONSUME(RBracket);
  });

  public flow_item = this.RULE("flow_item", () => {
    this.SUBRULE(this.expr);
  });

  public slot = this.RULE("slot", () => {
    this.CONSUME(LParen);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.CONSUME(NewLine) },
        { ALT: () => this.CONSUME(Semicolon) },
        { ALT: () => this.CONSUME(Comma) },
        { ALT: () => this.SUBRULE(this.slot_item) }
      ]);
    });
    this.CONSUME(RParen);
  });

  public slot_item = this.RULE("slot_item", () => {
    this.SUBRULE1(this.expr, { LABEL: "left" });
    this.OPTION(() => {
      this.SUBRULE2(this.expr, { LABEL: "right" });
    });
  });
}

export const parser = new RazomyParserClass();
const BaseVisitor = parser.getBaseCstVisitorConstructor();

// =============================================================================
// 3. CST -> AST VISITOR
// =============================================================================

export class RazomyToAstVisitor extends BaseVisitor {
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

  private buildBinaryAST(ctx: any, exprType: string) {
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

  pipeline_expr(ctx: any) { return this.buildBinaryAST(ctx, "PipelineExpr"); }
  migrate_expr(ctx: any)  { return this.buildBinaryAST(ctx, "MigrationExpr"); }
  union_expr(ctx: any)    { return this.buildBinaryAST(ctx, "UnionExpr"); }
  merge_expr(ctx: any)    { return this.buildBinaryAST(ctx, "MergeExpr"); }
  subtract_expr(ctx: any) { return this.buildBinaryAST(ctx, "SubtractExpr"); }
  compare_expr(ctx: any)  { return this.buildBinaryAST(ctx, "CompareExpr"); }
  add_expr(ctx: any)      { return this.buildBinaryAST(ctx, "MathExpr"); }
  mul_expr(ctx: any)      { return this.buildBinaryAST(ctx, "MathExpr"); }

  primary_expr(ctx: any) {
    if (ctx.literal) return this.visit(ctx.literal);
    if (ctx.form_block) return this.visit(ctx.form_block);
    if (ctx.flow_block) return this.visit(ctx.flow_block);
    if (ctx.slot) return this.visit(ctx.slot);
    if (ctx.path_based_expr) return this.visit(ctx.path_based_expr);
  }

  path_based_expr(ctx: any) {
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

  form_block(ctx: any) {
    const items = ctx.form_item ? ctx.form_item.map((i: any) => this.visit(i)) : [];
    return { type: "FormBlock", items };
  }

  form_item(ctx: any) {
    return {
      type: "FormItem",
      left: this.visit(ctx.left[0]),
      right: ctx.right ? this.visit(ctx.right[0]) : null
    };
  }

  flow_block(ctx: any) {
    const items = ctx.flow_item ? ctx.flow_item.map((i: any) => this.visit(i)) : [];
    return { type: "FlowBlock", items };
  }

  flow_item(ctx: any) {
    return this.visit(ctx.expr);
  }

  slot(ctx: any) {
    const items = ctx.slot_item ? ctx.slot_item.map((i: any) => this.visit(i)) : [];
    return { type: "Slot", items };
  }

  slot_item(ctx: any) {
    return {
      type: "SlotItem",
      left: this.visit(ctx.left[0]),
      right: ctx.right ? this.visit(ctx.right[0]) : null
    };
  }
}

export const astVisitor = new RazomyToAstVisitor();

export function parseRazomyCode(text: string) {
  const lexResult = RazomyLexer.tokenize(text);
  if (lexResult.errors.length > 0) {
    console.error("Ошибки лексера:", lexResult.errors);
    return null;
  }
  parser.input = lexResult.tokens;
  const cst = parser.razomyFile();
  if (parser.errors.length > 0) {
    console.error("ОШИБКИ ПАРСИНГА:", parser.errors);
    return null;
  }
  return astVisitor.visit(cst);
}

