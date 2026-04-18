export type SymbolId = number;

export interface NodeHir {
  kind: string;
  symbolId?: SymbolId;
}

/**
 * Определение, связывающее SymbolId со значением.
 * В HIR разница между 'type' и 'const' стирается.
 * @example
 * ```ts
 * \`const x = 1;\` или \`type X = number;\` (связывает уникальный ID с выражением).
 * ```
 */
export interface BindingHir extends NodeHir {
  kind: 'BindingHir';
  symbol: SymbolId;
  isShapeLevel: boolean;
  value: NodeHir | null;
}

/**
 * Использование переменной. IDE использует это для "Go to Definition".
 * @example
 * ```ts
 * \`console.log(x)\` -> \`x\` здесь это ReferenceHir.
 * ```
 */
export interface ReferenceHir extends NodeHir {
  kind: 'ReferenceHir';
  target: SymbolId;
}

export interface LiteralHir extends NodeHir {
  kind: 'LiteralHir';
  type: string;
  value: any;
}

export interface ArrayHir extends NodeHir {
  kind: 'ArrayHir';
  elements: NodeHir[];
}

export interface ObjectHir extends NodeHir {
  kind: 'ObjectHir';
  properties: Record<string, NodeHir>;
}

export interface UnaryHir extends NodeHir {
  kind: 'UnaryHir';
  operator: string;
  operand: NodeHir;
}

export interface BinaryHir extends NodeHir {
  kind: 'BinaryHir';
  operator: string;
  left: NodeHir;
  right: NodeHir;
}

export interface IfHir extends NodeHir {
  kind: 'IfHir';
  branches: Array<{ condition: NodeHir | null; body: NodeHir }>;
}

export interface SwitchHir extends NodeHir {
  kind: 'SwitchHir';
  target: NodeHir;
  cases: Array<{ caseValue: NodeHir | null; body: NodeHir }>;
}

export interface LoopHir extends NodeHir {
  kind: 'LoopHir';
  loopShape: 'while' | 'do_while' | 'for_in' | 'for_of' | 'for_it';
  init?: NodeHir;
  condition?: NodeHir;
  update?: NodeHir;
  body: NodeHir;
}

/**
 * Функция на уровне HIR.
 * @example
 * ```ts
 * \`(x, y) => x + y\` (где x и y имеют свои SymbolId).
 * ```
 */
export interface FunctionHir extends NodeHir {
  kind: 'FunctionHir';
  params: SymbolId[];
  body: NodeHir;
}

export interface ClassHir extends NodeHir {
  kind: 'ClassHir';
  name: SymbolId;
  methods: BindingHir[];
  properties: BindingHir[];
}

/**
 * Вызов функции на уровне HIR.
 * @example
 * ```ts
 * \`f(1, 2)\`
 * ```
 */
export interface CallHir extends NodeHir {
  kind: 'CallHir';
  callee: NodeHir;
  args: NodeHir[];
}

export interface MemberAccessHir extends NodeHir {
  kind: 'MemberAccessHir';
  object_: NodeHir;
  property: NodeHir;
}

export interface BlockHir extends NodeHir {
  kind: 'BlockHir';
  statements: NodeHir[];
}

export interface ReturnHir extends NodeHir {
  kind: 'ReturnHir';
  value: NodeHir | null;
}

export interface BreakHir extends NodeHir {
  kind: 'BreakHir';
  targetLoopSymbol?: SymbolId;
}

export interface ContinueHir extends NodeHir {
  kind: 'ContinueHir';
  targetLoopSymbol?: SymbolId;
}

export interface TryCatchHir extends NodeHir {
  kind: 'TryCatchHir';
  tryBlock: BlockHir;
  catches: Array<{ errorSymbol: SymbolId; catchBlock: BlockHir }>;
}

export interface ThrowHir extends NodeHir {
  kind: 'ThrowHir';
  value: NodeHir;
}

export interface AssignHir extends NodeHir {
  kind: 'AssignHir';
  target: SymbolId;
  value: NodeHir;
}

export interface ShapeDefinitionHir extends NodeHir {
  kind: 'ShapeDefinitionHir';
  baseShape: string;
  typeArguments?: NodeHir[];
}

// ==========================================
// CORE TYPES (HIR: Физическое представление данных)
// Никакого сахара (Omit, Pick, extends). Только память и лэйауты.
// ==========================================

export interface ShapeNodeHir extends NodeHir {
  isShapeLevel: true; // Маркер, что это тип, а не значение
}

/**
 * 1. Примитивы (Базовые скаляры, хранятся по значению)
 * В HIR мы уходим от абстрактного "Number" к физике, если это нужно (int, float),
 * или оставляем базовые типы целевой платформы.
 */
export interface ShapePrimitiveHir extends ShapeNodeHir {
  kind: 'ShapePrimitiveHir';
  primitive: 'int' | 'float' | 'string' | 'boolean' | 'null' | 'undefined' | 'void' | 'any';
}

/**
 * 2. Структура / Запись (Record/Struct)
 * Во что превращаются Object, Interface, Class, Omit, Pick, Intersection.
 * Это просто плоский список полей (ключ -> тип).
 * Если класс наследовался от другого, здесь будут просто скопированы все поля родителя.
 */
export interface ShapeStructHir extends ShapeNodeHir {
  kind: 'ShapeStructHir';
  // Ключом выступает SymbolId (разрешенное имя свойства), значением - вычисленный тип
  fields: Record<SymbolId, ShapeNodeHir>;
}

/**
 * 3. Массив (Динамическая последовательность одного типа)
 * Во что превращаются string[], Array<number>
 */
export interface ShapeArrayHir extends ShapeNodeHir {
  kind: 'ShapeArrayHir';
  elementShape: ShapeNodeHir;
}

/**
 * 4. Кортеж (Tuple) (Статическая последовательность разных типов)
 * Во что превращается [string, number]
 */
export interface ShapeTupleHir extends ShapeNodeHir {
  kind: 'ShapeTupleHir';
  elements: ShapeNodeHir[];
}

/**
 * 5. Сигнатура функции (Function/Method signature)
 * Во что превращаются (a: string) => number, а также методы классов в типах.
 */
export interface ShapeFunctionHir extends ShapeNodeHir {
  kind: 'ShapeFunctionHir';
  parameters: ShapeNodeHir[]; // Имена параметров в типах не важны, важен только порядок и типы
  returnShape: ShapeNodeHir;
}

/**
 * 6. Объединение (Union / Tagged Enum)
 * Во что превращаются string | number, а также Enums.
 * На уровне памяти это обычно Tagged Union (дискриминатор + размер максимального элемента).
 */
export interface ShapeUnionHir extends ShapeNodeHir {
  kind: 'ShapeUnionHir';
  variants: ShapeNodeHir[];
}

/**
 * 7. Указатель / Ссылка на другой тип (Pointer/Reference)
 * Обязателен для рекурсивных типов (например, узел дерева: TreeNode { next: TreeNode })
 * и для того, чтобы не дублировать огромные структуры в памяти компилятора.
 */
export interface ShapeReferenceHir extends ShapeNodeHir {
  kind: 'ShapeReferenceHir';
  targetSymbol: SymbolId; // Ссылка на BindingHir, где лежит реальный ShapeStructHir
}

export type CoreShapeHir =
  | ShapePrimitiveHir
  | ShapeStructHir
  | ShapeArrayHir
  | ShapeTupleHir
  | ShapeFunctionHir
  | ShapeUnionHir
  | ShapeReferenceHir;
