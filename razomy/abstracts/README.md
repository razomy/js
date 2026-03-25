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
import { functionName } from '@razomy/abstracts';
// or
razomy run @razomy/abstracts functionName
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
- [ast.Any](#any)
- [ast.Array](#array)
- [ast.Boolean](#boolean)
- [ast.BooleanLiteral](#booleanliteral)
- [ast.Color](#color)
- [ast.Date](#date)
- [ast.Declaration](#declaration)
- [ast.Definition](#definition)
- [ast.File](#file)
- [ast.FileArray](#filearray)
- [ast.Function](#function)
- [ast.FunctionArgument](#functionargument)
- [ast.Generic](#generic)
- [ast.Intersection](#intersection)
- [ast.JsonString](#jsonstring)
- [ast.Literal](#literal)
- [ast.Module](#module)
- [ast.MultiSelect](#multiselect)
- [ast.Number](#number)
- [ast.NumberLiteral](#numberliteral)
- [ast.Object](#object)
- [ast.PackageFunction](#packagefunction)
- [ast.Property](#property)
- [ast.Reference](#reference)
- [ast.Select](#select)
- [ast.String](#string)
- [ast.StringLiteral](#stringliteral)
- [ast.Tuple](#tuple)
- [ast.Type](#type)
- [ast.Union](#union)
- [ast.Unknown](#unknown)
- [ast.Variable](#variable)
- [ast.Void](#void)
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
- [machines.IActor](#iactor)
- [machines.IJobBid](#ijobbid)
- [machines.IJobContract](#ijobcontract)
- [machines.IJobMarket](#ijobmarket)
- [machines.IMessage](#imessage)
- [machines.IMessageBroker](#imessagebroker)
- [machines.IPipeline](#ipipeline)
- [machines.IPipelineStep](#ipipelinestep)
- [machines.IStackMachine](#istackmachine)
- [machines.IStateMachine](#istatemachine)
- [machines.IStateNode](#istatenode)
- [machines.ITask](#itask)
- [machines.ITaskHandler](#itaskhandler)
- [machines.IWorker](#iworker)
- [machines.IWorkflowContext](#iworkflowcontext)
- [machines.StackDirective](#stackdirective)
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

#### F64Array

#### Index

#### Offset

#### RawBuffer

#### SequenceArray

#### StaticArray

#### Tuple

#### TypedMemoryView

#### U8Array

#### WithOffset

#### WithPrevOffset

#### Any

#### Array

#### Boolean

#### BooleanLiteral

#### Color

#### Date

#### Declaration

#### Definition

#### File

#### FileArray

#### Function

#### FunctionArgument

#### Generic

#### Intersection

#### JsonString

#### Literal

#### Module

#### MultiSelect

#### Number

#### NumberLiteral

#### Object

#### PackageFunction

#### Property

#### Reference

#### Select

#### String

#### StringLiteral

#### Tuple

#### Type

#### Union

#### Unknown

#### Variable

#### Void

#### AbstractDataType

#### Deque

#### DictionaryMap

#### DictionaryObject

#### LRUCache

#### LRUCacheInternalMemory

#### PriorityQueue

#### Queue

#### Set

#### Stack

#### Value

#### WithDescription

#### WithId

#### WithKind

#### WithName

#### WithType

#### WithValue

#### Action

#### AsyncCallback

#### Callable

#### Callback

#### Constructable

#### Dispose

#### Future

#### IObjectClone

#### Stream

#### AbsolutePathString

#### BalancedTree

#### BinaryTree

#### BinaryTreeNode

#### BTree

#### DirPathString

#### EdgeListGraph

#### FilePathString

#### Graph

#### GraphAdjacencyList

#### GraphAdjacencyMatrix

#### Heap

#### Leaf

#### Octree

#### OctreeNode

#### PathString

#### QuadTree

#### QuadTreeNode

#### RelativePathString

#### SegmentTree

#### Slug

#### SourcePathString

#### Tree

#### TreeNode

#### Trie

#### WithDirPath

#### WithFileName

#### WithFilePath

#### WithPathString

#### WithSourcePath

#### IActor

#### IJobBid

#### IJobContract

#### IJobMarket

#### IMessage

#### IMessageBroker

#### IPipeline

#### IPipelineStep

#### IStackMachine

#### IStateMachine

#### IStateNode

#### ITask

#### ITaskHandler

#### IWorker

#### IWorkflowContext

#### StackDirective

#### Alias

#### Brand

#### DataStructure

#### LateInit

#### LogicalTopology

#### MemoryLayout

#### Codec

#### Decode

#### Encode

#### Execute

#### Gate

#### WithCreate

#### WithDecode

#### WithEncode

#### WithExecute

#### AllPrimitives

#### Bool

#### Char

#### EnumInt

#### EnumString

#### F32

#### F64

#### FixedString

#### Float

#### FloatPrimitive

#### I128

#### I16

#### I32

#### I64

#### I8

#### InlineString

#### Int

#### IntPrimitive

#### MultilineString

#### Null

#### Number

#### NumberPrimitive

#### StringPrimitive

#### SymbolType

#### U128

#### U16

#### U32

#### U64

#### U8

#### UIntPrimitive

#### Undefined

#### BloomFilter

#### HyperLogLog

#### ProbabilisticDataStructure

#### DisjointSet

#### DoublyLinkedList

#### DoublyLinkedListNode

#### HashTable

#### LinkedList

#### LinkedListNode

#### Node

#### RingBuffer

#### SkipList

#### SkipListNode

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
