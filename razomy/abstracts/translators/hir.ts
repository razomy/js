import type {SyntaxLayer} from "./ast";

/**
 *
 * time:
 * 1 - State
 * 2 - Operation
 * 3 - Logic
 * 4 - Declaration
 * 5 - Access
 * 6 - Panic
 *
 */
export type SymbolId = number;

export interface NodeHir {
  kind: string;
  symbolId: SymbolId;
  syntaxLayer: SyntaxLayer;
}

export interface PanicHir extends NodeHir {
}

export interface ExpressionHir extends NodeHir {
}

export interface OperationHir extends NodeHir {
}

export interface LogicHir extends NodeHir {
}

export interface LogicOperatorHir extends NodeHir {
}

export interface DeclarationHir extends NodeHir {
}

export interface AccessHir extends NodeHir {
}


export interface TryCatchHir extends PanicHir {
  kind: 'TryCatchHir';
  tryBlock: BlockHir;
  catches: Array<{ errorSymbol: SymbolId; catchBlock: BlockHir }>;
}

export interface ThrowHir extends PanicHir {
  kind: 'ThrowHir';
  value: NodeHir;
}

export type PanicHirType =
  | TryCatchHir
  | ThrowHir;

export interface LiteralHir extends ExpressionHir {
  kind: 'LiteralHir';
  symbol: SymbolId;
  value: any;
}

export interface ArrayHir extends ExpressionHir {
  kind: 'ArrayHir';
  elements: NodeHir[];
}

export interface ObjectHir extends ExpressionHir {
  kind: 'ObjectHir';
  properties: Record<string, NodeHir>;
}

export type ExpressionHirType =
  | LiteralHir
  | ArrayHir
  | ObjectHir;

export interface UnaryHir extends OperationHir {
  kind: 'UnaryHir';
  operator: string;
  operand: NodeHir;
}

export interface BinaryHir extends OperationHir {
  kind: 'BinaryHir';
  operator: string;
  left: NodeHir;
  right: NodeHir;
}

export type OperationHirType =
  | UnaryHir
  | BinaryHir;


export interface MatchHir extends LogicHir {
  kind: 'SwitchHir';
  target: NodeHir | null;
  cases: Array<{ caseValue: NodeHir; body: NodeHir }>;
  defaultCases: NodeHir | null;
}

export interface LoopHir extends LogicHir {
  kind: 'LoopHir';
  init: NodeHir | null;
  condition: NodeHir | null;
  update: NodeHir | null;
  body: NodeHir;
}

export interface BlockHir extends LogicHir {
  kind: 'BlockHir';
  /**
   * return - must use return value
   * style - readability
   * value - last statement is value
   */
  type: 'return' | 'style' | 'value';
  statements: NodeHir[];
}

export type LogicHirType =
  MatchHir
  | LogicHir
  | BlockHir
  ;

export interface BreakHir extends LogicOperatorHir {
  kind: 'BreakHir';
  targetLoopSymbol: SymbolId | null;
}

export interface ContinueHir extends LogicOperatorHir {
  kind: 'ContinueHir';
  targetLoopSymbol: SymbolId | null;
}

export interface ReturnHir extends LogicOperatorHir {
  kind: 'ReturnHir';
  value: NodeHir | null;
}

export type LogicOperatorHirType =
  | BreakHir
  | ContinueHir
  | ReturnHir
  ;

/**
 * Binding = Goal = Imperative programming
 * Определение, связывающее SymbolId со значением.
 * В HIR разница между 'type' и 'const' стирается.
 * @example
 * ```ts
 * \`const x = 1;\` или \`type X = number;\` (связывает уникальный ID с выражением).
 * ```
 */
export interface BindingHir extends DeclarationHir {
  kind: 'BindingHir';
  symbol: SymbolId;
  value: NodeHir | null;
}

export interface AssignHir extends DeclarationHir {
  kind: 'AssignHir';
  target: SymbolId;
  value: NodeHir;
}

/**
 * Функция на уровне HIR.
 * @example
 * ```ts
 * \`(x, y) => x + y\` (где x и y имеют свои SymbolId).
 * ```
 */
export interface FunctionHir extends DeclarationHir {
  kind: 'FunctionHir';
  params: SymbolId[];
  body: NodeHir;
}

export interface StructHir extends DeclarationHir {
  kind: 'StructHir';
  name: SymbolId;
  properties: NodeHir[];
}

export interface ClassHir extends DeclarationHir {
  kind: 'ClassHir';
  name: SymbolId;
  methods: NodeHir[];
  properties: NodeHir[];
}

export type DeclarationHirType =
  | BindingHir
  | AssignHir
  | FunctionHir
  | StructHir
  | ClassHir;


/**
 * Вызов функции на уровне HIR.
 * @example
 * ```ts
 * \`f(1, 2)\`
 * ```
 */
export interface CallHir extends AccessHir {
  kind: 'CallHir';
  callee: NodeHir;
  args: NodeHir[];
}

export interface MemberAccessHir extends AccessHir {
  kind: 'MemberAccessHir';
  object_: NodeHir;
  property: NodeHir;
}

/**
 * Использование переменной. IDE использует это для "Go to Definition".
 * @example
 * ```ts
 * \`console.log(x)\` -> \`x\` здесь это ReferenceHir.
 * ```
 */
export interface ReferenceHir extends AccessHir {
  kind: 'ReferenceHir';
  target: SymbolId;
}

export type AccessHirType =
  CallHir
  | MemberAccessHir
  | ReferenceHir;


export type HirType =
  | PanicHirType
  | ExpressionHirType
  | OperationHirType
  | LogicHirType
  | LogicOperatorHirType
  | DeclarationHirType
  | AccessHirType
  ;
