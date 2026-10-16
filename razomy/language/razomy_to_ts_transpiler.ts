// =============================================================================
// 4. ТРАНСПАЙЛЕР В TYPESCRIPT (Full Razomy -> TypeScript)
// =============================================================================

// =============================================================================
// ЧИСТЫЙ И ИДИОМАТИЧНЫЙ ТРАНСПАЙЛЕР В TYPESCRIPT
// =============================================================================

export class RazomyToTSTranspiler {
  private indentLevel = 0;


  public transpile(node: any): string {
    if (!node) return "";

    switch (node.type) {
      case "File":
        return node.body
          .map((n: any) => this.transpile(n))
          .filter((s: string) => s.trim().length > 0)
          .join("\n\n");

      case "Number":
      case "Bool":
        return String(node.value);

      case "String": {
        // Интерполяция "Text {Expr}" -> `Text ${Expr}`
        if (node.value.includes("{")) {
          const interpolated = node.value.replace(/\{([^}]+)\}/g, (_: string, expr: string) => {
            return `\${${expr.trim()}}`;
          });
          return `\`${interpolated}\``;
        }
        return `"${node.value}"`;
      }

      case "Path":
        return node.value === "_" ? "__target" : node.value;

      case "Declaration":
        return this.transpileDeclaration(node);

      case "TypedFormBlock": {
        const name = this.transpile(node.path);
        const obj = this.transpileObjectLiteral(node.block);
        return `${name}(${obj})`;
      }

      case "TypedFlowBlock": {
        const name = this.transpile(node.path);
        const block = this.transpileFlowBlock(node.block);
        return `export const ${name} = ${block};`;
      }

      case "FlowBlock":
        return this.transpileFlowBlock(node);

      case "FormBlock":
        return this.transpileObjectLiteral(node);

      case "CallExpr": {
        const target = this.transpile(node.path);
        const args = node.args.items.map((i: any) => this.transpile(i.left)).join(", ");
        return `${target}(${args})`;
      }

      case "UnionExpr":
        return `${this.transpile(node.left)} | ${this.transpile(node.right)}`;

      case "MergeExpr":
        return `${this.transpile(node.left)} & ${this.transpile(node.right)}`;

      case "MathExpr":
      case "CompareExpr": {
        const op = node.operator === "=" ? "===" : node.operator === "==" ? "===" : node.operator;
        return `${this.transpile(node.left)} ${op} ${this.transpile(node.right)}`;
      }

      case "PipelineExpr":
        return this.transpilePipelineExpr(node);

      default:
        return "";
    }
  }

  // --- Обработка объявлений функций, типов и модулей ---
  private transpileDeclaration(node: any): string {
    const left = node.left;
    const right = node.right;

    // 1. Модуль или структура: Shell { Log(Msg) [...], ... }
    if (left.type === "Path" && right && right.type === "FormBlock") {
      const moduleName = left.value;
      // Проверяем, это тип или модуль методов
      const isModule = right.items.some((it: any) => it.left.type === "CallExpr");
      if (isModule) {
        const methods = right.items.map((it: any) => {
          const fnName = it.left.path.value;
          const params = it.left.args.items.map((p: any) => `${this.transpile(p.left)}: any`).join(", ");
          const body = this.transpile(it.right);
          return `  ${fnName}: (${params}) => ${body}`;
        });
        return `export const ${moduleName} = {\n${methods.join(",\n")}\n};`;
      } else {
        const fields = right.items.map((it: any) => {
          const key = it.left.value;
          const val = it.right ? this.transpile(it.right) : "any";
          return `  ${key}?: ${val};`;
        });
        return `export interface ${moduleName} {\n${fields.join("\n")}\n}`;
      }
    }

    // 2. Функция с аргументами: Fn(A, B) [ ... ] или Fn(A) Cons { ... }
    if (left.type === "CallExpr") {
      const fnName = this.transpile(left.path);
      const params = left.args.items.map((p: any) => `${this.transpile(p.left)}: any`).join(", ");

      if (right && right.type === "FlowBlock") {
        const body = this.transpileFlowBlock(right);
        return `export const ${fnName} = (${params}) => ${body};`;
      }
      if (right) {
        return `export const ${fnName} = (${params}) => ${this.transpile(right)};`;
      }
    }

    // 3. Блок без параметров: RunBuild [ ... ]
    if (left.type === "TypedFlowBlock") {
      const name = this.transpile(left.path);
      const block = this.transpileFlowBlock(left.block);
      return `export const ${name} = () => ${block};`;
    }

    // 4. Пустая форма: Name {}
    if (left.type === "TypedFormBlock" && left.block.items.length === 0) {
      return `export interface ${this.transpile(left.path)} {}`;
    }

    // 5. Алгебраические типы: Message = A | B или SmallError = BuildError & [ ... ]
    if (left.type === "Path" && right) {
      const name = left.value;
      if (right.type === "UnionExpr" || right.type === "MergeExpr") {
        return `export type ${name} = ${this.transpile(right)};`;
      }
      return `export const ${name} = ${this.transpile(right)};`;
    }

    if (left.type === "Path" && !right) {
      return `export interface ${left.value} {}`;
    }

    return `export const ${this.transpile(left)} = ${this.transpile(right)};`;
  }

  // --- Преобразование блоков потока [...] в чистые функции ---
  private transpileFlowBlock(block: any): string {
    const items = block.items || [];
    if (items.length === 0) return "undefined";

    // Если блок состоит из одного выражения, не плодим фигурные скобки
    if (items.length === 1 && items[0].type !== "PipelineExpr") {
      return this.transpile(items[0]);
    }

    this.indentLevel++;
    const lines: string[] = [];

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const isLast = i === items.length - 1;

      if (it.type === "PipelineExpr") {
        // Разворачиваем пайплайн внутри блока в пошаговые инструкции
        this.unrollPipelineIntoStatements(it, lines, isLast);
      } else {
        const code = this.transpile(it);
        lines.push(isLast ? `return ${code};` : `${code};`);
      }
    }
    this.indentLevel--;

    return `{\n${lines.map(l => "  " + l).join("\n")}\n}`;
  }

  // --- Развертка цепочки A . B .> C . D в читаемый линейный код ---
  private unrollPipelineIntoStatements(pipeNode: any, lines: string[], isLastReturn: boolean) {
    // Собираем плоский список звеньев пайплайна
    const chain: { op: string, node: any }[] = [];
    let curr = pipeNode;

    while (curr && curr.type === "PipelineExpr") {
      chain.unshift({ op: curr.operator, node: curr.right });
      curr = curr.left;
    }
    chain.unshift({ op: "", node: curr });

    let currentVar = this.transpile(chain[0].node);

    for (let i = 1; i < chain.length; i++) {
      const { op, node } = chain[i];
      const isFinal = (i === chain.length - 1) && isLastReturn;

      // Если звено - роутер матчинга { Case [...] }
      if (node.type === "FormBlock") {
        const routerCode = this.transpileRouterInline(node, currentVar);
        lines.push(routerCode);
        return;
      }

      const targetCode = this.transpile(node);

      if (op === ".>") {
        // Tap-эффект: выполняем действие, но сохраняем текущее значение
        lines.push(`${targetCode}(${currentVar});`);
      } else {
        // Обычный переход: трансформация
        const nextExpr = `${targetCode}(${currentVar})`;
        if (isFinal) {
          lines.push(`return ${nextExpr};`);
          return;
        } else {
          const tempVar = `_${i}`;
          lines.push(`const ${tempVar} = ${nextExpr};`);
          currentVar = tempVar;
        }
      }
    }

    if (isLastReturn) {
      lines.push(`return ${currentVar};`);
    }
  }

  // --- Обычные выражения пайплайнов вне многострочных блоков ---
  private transpilePipelineExpr(node: any): string {
    const left = this.transpile(node.left);

    if (node.right.type === "FormBlock") {
      return `((__val) => {\n${this.transpileRouterInline(node.right, "__val")}\n})(${left})`;
    }

    const right = this.transpile(node.right);
    if (node.operator === ".>") {
      return `((_ctx) => { ${right}(_ctx); return _ctx; })(${left})`;
    }
    return `${right}(${left})`;
  }

  // --- Человеко-понятный Роутер / Pattern matching ---
  private transpileRouterInline(formBlock: any, targetVar: string): string {
    const cases = formBlock.items.map((item: any) => {
      const matcher = item.left;
      const action = item.right;

      // Case 1: Wildcard / Default ветка `_ [...]`
      if (matcher.type === "Path" && matcher.value === "_") {
        return `  // Default\n  return ${this.transpile(action)};`;
      }

      // Case 2: Матчинг конкретного значения (число, строка)
      if (matcher.type === "Number" || matcher.type === "String") {
        return `  if (${targetVar} === ${this.transpile(matcher)}) {\n    return ${this.transpile(action)};\n  }`;
      }

      // Case 3: Матчинг типа с захватом переменной: BuildError(NewErr) [...]
      if (matcher.type === "CallExpr") {
        const typeName = this.transpile(matcher.path);
        const varName = matcher.args.items[0]?.left?.value || "err";
        return `  if (${targetVar}?.__type === "${typeName}") {\n    const ${varName} = ${targetVar};\n    return ${this.transpile(action)};\n  }`;
      }

      // Case 4: Матчинг типа с авто-распаковкой (auto-unpacking): SmallError [...]
      const typeName = this.transpile(matcher);
      return `  if (${targetVar}?.__type === "${typeName}") {\n    const { ...fields } = ${targetVar};\n    return ${this.transpile(action)};\n  }`;
    });

    return cases.join("\n\n");
  }

  // --- Преобразование формы в объект JavaScript ---
  private transpileObjectLiteral(block: any): string {
    const items = block.items || [];
    if (items.length === 0) return "{}";

    const fields = items.map((it: any) => {
      const key = it.left.value || this.transpile(it.left);
      const val = it.right ? this.transpile(it.right) : key;
      return `${key}: ${val}`;
    });

    return `{\n    ${fields.join(",\n    ")}\n  }`;
  }
}
// =============================================================================
// 5. ИНТЕРПРЕТАТОР (Razomy Runtime Interpreter)
// =============================================================================

class Environment {
  constructor(
    public records: Record<string, any> = {},
    public parent: Environment | null = null,
    public pipelineContext: any = null
  ) {}

  define(name: string, value: any) {
    this.records[name] = value;
  }

  lookup(name: string): any {
    if (name in this.records) return this.records[name];
    if (this.pipelineContext && typeof this.pipelineContext === "object" && name in this.pipelineContext) {
      return this.pipelineContext[name];
    }
    if (this.parent) return this.parent.lookup(name);
    return undefined;
  }
}

export class RazomyInterpreter {
  private globalEnv = new Environment();

  constructor() {
    this.globalEnv.define("Shell", {
      Log: (val: any) => {
        const out = typeof val === "object" ? JSON.stringify(val) : String(val);
        console.log(`[Shell.Log] 🖨️  ${out}`);
        return val;
      },
      Exec: (cmd: any) => {
        console.log(`[Shell.Exec] ⚙️  ${cmd}`);
        return { __type: "BuildSuccess", Status: "OK", Artifact: "dist/bin" };
      }
    });

    this.globalEnv.define("native_print", (v: any) => { console.log(v); return v; });
    this.globalEnv.define("native_exec", (v: any) => ({ __type: "BuildSuccess", Status: "OK" }));
    this.globalEnv.define("native_ai_solve", (ctx: any) => ({ __type: "BuildSuccess", Status: "Patched" }));
    this.globalEnv.define("native_split_double_spaces", (s: string) => String(s).split("  "));

    // Хелперы списков
    this.globalEnv.define("Cons", (val: any) => ({ __type: "Cons", ...val }));
    this.globalEnv.define("None", { __type: "None" });
    this.globalEnv.define("List1", (a: any) => ({ __type: "Cons", Head: a, Tail: { __type: "None" } }));
    this.globalEnv.define("List2", (a: any, b: any) => ({ __type: "Cons", Head: a, Tail: { __type: "Cons", Head: b, Tail: { __type: "None" } } }));
  }

  public run(ast: any) {
    if (!ast) return null;
    if (ast.type === "File") {
      let last = null;
      for (const decl of ast.body) {
        last = this.eval(decl, this.globalEnv);
      }
      return last;
    }
    return this.eval(ast, this.globalEnv);
  }

  private interpolate(str: string, env: Environment): string {
    return str.replace(/\{([^}]+)\}/g, (_, expr) => {
      try {
        const val = env.lookup(expr.trim());
        return val !== undefined ? String(val) : expr;
      } catch {
        return expr;
      }
    });
  }

  private eval(node: any, env: Environment): any {
    if (!node) return null;

    switch (node.type) {
      case "Number":
      case "Bool":
        return node.value;

      case "String":
        return this.interpolate(node.value, env);

      case "Path": {
        if (node.value === "_") return env.pipelineContext;
        let cur = env.lookup(node.parts[0]);
        for (let i = 1; i < node.parts.length; i++) {
          if (cur != null) cur = cur[node.parts[i]];
        }
        return cur;
      }

      case "Declaration": {
        if (node.left.type === "TypedFlowBlock") {
          const name = node.left.path.value;
          const val = this.eval(node.left.block, env);
          env.define(name, val);
          return val;
        }
        if (node.left.type === "CallExpr" && node.right) {
          const fnName = node.left.path.value;
          const paramNames = node.left.args.items.map((i: any) => i.left.value);
          const self = this;
          function fn (...args: any[]) {
                        const callEnv = new Environment({}, env);
                        paramNames.forEach((p: string, idx: number) => {
                          callEnv.define(p, args[idx]);
                          if (typeof args[idx] === 'object') {
                            callEnv.pipelineContext = args[idx];
                          }
                        });
                        return self.eval(node.right, callEnv);
                      }
          env.define(fnName, fn);
          return fn;
        }
        if (node.left.type === "Path") {
          const val = node.right ? this.eval(node.right, env) : { __type: node.left.value };
          env.define(node.left.value, val);
          return val;
        }
        return null;
      }

      case "MathExpr": {
        const l = this.eval(node.left, env);
        const r = this.eval(node.right, env);
        if (node.operator === "+") return l + r;
        if (node.operator === "-") return l - r;
        if (node.operator === "*") return l * r;
        return 0;
      }

      case "CompareExpr": {
        const l = this.eval(node.left, env);
        const r = this.eval(node.right, env);
        if (node.operator === "<=") return l <= r;
        if (node.operator === ">=") return l >= r;
        if (node.operator === "<") return l < r;
        if (node.operator === ">") return l > r;
        if (node.operator === "==" || node.operator === "=") return l === r;
        return false;
      }

      case "CallExpr": {
        const fn = this.eval(node.path, env);
        const args = node.args.items.map((i: any) => this.eval(i.left, env));
        if (typeof fn === "function") return fn(...args);
        return { __type: node.path.value, ...args[0] };
      }

      case "PipelineExpr": {
        const leftVal = this.eval(node.left, env);

        if (node.right.type === "FormBlock") {
          // Pattern matching router
          return this.matchFormRouter(leftVal, node.right, env);
        }

        let rightVal;
        if (node.right.type === "Path") {
          const fn = this.eval(node.right, env);
          rightVal = typeof fn === "function" ? fn(leftVal) : fn;
        } else {
          const nextEnv = new Environment({}, env, leftVal);
          rightVal = this.eval(node.right, nextEnv);
        }

        if (node.operator === ".>") return leftVal;
        if (node.operator === ".&") return Object.assign({}, leftVal, rightVal);
        return rightVal;
      }

      case "TypedFormBlock": {
        const formType = node.path.value;
        const obj: any = { __type: formType };
        for (const item of node.block.items) {
          const k = item.left.value;
          obj[k] = item.right ? this.eval(item.right, env) : env.lookup(k);
        }
        return obj;
      }

      case "FormBlock": {
        const obj: any = {};
        for (const item of node.items) {
          const k = item.left.value;
          obj[k] = item.right ? this.eval(item.right, env) : env.lookup(k);
        }
        return obj;
      }

      case "TypedFlowBlock":
        return this.eval(node.block, env);

      case "FlowBlock": {
        let res = null;
        for (const it of node.items) {
          res = this.eval(it, env);
        }
        return res;
      }

      default:
        return null;
    }
  }

  private matchFormRouter(target: any, formBlock: any, parentEnv: Environment): any {
    for (const item of formBlock.items) {
      const matcherNode = item.left;
      const actionNode = item.right;

      let matched = false;
      let captureName: string | null = null;

      if (matcherNode.type === "Path" && (matcherNode.value === "_" || matcherNode.value === "__ctx")) {
        matched = true;
      } else if (matcherNode.type === "CallExpr") {
        const typeName = matcherNode.path.value;
        captureName = matcherNode.args.items[0]?.left?.value || null;
        if (target && (target.__type === typeName || target[typeName])) matched = true;
      } else if (matcherNode.type === "Path") {
        const expected = matcherNode.value;
        if (target === expected || (target && target.__type === expected)) matched = true;
      } else if (matcherNode.type === "FlowBlock") {
        // Предикат вида [ _ >= 2000 ]
        const condEnv = new Environment({}, parentEnv, target);
        matched = Boolean(this.eval(matcherNode, condEnv));
      } else {
        const expected = this.eval(matcherNode, parentEnv);
        if (target === expected) matched = true;
      }

      if (matched) {
        const matchEnv = new Environment({}, parentEnv, target);
        if (captureName) matchEnv.define(captureName, target);
        // Auto-unpacking: вливаем все поля объекта в скоуп
        if (target && typeof target === "object") {
          for (const [k, v] of Object.entries(target)) {
            matchEnv.define(k, v);
          }
        }
        return this.eval(actionNode, matchEnv);
      }
    }
    return target;
  }
}
