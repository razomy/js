// ==========================================
// СЛОЙ 1.2: Surface AST - Фасад (Особенности языка)
// Оборачивает CST. Дает бессмысленным узлам языковой смысл.
// Игнорирует пробелы. Все имена — это просто строки.
// Описывает то, КАК написан код (Синтаксис).
// ==========================================

/**
 * Base interface for all Surface AST nodes.
 */
export interface SurfaceNode {
  kind: string;
}

// --- TYPES (Type Annotations) ---

export interface SurfaceKeywordType extends SurfaceNode {
  kind: 'SurfaceKeywordType';
  name: 'string' | 'number' | 'boolean' | 'null' | 'undefined' | 'symbol' | 'any' | 'never' | 'unknown' | 'bigint' | 'void' | 'object';
}

export interface SurfaceReferenceType extends SurfaceNode {
  kind: 'SurfaceReferenceType';
  name: string;
  typeParams?: SurfaceTypeNode[];
}

export interface SurfaceArrayType extends SurfaceNode {
  kind: 'SurfaceArrayType';
  elementType: SurfaceTypeNode;
}

export interface SurfaceTupleType extends SurfaceNode {
  kind: 'SurfaceTupleType';
  elements: SurfaceTypeNode[];
}

export interface SurfaceUnionType extends SurfaceNode {
  kind: 'SurfaceUnionType';
  types: SurfaceTypeNode[];
}

export interface SurfaceIntersectionType extends SurfaceNode {
  kind: 'SurfaceIntersectionType';
  types: SurfaceTypeNode[];
}

export interface SurfaceFunctionType extends SurfaceNode {
  kind: 'SurfaceFunctionType';
  params: Array<{ name: string; typeAnnotation: SurfaceTypeNode; isOptional?: boolean }>;
  returnType: SurfaceTypeNode;
}

export interface SurfaceObjectType extends SurfaceNode {
  kind: 'SurfaceObjectType';
  properties: Array<{ name: string; typeAnnotation: SurfaceTypeNode; isOptional?: boolean }>;
}

export type SurfaceTypeNode =
  | SurfaceKeywordType
  | SurfaceReferenceType
  | SurfaceArrayType
  | SurfaceTupleType
  | SurfaceUnionType
  | SurfaceIntersectionType
  | SurfaceFunctionType
  | SurfaceObjectType;


// --- EXPRESSIONS ---

/**
 * Represents an identifier (variable name, function name, etc.).
 */
export interface SurfaceIdentifier extends SurfaceNode {
  kind: 'SurfaceIdentifier';
  name: string;
}

/**
 * Represents a literal value.
 */
export interface SurfaceLiteral extends SurfaceNode {
  kind: 'SurfaceLiteral';
  value: string | number | boolean | null | undefined | bigint;
  regex?: { pattern: string; flags: string }; // For RegExp literals
}

export interface SurfaceArrayExpression extends SurfaceNode {
  kind: 'SurfaceArrayExpression';
  elements: SurfaceExpression[];
}

export interface SurfaceTupleExpression extends SurfaceNode {
  kind: 'SurfaceTupleExpression';
  elements: SurfaceExpression[];
}

export interface SurfaceTemplateExpression extends SurfaceNode {
  kind: 'SurfaceTemplateExpression';
  parts: Array<string | SurfaceExpression>;
}

export interface SurfaceSelectExpression extends SurfaceNode {
  kind: 'SurfaceSelectExpression';
  elements: SurfaceExpression[];
  selectedIndex: number;
}

export interface SurfaceMultiSelectExpression extends SurfaceNode {
  kind: 'SurfaceMultiSelectExpression';
  elements: SurfaceExpression[];
  selectedIndexes: number[];
}

/**
 * Represents an object literal, a class, an interface, or a module block.
 */
export interface SurfaceRecordExpression extends SurfaceNode {
  kind: 'SurfaceRecordExpression';
  fields: Array<{ key: string | SurfaceExpression; value: SurfaceExpression }>;
}

/**
 * Represents a member access expression.
 */
export interface SurfaceMemberAccess extends SurfaceNode {
  kind: 'SurfaceMemberAccess';
  target: SurfaceExpression; 
  field: string;       
}

/**
 * Represents a function declaration or expression.
 */
export interface SurfaceFunctionExpression extends SurfaceNode {
  kind: 'SurfaceFunctionExpression';
  params: SurfaceDeclaration[];
  returnType?: SurfaceTypeNode;
  body: SurfaceBlockExpression;
  isAsync?: boolean;
}

/**
 * Represents a function call.
 */
export interface SurfaceCallExpression extends SurfaceNode {
  kind: 'SurfaceCallExpression';
  callee: SurfaceExpression;
  args: SurfaceExpression[];
}

/**
 * Represents a pattern matching expression. Replaces standard if/else.
 */
export interface SurfaceMatchExpression extends SurfaceNode {
  kind: 'SurfaceMatchExpression';
  target: SurfaceExpression;
  cases: Array<{ pattern: SurfaceExpression; body: SurfaceBlockExpression }>;
}

export interface SurfaceBinaryExpression extends SurfaceNode {
  kind: 'SurfaceBinaryExpression';
  operator: string;
  left: SurfaceExpression;
  right: SurfaceExpression;
}

export interface SurfaceUnaryExpression extends SurfaceNode {
  kind: 'SurfaceUnaryExpression';
  operator: string;
  argument: SurfaceExpression;
  isPrefix: boolean;
}

/**
 * Represents a block of scoped statements.
 */
export interface SurfaceBlockExpression extends SurfaceNode {
  kind: 'SurfaceBlockExpression';
  statements: SurfaceStatement[];
}

export type SurfaceExpression =
  | SurfaceIdentifier
  | SurfaceLiteral
  | SurfaceArrayExpression
  | SurfaceTupleExpression
  | SurfaceTemplateExpression
  | SurfaceSelectExpression
  | SurfaceMultiSelectExpression
  | SurfaceRecordExpression
  | SurfaceMemberAccess
  | SurfaceFunctionExpression
  | SurfaceCallExpression
  | SurfaceMatchExpression
  | SurfaceBinaryExpression
  | SurfaceUnaryExpression
  | SurfaceBlockExpression;


// --- DECLARATIONS & STATEMENTS ---

/**
 * Represents a variable, constant, or property declaration.
 */
export interface SurfaceDeclaration extends SurfaceNode {
  kind: 'SurfaceDeclaration';
  name: string;
  isConst?: boolean;
  typeAnnotation?: SurfaceTypeNode;
  initValue?: SurfaceExpression;
}

/**
 * Represents a type alias or interface definition.
 */
export interface SurfaceTypeAlias extends SurfaceNode {
  kind: 'SurfaceTypeAlias';
  name: string;          
  typeParams?: string[]; 
  value: SurfaceTypeNode;
}

export interface SurfaceInterfaceDeclaration extends SurfaceNode {
  kind: 'SurfaceInterfaceDeclaration';
  name: string;
  extends?: string[];
  properties: Array<{ name: string; typeAnnotation: SurfaceTypeNode; isOptional?: boolean; isReadonly?: boolean }>;
}

export interface SurfaceEnumDeclaration extends SurfaceNode {
  kind: 'SurfaceEnumDeclaration';
  name: string;
  members: Array<{ name: string; value?: SurfaceExpression }>;
}

export interface SurfaceModuleDeclaration extends SurfaceNode {
  kind: 'SurfaceModuleDeclaration';
  name: string;
  body: SurfaceBlockExpression;
}

export interface SurfacePackageDeclaration extends SurfaceNode {
  kind: 'SurfacePackageDeclaration';
  name: string;
  version: string;
  dependencies: Array<{ name: string; version: string }>;
}

export interface SurfaceReturnStatement extends SurfaceNode {
  kind: 'SurfaceReturnStatement';
  expression?: SurfaceExpression;
}

export type SurfaceStatement =
  | SurfaceDeclaration
  | SurfaceTypeAlias
  | SurfaceInterfaceDeclaration
  | SurfaceEnumDeclaration
  | SurfaceModuleDeclaration
  | SurfacePackageDeclaration
  | SurfaceExpression
  | SurfaceReturnStatement;
