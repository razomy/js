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
export type SyntaxLayer = 'expression' | 'statement' | 'shape' | 'macro' | 'meta';

export interface NodeAst {
  kind: string;
  symbolId: SymbolId;
  syntaxLayer: SyntaxLayer;
}

export interface StateAst extends NodeAst {
}

export interface OperationAst extends NodeAst {
}

export interface LogicAst extends NodeAst {
}

export interface LogicOperatorAst extends NodeAst {
}

export interface DeclarationAst extends NodeAst {
}

export interface AccessAst extends NodeAst {
}

export interface PanicAst extends NodeAst {
}


export interface LiteralAst extends StateAst {
  kind: 'LiteralAst';
  symbol: SymbolId;
  value: any;
}

export interface ArrayAst extends StateAst {
  kind: 'ArrayAst';
  elements: NodeAst[];
}

export interface TupleAst extends StateAst {
  kind: 'TupleAst';
  elements: NodeAst[];
}

export interface ObjectAst extends StateAst {
  kind: 'ObjectAst';
  properties: Record<string, NodeAst>;
}

export type StateType =
  | LiteralAst
  | ArrayAst
  | TupleAst
  | ObjectAst;

export interface UnaryAst extends OperationAst {
  kind: 'UnaryAst';
  operator: string;
  operand: NodeAst;
}

export interface BinaryAst extends OperationAst {
  kind: 'BinaryAst';
  operator: string;
  left: NodeAst;
  right: NodeAst;
}

export type OperationType =
  | UnaryAst
  | BinaryAst;


export interface IfAst extends LogicAst {
  kind: 'IfAst';
  branches: Array<{ condition: NodeAst; body: NodeAst }>;
  elseBranch: NodeAst | null
}

export interface SwitchAst extends LogicAst {
  kind: 'SwitchAst';
  target: NodeAst;
  cases: Array<{ caseValue: NodeAst; body: NodeAst }>;
  defaultCases: NodeAst | null;
}

export interface LoopAst extends LogicAst {
}

export interface ForInAst extends LogicAst {
  kind: 'LoopAst';
  init: NodeAst | null;
  condition: NodeAst | null;
  update: NodeAst | null;
  body: NodeAst;
}

export interface WhileAst extends LogicAst {
  kind: 'LoopAst';
  type: 'while' | 'do_while';
  condition: NodeAst;
  body: NodeAst;
}

export interface ForOfAst extends LogicAst {
  kind: 'LoopAst';
  type: 'for_of' | 'for_it';
  init: NodeAst;
  body: NodeAst;
}


export interface BlockAst extends LogicAst {
  kind: 'BlockAst';
  /**
   * return - must use return value
   * style - readability
   * value - last statement is value
   */
  type: 'return' | 'style' | 'value';
  statements: NodeAst[];
}

export type LogicType =
  IfAst
  | SwitchAst
  | ForOfAst
  | WhileAst
  | ForInAst
  | BlockAst
  ;

export interface BreakAst extends LogicOperatorAst {
  kind: 'BreakAst';
  targetLoopSymbol: SymbolId | null;
}

export interface ContinueAst extends LogicOperatorAst {
  kind: 'ContinueAst';
  targetLoopSymbol: SymbolId | null;
}

export interface ReturnAst extends LogicOperatorAst {
  kind: 'ReturnAst';
  value: NodeAst | null;
}

export type LogicOperatorType =
  | BreakAst
  | ContinueAst
  | ReturnAst
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
export interface BindingAst extends DeclarationAst {
  kind: 'BindingAst';
  symbol: SymbolId;
  value: NodeAst | null;
}

export interface AssignAst extends DeclarationAst {
  kind: 'AssignAst';
  target: SymbolId;
  value: NodeAst;
}

/**
 * Функция на уровне HIR.
 * @example
 * ```ts
 * \`(x, y) => x + y\` (где x и y имеют свои SymbolId).
 * ```
 */
export interface FunctionAst extends DeclarationAst {
  kind: 'FunctionAst';
  params: SymbolId[];
  body: NodeAst;
}

export interface StructAst extends DeclarationAst {
  kind: 'StructAst';
  name: SymbolId;
  properties: NodeAst[];
}

export interface ClassAst extends DeclarationAst {
  kind: 'ClassAst';
  name: SymbolId;
  methods: NodeAst[];
  properties: NodeAst[];
}

export type DeclarationType =
  | BindingAst
  | AssignAst
  | FunctionAst
  | StructAst
  | ClassAst;


/**
 * Вызов функции на уровне HIR.
 * @example
 * ```ts
 * \`f(1, 2)\`
 * ```
 */
export interface CallAst extends AccessAst {
  kind: 'CallAst';
  callee: NodeAst;
  args: NodeAst[];
}

export interface MemberAccessAst extends AccessAst {
  kind: 'MemberAccessAst';
  object_: NodeAst;
  property: NodeAst;
}

/**
 * Использование переменной. IDE использует это для "Go to Definition".
 * @example
 * ```ts
 * \`console.log(x)\` -> \`x\` здесь это ReferenceAst.
 * ```
 */
export interface ReferenceAst extends AccessAst {
  kind: 'ReferenceAst';
  target: SymbolId;
}

export type AccessType =
  CallAst
  | MemberAccessAst
  | ReferenceAst;


export interface TryCatchAst extends PanicAst {
  kind: 'TryCatchAst';
  tryBlock: BlockAst;
  catches: Array<{ errorSymbol: SymbolId; catchBlock: BlockAst }>;
}

export interface ThrowAst extends PanicAst {
  kind: 'ThrowAst';
  value: NodeAst;
}

export type PanicType =
  | TryCatchAst
  | ThrowAst;

export type AstType =
  | StateType
  | OperationType
  | LogicType
  | LogicOperatorType
  | DeclarationType
  | AccessType
  | PanicType
  ;
