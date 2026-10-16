// =============================================================================
// 4. ЧИСТЫЙ МОРФИЧЕСКИЙ ТРАНСПАЙЛЕР В TYPESCRIPT (Razomy V4.0 -> TypeScript)
// =============================================================================

const primitiveTypes: Record<string, string> = {
  String: 'string',
  Int: 'number',
  Float: 'number',
  Bool: 'boolean',
  Byte: 'number',
  Any: 'any',
  _: 'any',
};

export class RazomyToTSTranspiler {
  private contextVarStack: string[] = ['_0'];

  private get currentContextVar(): string {
    return this.contextVarStack[this.contextVarStack.length - 1];
  }

  public transpile(node: any): string {
    if (!node) return '';

    switch (node.type) {
      case 'File':
        return node.body
          .map((n: any) => this.transpile(n))
          .filter((s: string) => s.trim().length > 0)
          .join('\n\n');

      case 'Number':
      case 'Bool':
        return String(node.value);

      case 'String': {
        if (node.value.includes('{')) {
          const interpolated = node.value.replace(/\{([^}]+)\}/g, (_: string, expr: string) => {
            return `\${${expr.trim()}}`;
          });
          return `\`${interpolated}\``;
        }
        return `"${node.value}"`;
      }

      case 'Path':
        return this.transpilePath(node);

      case 'Declaration':
        return this.transpileDeclaration(node);

      case 'Slot': {
        if (node.items.length === 1 && !node.items[0].right) {
          return `(${this.transpile(node.items[0].left)})`;
        }
        const els = node.items.map((i: any) => this.transpile(i.left)).join(', ');
        return `[${els}]`;
      }

      case 'TypedFormBlock': {
        const name = this.transpile(node.path);
        const obj = this.transpileObjectLiteral(node.block, name);
        return obj;
      }

      case 'TypedFlowBlock': {
        // Если это лямбда вида `N [ ... ]` или `State [ ... ]`
        if (node.path.type === 'Path' && node.block.type === 'FlowBlock') {
          const param = node.path.value;
          const body = this.transpileFlowBody(node.block, param);
          return `(${param}: any) => ${body}`;
        }
        const name = this.transpile(node.path);
        return this.transpileNamedMorphism(name, [], node.block);
      }

      case 'FlowBlock': {
        // Анонимный морфизм `[ _ + C ]` или список `[ Item1, Item2 ]`
        if (this.containsContextRef(node)) {
          const param = '_ctx';
          this.contextVarStack.push(param);
          const body = this.transpileFlowBody(node, param);
          this.contextVarStack.pop();
          return `(${param}: any) => ${body}`;
        }
        if (node.items.length > 1 && node.items.every((it: any) => it.type !== 'PipelineExpr')) {
          return `[${node.items.map((i: any) => this.transpile(i)).join(', ')}]`;
        }
        return this.transpileFlowBody(node);
      }

      case 'FormBlock':
        return this.transpileObjectLiteral(node);

      case 'CallExpr': {
        // Лямбда с несколькими параметрами: `(Acc, Price) [ Acc + Price ]`
        const target = this.transpile(node.path);
        const args = node.args.items.map((i: any) => this.transpile(i.left)).join(', ');
        return `${target}(${args})`;
      }

      case 'UnaryExpr':
        return `${node.operator}${this.transpile(node.argument)}`;

      case 'UnionExpr':
        return `${this.transpile(node.left)} | ${this.transpile(node.right)}`;

      case 'MergeExpr':
        return `${this.transpile(node.left)} & ${this.transpile(node.right)}`;

      case 'SubtractExpr':
        return `${this.transpile(node.left)} / ${this.transpile(node.right)}`;

      case 'LogicExpr':
      case 'ShiftExpr':
      case 'MathExpr':
      case 'CompareExpr': {
        const op =
          node.operator === '=' || node.operator === '==' ? '===' : node.operator === '!=' ? '!==' : node.operator;
        return `${this.transpile(node.left)} ${op} ${this.transpile(node.right)}`;
      }

      case 'PipelineExpr':
        return this.transpilePipelineExpr(node);

      default:
        return '';
    }
  }

  private transpilePath(node: any): string {
    const parts = node.parts;
    if (parts[0] === '_') {
      if (parts.length === 1) return this.currentContextVar;
      return `${this.currentContextVar}.${parts.slice(1).join('.')}`;
    }

    // Обработка индексного доступа: Jonn.0 -> Jonn[0], Jonn.-1 -> Jonn.at(-1)
    let res = parts[0];
    for (let i = 1; i < parts.length; i++) {
      const p = parts[i];
      if (/^-?\d+$/.test(p)) {
        res += Number(p) < 0 ? `.at(${p})` : `[${p}]`;
      } else {
        res += `.${p}`;
      }
    }
    return res;
  }

  // --- Обработка объявлений: типов, морфизмов, функций и модулей ---
  private transpileDeclaration(node: any): string {
    const left = node.left;
    const right = node.right;

    // 1. Одиночное выражение или морфизм без правой части: `Main [ ... ]` или `Zero {}`
    if (!right) {
      if (left.type === 'TypedFlowBlock') {
        // Если морфизм использует `_` или цепочки вложенных морфизмов (`A [[_ + C] . [_ + E]]`),
        // генерируем функцию с аргументом `_0`, иначе `()`
        const needsArg = this.containsContextRef(left.block) || this.isMorphismChain(left.block);
        const params = needsArg ? ['_0: any'] : [];
        return this.transpileNamedMorphism(this.transpile(left.path), params, left.block);
      }

      if (left.type === 'TypedFormBlock') {
        const name = this.transpile(left.path);
        const block = left.block;

        if (block.items.length === 0) {
          return `export interface ${name} {}`;
        }

        // Проверяем: это модуль методов (`Shell { Log(Msg) [...] }`) или структура (`User { Id String }`)
        const isModule = block.items.some(
          (it: any) =>
            it.left.type === 'CallExpr' ||
            it.left.type === 'TypedFlowBlock' ||
            (it.right && it.right.type === 'FlowBlock'),
        );

        if (isModule) {
          const methods = block.items.map((it: any) => this.transpileModuleItem(it));
          return `export const ${name} = {\n${methods.join(',\n')}\n};`;
        }

        // Если это интерфейс структуры
        if (this.isTypeForm(block)) {
          return `export interface ${name} ${this.transpileTypeInterfaceBody(block)}`;
        }

        return `export const ${name} = ${this.transpileObjectLiteral(block, name)};`;
      }

      if (left.type === 'PipelineExpr' && left.left.type === 'TypedFormBlock') {
        // Мета-программирование / Декоратор: `Product { Id Int } . DeriveJson`
        const formName = this.transpile(left.left.path);
        const macro = this.transpile(left.right);
        const obj = this.transpileObjectLiteral(left.left.block, formName);
        return `export const ${formName} = ${macro}(${obj});`;
      }

      return this.transpile(left);
    }

    // 2. Функция с параметрами: `Fn(A Int, B Int) [ ... ]` или `Succ(N) { Prev N }`
    if (left.type === 'CallExpr') {
      const fnName = this.transpile(left.path);
      const params = left.args.items.map((item: any) => {
        const paramName = this.transpile(item.left);
        const paramType = item.right ? this.transpileTypeExpr(item.right) : 'any';
        return `${paramName}: ${paramType}`;
      });

      if (right.type === 'FlowBlock') {
        return this.transpileNamedMorphism(fnName, params, right);
      }

      if (right.type === 'FormBlock') {
        if (this.isTypeForm(right)) {
          const typeParams = left.args.items.map((i: any) => this.transpile(i.left)).join(', ');
          return `export interface ${fnName}<${typeParams}> ${this.transpileTypeInterfaceBody(right)}`;
        }
        return `export function ${fnName}(${params.join(', ')}) {\n  return ${this.transpileObjectLiteral(
          right,
          fnName,
        )};\n}`;
      }

      if (this.isTypeExpression(right)) {
        const typeParams = left.args.items.map((i: any) => this.transpile(i.left)).join(', ');
        return `export type ${fnName}<${typeParams}> = ${this.transpileTypeExpr(right)};`;
      }

      return `export const ${fnName} = (${params.join(', ')}) => ${this.transpile(right)};`;
    }

    // 3. Имя + Правая часть: `A B & C`, `Name String`, `IsAdult [ _.Age >= 18 ]`, `JonnName HasParentName { ... }`
    if (left.type === 'Path') {
      const name = left.value;

      // Морфизм-предикат или поток: `IsAdult [ _.Age >= 18 ]` или `A [[_ + C] . [_ + E]]`
      if (right.type === 'FlowBlock') {
        const needsArg = this.containsContextRef(right) || this.isMorphismChain(right);
        const params = needsArg ? ['_0: any'] : [];
        return this.transpileNamedMorphism(name, params, right);
      }

      // Наследование/переопределение формы: `JonnName HasParentName { ParentName Jonn }`
      if (right.type === 'TypedFormBlock') {
        const baseName = this.transpile(right.path);
        const overrides = this.transpileObjectLiteral(right.block, name);
        return `export const ${name} = { ...${baseName}, ...${overrides} };`;
      }

      // Алгебра типов: `A B & C`, `Status "draft" | "published"`, `PublicUser User / User.PasswordHash`
      if (this.isTypeDeclaration(name, right)) {
        return `export type ${name} = ${this.transpileTypeExpr(right)};`;
      }

      // Обычная константа или инстанс
      return `export const ${name} = ${this.transpile(right)};`;
    }

    return `export const ${this.transpile(left)} = ${this.transpile(right)};`;
  }

  // --- Генерация именованной функции / морфизма ---
  private transpileNamedMorphism(name: string, params: string[], block: any): string {
    const firstParamName = params.length > 0 ? params[0].split(':')[0].trim() : '_0';
    this.contextVarStack.push(firstParamName);
    const body = this.transpileFlowBody(block, firstParamName, true);
    this.contextVarStack.pop();
    return `export function ${name}(${params.join(', ')}) ${body}`;
  }

  // --- Преобразование тела потока `[...]` в чистый линейный код ---
  private transpileFlowBody(block: any, inputVar = '_0', forceBraces = false): string {
    const items = block.items || [];
    if (items.length === 0) return forceBraces ? '{\n  return undefined;\n}' : 'undefined';

    // Если внутри один простой элемент (не пайплайн и не вложенный морфизм)
    if (!forceBraces && items.length === 1 && items[0].type !== 'PipelineExpr' && items[0].type !== 'FlowBlock') {
      return this.transpile(items[0]);
    }

    const lines: string[] = [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const isLast = i === items.length - 1;

      if (it.type === 'PipelineExpr') {
        this.unrollPipelineIntoStatements(it, lines, isLast, inputVar);
      } else if (it.type === 'FlowBlock') {
        // Вложенный морфизм `[[_ + C]]`
        this.contextVarStack.push(inputVar);
        const inner = this.transpileFlowBody(it, inputVar, false);
        this.contextVarStack.pop();
        lines.push(isLast ? `return ${inner};` : `${inner};`);
      } else if (it.type === 'FlowItem') {
        // Локальное связывание внутри потока: `Full "{First} {Last}"`
        const varName = this.transpile(it.left);
        const valCode = this.transpile(it.right);
        lines.push(`const ${varName} = ${valCode};`);
        if (isLast) lines.push(`return ${varName};`);
      } else {
        const code = this.transpile(it);
        lines.push(isLast ? `return ${code};` : `${code};`);
      }
    }

    return `{\n${lines.map((l) => '  ' + l).join('\n')}\n}`;
  }

  // --- Развертка цепочки пайплайнов (включая `[[_ + C] . [_ + E]]`) в линейные переменные `_1`, `_2` ---
  private unrollPipelineIntoStatements(pipeNode: any, lines: string[], isLastReturn: boolean, initialInput = '_0') {
    const chain: { op: string; node: any }[] = [];
    let curr = pipeNode;

    while (curr && curr.type === 'PipelineExpr') {
      chain.unshift({ op: curr.operator, node: curr.right });
      curr = curr.left;
    }
    chain.unshift({ op: '', node: curr });

    let currentVar = initialInput;
    let stepCounter = 1;

    // Обработка первого звена цепочки
    const firstNode = chain[0].node;
    if (firstNode.type === 'FlowBlock') {
      const stepVar = `_${stepCounter++}`;
      const exprCode = this.evaluateStepWithContext(firstNode, currentVar);
      lines.push(`const ${stepVar} = ${exprCode};`);
      currentVar = stepVar;
    } else {
      currentVar = this.transpile(firstNode);
    }

    // Проход по всем последующим звеньям
    for (let i = 1; i < chain.length; i++) {
      const { op, node } = chain[i];
      const isFinal = i === chain.length - 1 && isLastReturn;

      // 1. Роутер / Pattern Matching `{ Case [...] }`
      if (node.type === 'FormBlock') {
        if (op === '.|') {
          // Параллельный fan-out пайплайн `.| { Profile [...], Recs [...] }`
          const parallelCode = this.transpileParallelFanOut(node, currentVar);
          if (isFinal) {
            lines.push(`return ${parallelCode};`);
            return;
          }
          const stepVar = `_${stepCounter++}`;
          lines.push(`const ${stepVar} = ${parallelCode};`);
          currentVar = stepVar;
          continue;
        }
        const routerCode = this.transpileRouterInline(node, currentVar);
        lines.push(routerCode);
        return;
      }

      // 2. Вычисление шага морфизма
      const stepExpr = this.applyPipelineStep(op, currentVar, node);

      if (op === '.>') {
        // Tap-эффект: выполняем побочный эффект, но сохраняем `currentVar`
        lines.push(`${stepExpr};`);
      } else if (op === '.&') {
        // Enrich-эффект: сливаем результат с текущим контекстом
        const stepVar = `_${stepCounter++}`;
        lines.push(`const ${stepVar} = { ...${currentVar}, ...${stepExpr} };`);
        currentVar = stepVar;
      } else {
        const stepVar = `_${stepCounter++}`;
        lines.push(`const ${stepVar} = ${stepExpr};`);
        currentVar = stepVar;
      }
    }

    if (isLastReturn) {
      lines.push(`return ${currentVar};`);
    }
  }

  private applyPipelineStep(op: string, inputVar: string, stepNode: any): string {
    if (op === '..') {
      return `range(${inputVar}, ${this.transpile(stepNode)})`;
    }

    // Если шаг — это поток `[ _ + E ]` или `[ "Text" . Shell.Log ]`
    if (stepNode.type === 'FlowBlock') {
      return this.evaluateStepWithContext(stepNode, inputVar);
    }

    // Если шаг — это слот-лямбда `(Len [ Results.Send(Len) ])`
    if (stepNode.type === 'Slot' && stepNode.items.length === 1 && stepNode.items[0].left.type === 'TypedFlowBlock') {
      const tf = stepNode.items[0].left;
      const paramName = tf.path.value;
      return this.evaluateStepWithContext(tf.block, inputVar, paramName);
    }

    // Если шаг — вызов с доп. аргументами: `x . Split(" ")` -> `Split(x, " ")`
    if (stepNode.type === 'CallExpr') {
      const fn = this.transpile(stepNode.path);
      const extraArgs = stepNode.args.items.map((i: any) => this.transpile(i.left));
      const allArgs = [inputVar, ...extraArgs].join(', ');
      return `${fn}(${allArgs})`;
    }

    const targetCode = this.transpile(stepNode);
    if (op === '.?') {
      return `(${targetCode}(${inputVar}) ? ${inputVar} : undefined)`;
    }
    return `${targetCode}(${inputVar})`;
  }

  private evaluateStepWithContext(flowBlock: any, contextVar: string, customParam?: string): string {
    this.contextVarStack.push(customParam || contextVar);
    let result: string;
    if (flowBlock.items.length === 1 && flowBlock.items[0].type !== 'PipelineExpr') {
      result = this.transpile(flowBlock.items[0]);
    } else if (flowBlock.items.length === 1 && flowBlock.items[0].type === 'PipelineExpr') {
      result = this.transpilePipelineExpr(flowBlock.items[0]);
    } else {
      const body = this.transpileFlowBody(flowBlock, customParam || contextVar, true);
      result = customParam ? `((${customParam}: any) => ${body})(${contextVar})` : `(() => ${body})()`;
    }
    this.contextVarStack.pop();
    return result;
  }

  // --- Выражения пайплайнов внутри других выражений ---
  private transpilePipelineExpr(node: any): string {
    const left = this.transpile(node.left);
    if (node.operator === '..') {
      return `range(${left}, ${this.transpile(node.right)})`;
    }
    if (node.right.type === 'FormBlock') {
      return `((__val: any) => {\n${this.transpileRouterInline(node.right, '__val')}\n})(${left})`;
    }
    return this.applyPipelineStep(node.operator, left, node.right);
  }

  // --- Роутер / Pattern Matching `{}` ---
  private transpileRouterInline(formBlock: any, targetVar: string): string {
    const cases = formBlock.items.map((item: any) => {
      const matcher = item.left;
      const action = item.right;

      // 1. Wildcard `_ [...]`
      if (matcher.type === 'Path' && matcher.value === '_') {
        const body = this.evaluateStepWithContext(action, targetVar);
        return `  return ${body};`;
      }

      // 2. Предикат `[ _ >= 2000 ] [ 300 ]`
      if (matcher.type === 'FlowBlock') {
        const cond = this.evaluateStepWithContext(matcher, targetVar);
        const body = this.evaluateStepWithContext(action, targetVar);
        return `  if (${cond}) {\n    return ${body};\n  }`;
      }

      // 3. Примитивное значение (число, строка, булево)
      if (matcher.type === 'Number' || matcher.type === 'String' || matcher.type === 'Bool') {
        const body = this.evaluateStepWithContext(action, targetVar);
        return `  if (${targetVar} === ${this.transpile(matcher)}) {\n    return ${body};\n  }`;
      }

      // 4. Захват типа в переменную: `CompileError(NewErr) [...]`
      if (matcher.type === 'CallExpr') {
        const typeName = this.transpile(matcher.path);
        const varName = matcher.args.items[0]?.left?.value || 'err';
        const body = this.evaluateStepWithContext(action, varName);
        return `  if (${targetVar}?.__type === "${typeName}") {\n    const ${varName} = ${targetVar};\n    return ${body};\n  }`;
      }

      // 5. Матчинг формы с авто-распаковкой (Iron Rule of Auto-Unpacking)
      const typeName = this.transpile(matcher);
      const body = this.evaluateStepWithContext(action, targetVar);
      return `  if (${targetVar}?.__type === "${typeName}") {\n    return ${body};\n  }`;
    });

    return cases.join('\n');
  }

  private transpileParallelFanOut(formBlock: any, targetVar: string): string {
    const branches = formBlock.items.map((it: any) => {
      const key = this.transpile(it.left);
      const val = this.evaluateStepWithContext(it.right, targetVar);
      return `${key}: ${val}`;
    });
    return `{ ${branches.join(', ')} }`;
  }

  // --- Транспиляция типов (`A B & C`, `User / User.PasswordHash`, `A | B`) ---
  private isTypeDeclaration(name: string, right: any): boolean {
    if (right.type === 'UnionExpr' || right.type === 'SubtractExpr') return true;
    if (right.type === 'MergeExpr') {
      // Если правая часть содержит предикат `[ _.Code >= 500 ]`, это рантайм-рафинирование или тип
      return !this.containsFlowBlock(right);
    }
    if (right.type === 'Path' && (right.value in primitiveTypes || /^[A-Z]/.test(right.value))) {
      return right.parts.length === 1;
    }
    if (
      right.type === 'Slot' &&
      right.items.every((i: any) => i.left.type === 'Path' && i.left.value in primitiveTypes)
    ) {
      return true;
    }
    return false;
  }

  private isTypeExpression(node: any): boolean {
    return (
      node.type === 'UnionExpr' ||
      node.type === 'MergeExpr' ||
      node.type === 'SubtractExpr' ||
      (node.type === 'Path' && node.value in primitiveTypes)
    );
  }

  private transpileTypeExpr(node: any): string {
    if (!node) return 'any';
    if (node.type === 'Path') {
      return primitiveTypes[node.value] || node.value;
    }
    if (node.type === 'UnionExpr') {
      return `${this.transpileTypeExpr(node.left)} | ${this.transpileTypeExpr(node.right)}`;
    }
    if (node.type === 'MergeExpr') {
      if (node.right.type === 'FormBlock' && this.isTypeForm(node.right)) {
        return `${this.transpileTypeExpr(node.left)} & ${this.transpileTypeInterfaceBody(node.right)}`;
      }
      return `${this.transpileTypeExpr(node.left)} & ${this.transpileTypeExpr(node.right)}`;
    }
    if (node.type === 'SubtractExpr') {
      const base = this.transpileTypeExpr(node.left);
      const removedField =
        node.right.type === 'Path' ? `"${node.right.parts[node.right.parts.length - 1]}"` : this.transpile(node.right);
      return `Omit<${base}, ${removedField}>`;
    }
    if (node.type === 'CallExpr') {
      const base = this.transpile(node.path);
      const args = node.args.items.map((i: any) => this.transpileTypeExpr(i.left)).join(', ');
      return `${base}<${args}>`;
    }
    if (node.type === 'Slot') {
      const types = node.items.map((i: any) => this.transpileTypeExpr(i.left)).join(', ');
      return `[${types}]`;
    }
    return this.transpile(node);
  }

  private isTypeForm(block: any): boolean {
    if (!block.items || block.items.length === 0) return true;
    return block.items.every((it: any) => {
      if (!it.right) return false;
      if (it.right.type === 'Path' && (it.right.value in primitiveTypes || /^[A-Z]/.test(it.right.value))) {
        return true;
      }
      return this.isTypeExpression(it.right) || it.right.type === 'CallExpr';
    });
  }

  private transpileTypeInterfaceBody(block: any): string {
    const fields = block.items.map((it: any) => {
      const key = this.transpile(it.left);
      const typeStr = it.right ? this.transpileTypeExpr(it.right) : 'any';
      return `  ${key}: ${typeStr};`;
    });
    return `{\n${fields.join('\n')}\n}`;
  }

  private transpileModuleItem(it: any): string {
    if (it.left.type === 'CallExpr') {
      const fnName = this.transpile(it.left.path);
      const params = it.left.args.items.map((p: any) => {
        const pName = this.transpile(p.left);
        const pType = p.right ? this.transpileTypeExpr(p.right) : 'any';
        return `${pName}: ${pType}`;
      });
      const firstParam = params.length > 0 ? params[0].split(':')[0].trim() : '_0';
      this.contextVarStack.push(firstParam);
      const body = it.right ? this.transpileFlowBody(it.right, firstParam, false) : 'undefined';
      this.contextVarStack.pop();
      return `  ${fnName}: (${params.join(', ')}) => ${body}`;
    }
    const key = this.transpile(it.left);
    const val = it.right ? this.transpile(it.right) : 'undefined';
    return `  ${key}: ${val}`;
  }

  private transpileObjectLiteral(block: any, typeTag?: string): string {
    const items = block.items || [];
    if (items.length === 0) return typeTag ? `{ __type: "${typeTag}" }` : '{}';

    const fields: string[] = [];
    if (typeTag) {
      fields.push(`__type: "${typeTag}"`);
    }

    for (const it of items) {
      const key = it.left.type === 'String' ? `"${it.left.value}"` : this.transpile(it.left);
      const val = it.right ? this.transpile(it.right) : key;
      fields.push(`${key}: ${val}`);
    }

    return `{ ${fields.join(', ')} }`;
  }

  // --- Вспомогательные анализаторы AST ---
  private containsContextRef(node: any): boolean {
    if (!node || typeof node !== 'object') return false;
    if (node.type === 'Path' && node.parts[0] === '_') return true;
    for (const k of Object.keys(node)) {
      const child = node[k];
      if (Array.isArray(child) && child.some((c) => this.containsContextRef(c))) return true;
      if (child && typeof child === 'object' && this.containsContextRef(child)) return true;
    }
    return false;
  }

  private containsFlowBlock(node: any): boolean {
    if (!node || typeof node !== 'object') return false;
    if (node.type === 'FlowBlock') return true;
    return this.containsFlowBlock(node.left) || this.containsFlowBlock(node.right);
  }

  private isMorphismChain(block: any): boolean {
    if (!block || block.type !== 'FlowBlock' || block.items.length === 0) return false;
    const first = block.items[0];
    return first.type === 'PipelineExpr' && first.left.type === 'FlowBlock';
  }
}

// =============================================================================
// 5. ИНТЕРПРЕТАТОР (Razomy Runtime Interpreter V4.0)
// =============================================================================

class Environment {
  constructor(
    public records: Record<string, any> = {},
    public parent: Environment | null = null,
    public pipelineContext: any = null,
  ) {}

  define(name: string, value: any) {
    this.records[name] = value;
  }

  lookup(name: string): any {
    if (name in this.records) return this.records[name];
    if (this.pipelineContext && typeof this.pipelineContext === 'object' && name in this.pipelineContext) {
      return this.pipelineContext[name];
    }
    if (this.parent) return this.parent.lookup(name);
    return undefined;
  }
}

export class RazomyInterpreter {
  private globalEnv = new Environment();

  constructor() {
    this.globalEnv.define('Shell', {
      Log: (val: any) => {
        const out = typeof val === 'object' ? JSON.stringify(val) : String(val);
        console.log(`[Shell.Log] 🖨️  ${out}`);
        return val;
      },
      Exec: (cmd: any) => {
        console.log(`[Shell.Exec] ⚙️  ${cmd}`);
        return { __type: 'BuildSuccess', Status: 'OK', Artifact: 'dist/bin' };
      },
    });

    this.globalEnv.define('native_print', (v: any) => {
      console.log(v);
      return v;
    });
    this.globalEnv.define('native_exec', (v: any) => ({ __type: 'BuildSuccess', Status: 'OK' }));
    this.globalEnv.define('Cons', (val: any) => ({ __type: 'Cons', ...val }));
    this.globalEnv.define('None', { __type: 'None' });
  }

  public run(ast: any) {
    if (!ast) return null;
    if (ast.type === 'File') {
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
        const parts = expr.trim().split('.');
        let val = parts[0] === '_' ? env.pipelineContext : env.lookup(parts[0]);
        for (let i = 1; i < parts.length; i++) {
          if (val != null) val = val[parts[i]];
        }
        return val !== undefined ? String(val) : expr;
      } catch {
        return expr;
      }
    });
  }

  private eval(node: any, env: Environment): any {
    if (!node) return null;

    switch (node.type) {
      case 'Number':
      case 'Bool':
        return node.value;

      case 'String':
        return this.interpolate(node.value, env);

      case 'Path': {
        let cur = node.parts[0] === '_' ? env.pipelineContext : env.lookup(node.parts[0]);
        for (let i = 1; i < node.parts.length; i++) {
          if (cur == null) break;
          const part = node.parts[i];
          if (/^-?\d+$/.test(part)) {
            const idx = Number(part);
            if (Array.isArray(cur)) {
              cur = idx < 0 ? cur[cur.length + idx] : cur[idx];
            } else if (typeof cur === 'object') {
              const keys = Object.keys(cur).filter((k) => k !== '__type' && !k.startsWith('__'));
              const key = idx < 0 ? keys[keys.length + idx] : keys[idx];
              cur = cur[key];
            }
          } else {
            cur = cur[part];
          }
        }
        return cur;
      }

      case 'Declaration': {
        const left = node.left;
        const right = node.right;

        if (!right) {
          if (left.type === 'TypedFlowBlock') {
            const name = left.path.value;
            // Если блок зависит от `_`, создаем вызываемую функцию, иначе вычисляем и сохраняем
            const val = this.eval(left.block, env);
            env.define(name, val);
            return val;
          }
          if (left.type === 'TypedFormBlock') {
            const name = left.path.value;
            const obj = this.eval(left, env);
            env.define(name, obj);
            return obj;
          }
          return this.eval(left, env);
        }

        if (left.type === 'CallExpr') {
          const fnName = left.path.value;
          const paramNames = left.args.items.map((i: any) => i.left.value);
          const self = this;
          const fn = function (...args: any[]) {
            const callEnv = new Environment({}, env);
            paramNames.forEach((p: string, idx: number) => {
              callEnv.define(p, args[idx]);
              if (args[idx] && typeof args[idx] === 'object') {
                callEnv.pipelineContext = args[idx];
                // Iron Rule of Auto-Unpacking: проецируем поля аргумента в локальный скоуп
                for (const [k, v] of Object.entries(args[idx])) {
                  if (!(k in callEnv.records)) callEnv.define(k, v);
                }
              }
            });
            return self.eval(right, callEnv);
          };
          env.define(fnName, fn);
          return fn;
        }

        if (left.type === 'Path') {
          if (right.type === 'FlowBlock') {
            const self = this;
            function morphism(input: any) {
              const callEnv = new Environment({}, env, input);
              if (input && typeof input === 'object') {
                for (const [k, v] of Object.entries(input)) callEnv.define(k, v);
              }
              return self.eval(right, callEnv);
            }
            env.define(left.value, morphism);
            return morphism;
          }
          const val = this.eval(right, env);
          if (val && typeof val === 'object') {
            val.__type = left.value;
          }
          env.define(left.value, val);
          return val;
        }
        return null;
      }

      case 'UnaryExpr': {
        const arg = this.eval(node.argument, env);
        if (node.operator === '!') return !arg;
        if (node.operator === '-') return -arg;
        return arg;
      }

      case 'MathExpr':
      case 'ShiftExpr': {
        const l = this.eval(node.left, env);
        const r = this.eval(node.right, env);
        switch (node.operator) {
          case '+':
            return l + r;
          case '-':
            return l - r;
          case '*':
            return l * r;
          case '/':
            return l / r;
          case '%':
            return l % r;
          case '**':
            return l ** r;
          case '<<':
            return l << r;
          case '>>':
            return l >> r;
        }
        return 0;
      }

      case 'LogicExpr': {
        if (node.operator === '&&') return this.eval(node.left, env) && this.eval(node.right, env);
        if (node.operator === '||') return this.eval(node.left, env) || this.eval(node.right, env);
        return false;
      }

      case 'CompareExpr': {
        const l = this.eval(node.left, env);
        const r = this.eval(node.right, env);
        switch (node.operator) {
          case '<=':
            return l <= r;
          case '>=':
            return l >= r;
          case '<':
            return l < r;
          case '>':
            return l > r;
          case '!=':
            return l !== r;
          case '==':
          case '=':
            return l === r;
        }
        return false;
      }

      case 'MergeExpr': {
        const l = this.eval(node.left, env);
        const r = this.eval(node.right, env);
        if (typeof l === 'object' && typeof r === 'object') {
          const merged: any = { ...l, ...r };
          if (l?.__type) merged[l.__type] = l;
          if (r?.__type) merged[r.__type] = r;
          return merged;
        }
        return r;
      }

      case 'SubtractExpr': {
        const l = this.eval(node.left, env);
        if (typeof l === 'number') {
          return l / this.eval(node.right, env);
        }
        if (l && typeof l === 'object') {
          const clone = { ...l };
          const key =
            node.right.type === 'String'
              ? node.right.value
              : node.right.type === 'Path'
              ? node.right.parts[node.right.parts.length - 1]
              : String(this.eval(node.right, env));
          delete clone[key];
          return clone;
        }
        return l;
      }

      case 'Slot': {
        if (node.items.length === 1 && !node.items[0].right) {
          return this.eval(node.items[0].left, env);
        }
        return node.items.map((i: any) => this.eval(i.left, env));
      }

      case 'CallExpr': {
        const fn = this.eval(node.path, env);
        const args = node.args.items.map((i: any) => this.eval(i.left, env));
        if (typeof fn === 'function') return fn(...args);
        return { __type: node.path.value, ...(typeof args[0] === 'object' ? args[0] : { Value: args[0] }) };
      }

      case 'PipelineExpr': {
        const leftVal = this.eval(node.left, env);

        if (node.operator === '..') {
          const endVal = this.eval(node.right, env);
          const arr: number[] = [];
          for (let i = Number(leftVal); i <= Number(endVal); i++) arr.push(i);
          return arr;
        }

        if (node.right.type === 'FormBlock') {
          if (node.operator === '.|') {
            const out: any = {};
            const nextEnv = new Environment({}, env, leftVal);
            for (const item of node.right.items) {
              out[item.left.value] = this.eval(item.right, nextEnv);
            }
            return out;
          }
          return this.matchFormRouter(leftVal, node.right, env);
        }

        let rightVal: any;
        if (node.right.type === 'FlowBlock') {
          const nextEnv = new Environment({}, env, leftVal);
          if (leftVal && typeof leftVal === 'object') {
            for (const [k, v] of Object.entries(leftVal)) nextEnv.define(k, v);
          }
          // Если первый шаг был лямбдой/морфизмом, вызываем его со значением
          const actualInput = typeof leftVal === 'function' ? leftVal(env.pipelineContext) : leftVal;
          nextEnv.pipelineContext = actualInput;
          rightVal = this.eval(node.right, nextEnv);
        } else if (node.right.type === 'CallExpr') {
          const fn = this.eval(node.right.path, env);
          const extraArgs = node.right.args.items.map((i: any) => this.eval(i.left, env));
          rightVal = typeof fn === 'function' ? fn(leftVal, ...extraArgs) : fn;
        } else if (node.right.type === 'Path') {
          const fn = this.eval(node.right, env);
          rightVal = typeof fn === 'function' ? fn(leftVal) : fn;
        } else {
          const nextEnv = new Environment({}, env, leftVal);
          rightVal = this.eval(node.right, nextEnv);
        }

        if (node.operator === '.>') return leftVal;
        if (node.operator === '.&') return { ...leftVal, ...rightVal };
        if (node.operator === '.?') return rightVal ? leftVal : null;
        return rightVal;
      }

      case 'TypedFormBlock': {
        const formType = node.path.value;
        const baseVal = env.lookup(formType);
        const obj: any =
          typeof baseVal === 'object' && baseVal !== null ? { ...baseVal, __type: formType } : { __type: formType };
        if (baseVal && typeof baseVal === 'object') {
          obj[formType] = baseVal;
        }
        const blockVal = this.eval(node.block, env);
        return { ...obj, ...blockVal };
      }

      case 'FormBlock': {
        const obj: any = {};
        for (const item of node.items) {
          if (item.left.type === 'CallExpr' && item.right) {
            const fnName = item.left.path.value;
            const paramNames = item.left.args.items.map((i: any) => i.left.value);
            const self = this;
            obj[fnName] = (...args: any[]) => {
              const callEnv = new Environment({}, env);
              paramNames.forEach((p: string, idx: number) => callEnv.define(p, args[idx]));
              return self.eval(item.right, callEnv);
            };
          } else {
            const k = item.left.type === 'String' ? item.left.value : item.left.value;
            obj[k] = item.right ? this.eval(item.right, env) : env.lookup(k);
          }
        }
        return obj;
      }

      case 'TypedFlowBlock': {
        if (node.path.type === 'Path') {
          const paramName = node.path.value;
          return (arg: any) => {
            const callEnv = new Environment({}, env, arg);
            callEnv.define(paramName, arg);
            return this.eval(node.block, callEnv);
          };
        }
        return this.eval(node.block, env);
      }

      case 'FlowItem': {
        const val = this.eval(node.right, env);
        if (node.left.type === 'Path') {
          env.define(node.left.value, val);
        }
        return val;
      }

      case 'FlowBlock': {
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

      if (matcherNode.type === 'Path' && matcherNode.value === '_') {
        matched = true;
      } else if (matcherNode.type === 'CallExpr') {
        const typeName = matcherNode.path.value;
        captureName = matcherNode.args.items[0]?.left?.value || null;
        if (target && (target.__type === typeName || target[typeName])) matched = true;
      } else if (matcherNode.type === 'Path') {
        const expected = matcherNode.value;
        const lookedUp = parentEnv.lookup(expected);
        if (typeof lookedUp === 'function') {
          matched = Boolean(lookedUp(target));
        } else if (target === expected || (target && (target.__type === expected || target[expected]))) {
          matched = true;
        }
      } else if (matcherNode.type === 'FlowBlock') {
        const condEnv = new Environment({}, parentEnv, target);
        matched = Boolean(this.eval(matcherNode, condEnv));
      } else {
        const expected = this.eval(matcherNode, parentEnv);
        if (target === expected) matched = true;
      }

      if (matched) {
        const matchEnv = new Environment({}, parentEnv, target);
        if (captureName) matchEnv.define(captureName, target);
        if (target && typeof target === 'object') {
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
