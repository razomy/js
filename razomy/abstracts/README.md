# @razomy/abstracts

[![TypeScript](https://img.shields.io/npm/types/@razomy/abstracts)](https://www.npmjs.com/package/@razomy/abstracts)
[![Node.js Version](https://img.shields.io/node/v/@razomy/abstracts)](https://www.npmjs.com/package/@razomy/abstracts)
![Deno](https://img.shields.io/badge/Deno-Supported-blue)
![Bun](https://img.shields.io/badge/Bun-Supported-black)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Supported-orange)
[![License](https://img.shields.io/npm/l/@razomy/abstracts)](https://github.com/razomy/js/blob/main/LICENSE)

[![CI Status](https://github.com/razomy/js/actions/workflows/release.yml/badge.svg)](https://github.com/razomy/js/actions)
[![npm version](https://img.shields.io/npm/v/@razomy/abstracts)](https://www.npmjs.com/package/@razomy/abstracts)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/@razomy/abstracts)](https://bundlephobia.com/package/@razomy/abstracts)
[![GitHub stars](https://img.shields.io/github/stars/razomy/js?style=social)](https://github.com/razomy/js/stargazers)
[![npm downloads](https://img.shields.io/npm/dw/@razomy/abstracts)](https://www.npmjs.com/package/@razomy/abstracts)

[Npm](https://www.npmjs.com/package/@razomy/abstracts) |
[Npmx](https://npmx.dev/package/@razomy/abstracts) |
[GitHub](https://github.com/razomy/js/tree/main/razomy/abstracts) |
[Razomy Io](https://io.razomy.org/abstracts) |
[Razomy Cli](https://github.com/razomy/cli)

>
# Abstracts

Contains all core reusable types and interfaces.

**System Layer** (Performance, Execution, Data Layout)

1. ~~**hardware** hardware structures, including CPU, GPU, TPU,~~
2. **primitives** — Abstractions defining low-level and memory/processing units.
3. ~~**memory** — аллокаторы, указатели, буферы.~~
4. ~~**concurrency** — потоки, мьютексы, event loops, promises.~~
5. ~~**io_streams** — сокеты, файловые дескрипторы, стримы.~~
6. **functions** — Abstractions defining behavioral contracts, such as creation and execution pipelines.
7. **arrays** — Linear memory data structures.
8. **structures** — Core building blocks for memory organization and data coordination, serving as a foundation for
   complex templates.
9. **collections** — Abstractions for mapping data and ordering it in a performance-optimized way (e.g., maps, sets,
   queues).
10. **graphs** — Graph and tree-like data structures.
11. **probabilistics** — Matrices and probabilistic data structures.
12. **meta** — Utilities designed to generalize and unify the TypeScript development experience alongside other
    languages.

**Application Layer** (Logic, Behavior, Domain)

1. **domains** — Interfaces, data templates, domain responsibilities.
1. **ast** — Programming language declarations.
2. **pattens** — Data transforming organizing templates.
3. **machines** — стейт-машины, акторы (Actors), оркестраторы..
4. ~~**events** — шины событий, Pub/Sub, реактивные потоки.~~
5. ~~**contracts** — монады (`Result`, `Option`), валидаторы, обработчики ошибок.~~
6. ~~**ports** — абстракции внешнего мира (интерфейсы к БД, сети, UI, Ports/Adapters).~~


## 🚀 Start

### Install

```sh
npm i @razomy/abstracts
# or
bun add @razomy/abstracts
# or
razomy cli add @razomy/abstracts
```

### Import

```ts
import * as abstracts from '@razomy/abstracts';
// or
import * as abstracts from "npm:@razomy/abstracts";
// or
import * as abstracts from "https://esm.sh/@razomy/abstracts";
// or
import * as abstracts from "https://unpkg.com/@razomy/abstracts";
// or
import { arrays } from '@razomy/abstracts';
// or
razomy run @razomy/abstracts arrays DynamicArray
```

## 📑 Table of Contents

**Types**

- [arrays.DynamicArray](#dynamicarray)
- [arrays.F64Array](#f64array)
- [arrays.Index](#index)
- [arrays.Offset](#offset)
- [arrays.RawBuffer](#rawbuffer)
- [arrays.SequenceArray](#sequencearray)
- [arrays.StaticArray](#staticarray)
- [arrays.Tuple](#tuple)
- [arrays.TypedMemoryView](#typedmemoryview)
- [arrays.U8Array](#u8array)
- [arrays.WithOffset](#withoffset)
- [arrays.WithPrevOffset](#withprevoffset)
- [ast.ArrayExpression](#arrayexpression)
- [ast.ArrayType](#arraytype)
- [ast.AstLeafType](#astleaftype)
- [ast.AstNode](#astnode)
- [ast.AstType](#asttype)
- [ast.BigIntExpression](#bigintexpression)
- [ast.BigIntType](#biginttype)
- [ast.BooleanExpression](#booleanexpression)
- [ast.BooleanType](#booleantype)
- [ast.Declaration](#declaration)
- [ast.DeclarationType](#declarationtype)
- [ast.DependencyExpression](#dependencyexpression)
- [ast.EnumDeclaration](#enumdeclaration)
- [ast.EnumPropertyDeclaration](#enumpropertydeclaration)
- [ast.Expression](#expression)
- [ast.ExpressionType](#expressiontype)
- [ast.FunctionDeclaration](#functiondeclaration)
- [ast.FunctionType](#functiontype)
- [ast.GenericReferenceType](#genericreferencetype)
- [ast.Identifier](#identifier)
- [ast.IdentifierExpression](#identifierexpression)
- [ast.InterfaceDeclaration](#interfacedeclaration)
- [ast.IntersectionType](#intersectiontype)
- [ast.KeywordType](#keywordtype)
- [ast.MappedType](#mappedtype)
- [ast.ModuleDeclaration](#moduledeclaration)
- [ast.MultiSelectExpression](#multiselectexpression)
- [ast.NullExpression](#nullexpression)
- [ast.NullType](#nulltype)
- [ast.NumberExpression](#numberexpression)
- [ast.NumberType](#numbertype)
- [ast.ObjectType](#objecttype)
- [ast.PackageDeclaration](#packagedeclaration)
- [ast.ParameterDeclaration](#parameterdeclaration)
- [ast.PropertyDeclaration](#propertydeclaration)
- [ast.PropertyType](#propertytype)
- [ast.ReferenceType](#referencetype)
- [ast.RegExpExpression](#regexpexpression)
- [ast.RegExpType](#regexptype)
- [ast.ReturnDeclaration](#returndeclaration)
- [ast.SelectExpression](#selectexpression)
- [ast.StringExpression](#stringexpression)
- [ast.StringType](#stringtype)
- [ast.TemplateExpression](#templateexpression)
- [ast.TemplateType](#templatetype)
- [ast.TupleExpression](#tupleexpression)
- [ast.TupleType](#tupletype)
- [ast.Type](#type)
- [ast.TypeAliasDeclaration](#typealiasdeclaration)
- [ast.TypeIdentifier](#typeidentifier)
- [ast.TypeType](#typetype)
- [ast.UndefinedExpression](#undefinedexpression)
- [ast.UndefinedType](#undefinedtype)
- [ast.UnionType](#uniontype)
- [ast.VariableDeclaration](#variabledeclaration)
- [collections.AbstractDataType](#abstractdatatype)
- [collections.Deque](#deque)
- [collections.DictionaryMap](#dictionarymap)
- [collections.DictionaryObject](#dictionaryobject)
- [collections.LRUCache](#lrucache)
- [collections.LRUCacheInternalMemory](#lrucacheinternalmemory)
- [collections.PriorityQueue](#priorityqueue)
- [collections.Queue](#queue)
- [collections.Set](#set)
- [collections.Stack](#stack)
- [domains.Value](#value)
- [domains.WithDescription](#withdescription)
- [domains.WithId](#withid)
- [domains.WithKind](#withkind)
- [domains.WithName](#withname)
- [domains.WithType](#withtype)
- [domains.WithValue](#withvalue)
- [functions.Action](#action)
- [functions.AsyncCallback](#asynccallback)
- [functions.Callable](#callable)
- [functions.Callback](#callback)
- [functions.Constructable](#constructable)
- [functions.Dispose](#dispose)
- [functions.Future](#future)
- [functions.IObjectClone](#iobjectclone)
- [functions.Stream](#stream)
- [graphs.AbsolutePathString](#absolutepathstring)
- [graphs.BalancedTree](#balancedtree)
- [graphs.BinaryTree](#binarytree)
- [graphs.BinaryTreeNode](#binarytreenode)
- [graphs.BTree](#btree)
- [graphs.DirPathString](#dirpathstring)
- [graphs.EdgeListGraph](#edgelistgraph)
- [graphs.FilePathString](#filepathstring)
- [graphs.Graph](#graph)
- [graphs.GraphAdjacencyList](#graphadjacencylist)
- [graphs.GraphAdjacencyMatrix](#graphadjacencymatrix)
- [graphs.Heap](#heap)
- [graphs.Leaf](#leaf)
- [graphs.Octree](#octree)
- [graphs.OctreeNode](#octreenode)
- [graphs.PathString](#pathstring)
- [graphs.QuadTree](#quadtree)
- [graphs.QuadTreeNode](#quadtreenode)
- [graphs.RelativePathString](#relativepathstring)
- [graphs.SegmentTree](#segmenttree)
- [graphs.Slug](#slug)
- [graphs.SourcePathString](#sourcepathstring)
- [graphs.Tree](#tree)
- [graphs.TreeNode](#treenode)
- [graphs.Trie](#trie)
- [graphs.WithDirPath](#withdirpath)
- [graphs.WithFileName](#withfilename)
- [graphs.WithFilePath](#withfilepath)
- [graphs.WithPathString](#withpathstring)
- [graphs.WithSourcePath](#withsourcepath)
- [meta.Alias](#alias)
- [meta.Brand](#brand)
- [meta.DataStructure](#datastructure)
- [meta.LateInit](#lateinit)
- [meta.LogicalTopology](#logicaltopology)
- [meta.MemoryLayout](#memorylayout)
- [patterns.Codec](#codec)
- [patterns.Decode](#decode)
- [patterns.Encode](#encode)
- [patterns.Execute](#execute)
- [patterns.Gate](#gate)
- [patterns.WithCreate](#withcreate)
- [patterns.WithDecode](#withdecode)
- [patterns.WithEncode](#withencode)
- [patterns.WithExecute](#withexecute)
- [primitives.AllPrimitives](#allprimitives)
- [primitives.Bool](#bool)
- [primitives.Char](#char)
- [primitives.EnumInt](#enumint)
- [primitives.EnumString](#enumstring)
- [primitives.F32](#f32)
- [primitives.F64](#f64)
- [primitives.FixedString](#fixedstring)
- [primitives.Float](#float)
- [primitives.FloatPrimitive](#floatprimitive)
- [primitives.I128](#i128)
- [primitives.I16](#i16)
- [primitives.I32](#i32)
- [primitives.I64](#i64)
- [primitives.I8](#i8)
- [primitives.InlineString](#inlinestring)
- [primitives.Int](#int)
- [primitives.IntPrimitive](#intprimitive)
- [primitives.MultilineString](#multilinestring)
- [primitives.Null](#null)
- [primitives.Number](#number)
- [primitives.NumberPrimitive](#numberprimitive)
- [primitives.StringPrimitive](#stringprimitive)
- [primitives.SymbolType](#symboltype)
- [primitives.U128](#u128)
- [primitives.U16](#u16)
- [primitives.U32](#u32)
- [primitives.U64](#u64)
- [primitives.U8](#u8)
- [primitives.UIntPrimitive](#uintprimitive)
- [primitives.Undefined](#undefined)
- [probabilistics.BloomFilter](#bloomfilter)
- [probabilistics.HyperLogLog](#hyperloglog)
- [probabilistics.ProbabilisticDataStructure](#probabilisticdatastructure)
- [structures.DisjointSet](#disjointset)
- [structures.DoublyLinkedList](#doublylinkedlist)
- [structures.DoublyLinkedListNode](#doublylinkedlistnode)
- [structures.HashTable](#hashtable)
- [structures.LinkedList](#linkedlist)
- [structures.LinkedListNode](#linkedlistnode)
- [structures.Node](#node)
- [structures.RingBuffer](#ringbuffer)
- [structures.SkipList](#skiplist)
- [structures.SkipListNode](#skiplistnode)

## 📚 Documentation

### Types

#### DynamicArray

`interface DynamicArray `

#### F64Array

`type F64Array = Float64Array`

#### Index

`type Index = number`

#### Offset

`type Offset = number`

#### RawBuffer

`type RawBuffer = ArrayBuffer | SharedArrayBuffer`

#### SequenceArray

`type SequenceArray = V[]`

#### StaticArray

`interface StaticArray `

#### Tuple

`type Tuple = T`

#### TypedMemoryView

`interface TypedMemoryView `

#### U8Array

`type U8Array = Uint8Array`

#### WithOffset

`interface WithOffset `

#### WithPrevOffset

`interface WithPrevOffset `

#### ArrayExpression

`interface ArrayExpression `

#### ArrayType

`interface ArrayType `

#### AstLeafType

`type AstLeafType = ExpressionType | TypeType | DeclarationType`

#### AstNode

`interface AstNode `

#### AstType

`type AstType = Expression | Identifier | TypeIdentifier | Type | Declaration`

#### BigIntExpression

`interface BigIntExpression `

#### BigIntType

`interface BigIntType `

#### BooleanExpression

`interface BooleanExpression `

#### BooleanType

`interface BooleanType `

#### Declaration

`interface Declaration `

#### DeclarationType

`type DeclarationType = VariableDeclaration | InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration | FunctionDeclaration | ModuleDeclaration | PackageDeclaration`

#### DependencyExpression

`interface DependencyExpression `

#### EnumDeclaration

`interface EnumDeclaration `

#### EnumPropertyDeclaration

`interface EnumPropertyDeclaration `

#### Expression

`interface Expression `

#### ExpressionType

`type ExpressionType = StringExpression | NumberExpression | BooleanExpression | NullExpression | UndefinedExpression | BigIntExpression | RegExpExpression | ArrayExpression | TupleExpression | SelectExpression | TemplateExpression | MultiSelectExpression | IdentifierExpression | DependencyExpression`

#### FunctionDeclaration

`interface FunctionDeclaration `

#### FunctionType

`interface FunctionType `

#### GenericReferenceType

`interface GenericReferenceType `

#### Identifier

`interface Identifier `

#### IdentifierExpression

`interface IdentifierExpression `

#### InterfaceDeclaration

`interface InterfaceDeclaration `

#### IntersectionType

`interface IntersectionType `

#### KeywordType

`interface KeywordType `

#### MappedType

`interface MappedType `

#### ModuleDeclaration

`interface ModuleDeclaration `

#### MultiSelectExpression

`interface MultiSelectExpression `

#### NullExpression

`interface NullExpression `

#### NullType

`interface NullType `

#### NumberExpression

`interface NumberExpression `

#### NumberType

`interface NumberType `

#### ObjectType

`interface ObjectType `

#### PackageDeclaration

`interface PackageDeclaration `

#### ParameterDeclaration

`interface ParameterDeclaration `

#### PropertyDeclaration

`interface PropertyDeclaration `

#### PropertyType

`interface PropertyType `

#### ReferenceType

`interface ReferenceType `

#### RegExpExpression

`interface RegExpExpression `

#### RegExpType

`interface RegExpType `

#### ReturnDeclaration

`interface ReturnDeclaration `

#### SelectExpression

`interface SelectExpression `

#### StringExpression

`interface StringExpression `

#### StringType

`interface StringType `

#### TemplateExpression

`interface TemplateExpression `

#### TemplateType

`interface TemplateType `

#### TupleExpression

`interface TupleExpression `

#### TupleType

`interface TupleType `

#### Type

`interface Type `

#### TypeAliasDeclaration

`interface TypeAliasDeclaration `

#### TypeIdentifier

`interface TypeIdentifier `

#### TypeType

`type TypeType = KeywordType | ReferenceType | ArrayType | TupleType | ObjectType | UnionType | IntersectionType | TemplateType | MappedType | FunctionType | GenericReferenceType | StringType | NumberType | BooleanType | NullType | UndefinedType | BigIntType | RegExpType`

#### UndefinedExpression

`interface UndefinedExpression `

#### UndefinedType

`interface UndefinedType `

#### UnionType

`interface UnionType `

#### VariableDeclaration

`interface VariableDeclaration `

#### AbstractDataType

`interface AbstractDataType `

#### Deque

`interface Deque `

#### DictionaryMap

`interface DictionaryMap `

#### DictionaryObject

`type DictionaryObject = Record<K, V>`

#### LRUCache

`interface LRUCache `

#### LRUCacheInternalMemory

`interface LRUCacheInternalMemory `

#### PriorityQueue

`interface PriorityQueue `

#### Queue

`interface Queue `

#### Set

`interface Set `

#### Stack

`interface Stack `

#### Value

`type Value = T`

#### WithDescription

`interface WithDescription `

#### WithId

`interface WithId `

#### WithKind

`interface WithKind `

#### WithName

`interface WithName `

#### WithType

`interface WithType `

#### WithValue

`interface WithValue `

#### Action

`type Action = (value: Value<T>) => void`

#### AsyncCallback

`type AsyncCallback = () => Promise<void>`

#### Callable

`type Callable = (args: TArgs) => TReturn`

#### Callback

`type Callback = () => void`

#### Constructable

`type Constructable = any`

#### Dispose

`type Dispose = () => void`

#### Future

`type Future = Promise<T>`

#### IObjectClone

`interface IObjectClone `

#### Stream

`type Stream = AsyncIterable<T>`

#### AbsolutePathString

`type AbsolutePathString = Slug`

#### BalancedTree

`interface BalancedTree `

#### BinaryTree

`interface BinaryTree `

#### BinaryTreeNode

`interface BinaryTreeNode `

#### BTree

`interface BTree `

#### DirPathString

`type DirPathString = PathString`

#### EdgeListGraph

`interface EdgeListGraph `

#### FilePathString

`type FilePathString = PathString`

#### Graph

`interface Graph `

#### GraphAdjacencyList

`interface GraphAdjacencyList `

#### GraphAdjacencyMatrix

`interface GraphAdjacencyMatrix `

#### Heap

`interface Heap `

#### Leaf

`interface Leaf `

#### Octree

`interface Octree `

#### OctreeNode

`interface OctreeNode `

#### PathString

`type PathString = AbsolutePathString | RelativePathString`

#### QuadTree

`interface QuadTree `

#### QuadTreeNode

`interface QuadTreeNode `

#### RelativePathString

`type RelativePathString = Slug`

#### SegmentTree

`interface SegmentTree `

#### Slug

`type Slug = string`

#### SourcePathString

`type SourcePathString = DirPathString`

#### Tree

`interface Tree `

#### TreeNode

`interface TreeNode `

#### Trie

`interface Trie `

#### WithDirPath

`interface WithDirPath `

#### WithFileName

`interface WithFileName `

#### WithFilePath

`interface WithFilePath `

#### WithPathString

`interface WithPathString `

#### WithSourcePath

`interface WithSourcePath `

#### Alias

`type Alias = T`

#### Brand

`type Brand = K & { brand: T }`

#### DataStructure

`interface DataStructure `

#### LateInit

`type LateInit = T`

#### LogicalTopology

`type LogicalTopology = "1:1_Linear" | "1:N_Hierarchical" | "N:M_Network" | "Spatial_Grid"`

#### MemoryLayout

`type MemoryLayout = "Contiguous" | "Pointer" | "Hashed" | "Composite"`

#### Codec

`interface Codec `

#### Decode

`type Decode = (encoded: E) => D`

#### Encode

`type Encode = (data: D) => E`

#### Execute

`type Execute = Callable<I, O>`

#### Gate

`interface Gate `

#### WithCreate

`interface WithCreate `

#### WithDecode

`interface WithDecode `

#### WithEncode

`interface WithEncode `

#### WithExecute

`interface WithExecute `

#### AllPrimitives

`type AllPrimitives = StringPrimitive | NumberPrimitive | Bool | Null | Undefined | SymbolType`

#### Bool

`type Bool = boolean`

#### Char

`type Char = Brand<string, "Char">`

#### EnumInt

`type EnumInt = number`

#### EnumString

`type EnumString = string`

#### F32

`type F32 = Brand<number, "F32">`

#### F64

`type F64 = Brand<number, "F64">`

#### FixedString

`type FixedString = string`

#### Float

`type Float = F32`

#### FloatPrimitive

`type FloatPrimitive = F32 | F64 | Float`

#### I128

`type I128 = Brand<bigint, "I128">`

#### I16

`type I16 = Brand<number, "I16">`

#### I32

`type I32 = Brand<number, "I32">`

#### I64

`type I64 = Brand<bigint, "I64">`

#### I8

`type I8 = Brand<number, "I8">`

#### InlineString

`type InlineString = string`

#### Int

`type Int = I32`

#### IntPrimitive

`type IntPrimitive = I8 | I16 | I32 | I64 | I128 | Int`

#### MultilineString

`type MultilineString = string`

#### Null

`type Null = null`

#### Number

`type Number = number`

#### NumberPrimitive

`type NumberPrimitive = IntPrimitive | UIntPrimitive | FloatPrimitive`

#### StringPrimitive

`type StringPrimitive = Char | InlineString | MultilineString | FixedString`

#### SymbolType

`type SymbolType = symbol`

#### U128

`type U128 = Brand<bigint, "U128">`

#### U16

`type U16 = Brand<number, "U16">`

#### U32

`type U32 = Brand<number, "U32">`

#### U64

`type U64 = Brand<bigint, "U64">`

#### U8

`type U8 = Brand<number, "U8">`

#### UIntPrimitive

`type UIntPrimitive = U8 | U16 | U32 | U64 | U128`

#### Undefined

`type Undefined = undefined`

#### BloomFilter

`interface BloomFilter `

#### HyperLogLog

`interface HyperLogLog `

#### ProbabilisticDataStructure

`interface ProbabilisticDataStructure `

#### DisjointSet

`interface DisjointSet `

#### DoublyLinkedList

`interface DoublyLinkedList `

#### DoublyLinkedListNode

`interface DoublyLinkedListNode `

#### HashTable

`interface HashTable `

#### LinkedList

`interface LinkedList `

#### LinkedListNode

`interface LinkedListNode `

#### Node

`interface Node `

#### RingBuffer

`interface RingBuffer `

#### SkipList

`interface SkipList `

#### SkipListNode

`interface SkipListNode `

## 🕊️ Vision

> "Razomy" means Together—you and me.  
> We act as catalysts, turning natural chaos into clarity through open collaboration.  
> By building honest, reliable systems, we empower humanity and create a foundation for peace.  
> We foster a borderless environment driven by quality code and mutual support.  
> Join us to build this future—one commit at a time.

## 💖 Fuel Our Shared Future

We can't build this without you.
If this library has saved you time or helped turn chaos into clarity in your own projects,
 please consider backing the developers behind it. 
 Building reliable, open-source tools takes immense time and energy.
Your sponsorship isn't just a donation; 
it’s the fuel that keeps this project actively maintained, bug-free, and thriving for everyone who relies on it.

Help us keep the momentum going. Choose how you want to light the way:

- [✨ Spark of Creativity](https://donate.stripe.com/28EbJ07jlbQR83sc2d0Jq08)
- [🌟 Flame of Innovation (Recommended)](https://donate.stripe.com/3cI6oGbzB1cddnMc2d0Jq06)
- [🔥 Torch of Progress](https://donate.stripe.com/28EcN48np9IJ6Zo9U50Jq09)
- [🚀 Beacon of Excellence](https://donate.stripe.com/6oU9AS0UX8EFerQc2d0Jq07)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/razomy/js/issues).

## 📝 License

Copyright © 2026 [Razomy](https://github.com/razomy).
This project is [MIT](https://github.com/razomy/js/blob/main/LICENSE) licensed.

## 🐛 Reporting Issues

We use GitHub Issues as the official bug tracker for this project.

Before opening a new issue, please check if your problem has already been reported. If it hasn't, please open a new issue here:
[GitHub Issues: razomy/js](https://github.com/razomy/js/issues)

When reporting a bug, please include:

- A brief description of the issue.
- Steps to reproduce the bug.
- Your current environment (Node version, OS, etc.).
