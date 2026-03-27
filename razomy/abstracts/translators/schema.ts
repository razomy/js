// 1 schema describe system
// 1 schema describe requirements
// 1 schema describe default values

/**
 * Base Schema record from which all entities inherit.
 * Ensures uniformity and standardized naming across all declarations.
 */
export interface BaseSchema {
  kind: string;
  name: string;
  description: string;
}

// ==========================================
// 1. SIMPLE & COMPLEX TYPES (TYPE SYSTEM)
// ==========================================

export interface StringSchema extends BaseSchema {
  kind: 'String';
}

export interface NumberSchema extends BaseSchema {
  kind: 'Number';
}

export interface BooleanSchema extends BaseSchema {
  kind: 'Boolean';
}

export interface NullSchema extends BaseSchema {
  kind: 'Null';
}

export interface ObjectSchema extends BaseSchema {
  kind: 'Object';
  properties: { key: string, type: SchemaType };
}

export interface ArraySchema extends BaseSchema {
  kind: 'Array';
  items: SchemaType;
}

export interface TupleSchema extends BaseSchema {
  kind: 'Tuple';
  items: SchemaType[];
}

export interface ReferenceSchema extends BaseSchema {
  kind: 'Reference';
  sourcePath:string;
}

/**
 * Union of all type schemas.
 */
export type SchemaType =
  | StringSchema
  | NumberSchema
  | BooleanSchema
  | NullSchema
  | ReferenceSchema
  | TupleSchema
  | ObjectSchema
  | ArraySchema;

// ==========================================
// 2. SHARED STRUCTURES
// ==========================================

export interface Argument {
  name: string;
  type: SchemaType;
  description: string;
}

export interface Return {
  type: SchemaType;
  description: string;
}

export interface PerformanceMetric {
  timeDataSizeComplexityFn: string;
  memoryDataSizeComplexityFn: string;
}

export interface CodeExample {
  code: string;
  expected: string;
}

export interface Property {
  name: string;
  type: SchemaType;
  description: string;
}

// ==========================================
// 3. DECLARATIONS (RECORDS & ACTIONS)
// ==========================================

/**
 * Variable or Constant Declaration.
 *
 * @example
 * ```ts
 * export const PI = 3.14;
 * ```
 */
export interface VariableSchema extends BaseSchema {
  kind: 'Variable';
  type: SchemaType;
}

/**
 * Function Declaration.
 *
 * @example
 * ```ts
 * export async function fetchData(id: string): Promise<Data> { ... }
 * ```
 */
export interface FunctionSchema extends BaseSchema {
  kind: 'Function';
  args: Argument[];
  returnType: Return;
  isAsync: boolean;
  isGenerator: boolean;
  title: string;
  performance: PerformanceMetric;
  examples: CodeExample[];
}

/**
 * Record Declaration (Data Structure).
 * Replaces traditional interfaces to focus purely on state/data.
 *
 * @example
 * ```ts
 * export type User = {
 *   id: string;
 *   name: string;
 * }
 * ```
 */
export interface RecordSchema extends BaseSchema {
  kind: 'Record';
  properties: Property[];
  inherits: ReferenceSchema[];
}

/**
 * Action Declaration (Behavior).
 * Defines a pure set of behaviors or methods.
 *
 * @example
 * ```ts
 * export type UserActions = {
 *   save(): void;
 *   delete(): void;
 * }
 * ```
 */
export interface ActionSchema extends BaseSchema {
  kind: 'Action';
  methods: MethodSchema[];
  inherits: ReferenceSchema[];
}

/**
 * Type Alias Declaration.
 *
 * @example
 * ```ts
 * export type ID = string | number;
 * ```
 */
export interface InterfaceSchema extends BaseSchema {
  kind: 'Interface';
  properties: Property[];
  methods: MethodSchema[];
  inherits: ReferenceSchema[];
}

/**
 * Enum Member Representation.
 */
export interface EnumMemberSchema {
  name: string;
  value: string | number;
  description: string;
}

/**
 * Enum Declaration.
 *
 * @example
 * ```ts
 * export enum Status {
 *   Active = 'ACTIVE',
 *   Inactive = 'INACTIVE'
 * }
 * ```
 */
export interface EnumSchema extends BaseSchema {
  kind: 'Enum';
  members: EnumMemberSchema[];
}

// ==========================================
// 4. CLASS LAYERED ARCHITECTURE
// ==========================================

/**
 * Method Declaration (Behavior).
 */
export interface MethodSchema {
  name: string;
  args: Argument[];
  returnType: Return;
  isStatic: boolean;
  isAsync: boolean;
  isGenerator: boolean;
  title: string;
  description: string;
  performance: PerformanceMetric;
  examples: CodeExample[];
}

/**
 * Class Declaration.
 * Separates inherited behavior (Actions) and state (Records) for clear distinction.
 *
 * @example
 * ```ts
 * export class UserService {
 *   // Implements UserRecord (State) and UserActions (Behavior)
 *   private users: User[] = [];
 *   public async getUser(id: string): Promise<User> { ... }
 * }
 * ```
 */
export interface ClassSchema extends BaseSchema {
  kind: 'class';
  fields: Property[];
  methods: MethodSchema[];
  inherits: ReferenceSchema[];
}

// ==========================================
// 5. MODULES & PACKAGES
// ==========================================

/**
 * Module / Namespace Declaration.
 *
 * @example
 * ```ts
 * export namespace MathUtils {
 *   export const PI = 3.14;
 * }
 * ```
 */
export interface ModuleSchema extends BaseSchema {
  kind: 'Module';
  declarations: StatementSchemaType[];
}

/**
 * Union of all top-level declarations in a file/module.
 */
export type StatementSchemaType =
  | VariableSchema
  | FunctionSchema
  | RecordSchema
  | ActionSchema
  | EnumSchema
  | ClassSchema
  | ModuleSchema;

/**
 * Package Dependency Expression.
 */
export interface DependencyExpression {
  name: string;
  version: string;
}

/**
 * Root Package Schema.
 * Represents the structure of an entire package or library.
 */
export interface PackageSchema {
  kind: 'package';
  name: string;
  version: string;
  engine: DependencyExpression;
  dependencies: DependencyExpression[];
  declarations: StatementSchemaType[];
}
