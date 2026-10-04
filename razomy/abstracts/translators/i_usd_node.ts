import * as abstracts from '@razomy/abstracts';

/**
 * ============================================================================
 * USD (Universal Scene Description) Ontology
 * ============================================================================
 *
 * Архитектура USD сведена к 5 фундаментальным мета-типам (+ Инфраструктура):
 *
 * 1. IUsdContext          — [Контекст / Scope] Контейнеры и среды рантайма (Stage, Layer).
 * 2. IUsdEntity           — [Сущность / Graph Node] Узлы иерархии сцены (Prim, Instancers).
 * 3. IUsdProperty         — [Данные и Связи / State & Links] Атрибуты, primvars, связи, время.
 * 4. IUsdCompositionArc   — [Операторы сборки / Delta Rules] Правила слияния графа (LIVRPS).
 * 5. IUsdSchema           — [Семантические контракты / Traits] Типизация поведения (Typed, API).
 * 6. IUsdInfrastructure   — [Рантайм и Трансляция / I/O] Плагины резолва и рендер-мост Hydra.
 */

// ============================================================================
// region Root Node & Base Meta-Interfaces (5 Фундаментальных Мета-Типов)
// ============================================================================

/** Базовый узел онтологии USD */
export interface IUsdNode extends abstracts.patterns.IEntity {
  id: string;
  kind: string;
  usdPath?: string; // SdfPath (например: "/World/Characters/Hero")
  metadata?: Record<string, any>;
}

/** 1. Контекст исполнения и контейнеры данных (Stage, Layer) */
export interface IUsdContext extends IUsdNode {}

/** 2. Сущность в иерархии графа сцены (Prim, PointInstancer) */
export interface IUsdEntity extends IUsdNode {}

/** 3. Атомарные данные, значения во времени и ребра графа (Attributes, Primvars, Relations) */
export interface IUsdProperty extends IUsdNode {}

/** 4. Операторы композиции и неразрушающего слияния слоев (LIVRPS Arcs) */
export interface IUsdCompositionArc extends IUsdNode {}

/** 5. Семантические контракты и интерфейсы поведения сущностей (Schemas) */
export interface IUsdSchema extends IUsdNode {}

/** 6. Внешняя инфраструктура: I/O резолверы и графический конвейер (Hydra Engine) */
export interface IUsdInfrastructure extends IUsdNode {}

// ============================================================================
// region 1. Execution & Context (IUsdContext)
// ============================================================================

/**
 * Stage — итоговый составленный (composed) граф сцены в памяти.
 * Точка входа для рендеров и вьюпортов.
 */
export interface StageUsd extends IUsdContext {
  kind: 'StageUsd';
  rootLayer: abstracts.patterns.IdRef<LayerUsd>;
  sessionLayer?: abstracts.patterns.IdRef<LayerUsd>;
  defaultPrim?: abstracts.patterns.IdRef<PrimUsd>;
  timeCodesPerSecond?: number;
  framesPerSecond?: number;
}

/**
 * Layer — атомарный файл (.usd, .usda, .usdc, .usdz) или слой в памяти (LOP sublayer).
 * Хранит изолированные «мнения» (opinions) без их композиции.
 */
export interface LayerUsd extends IUsdContext {
  kind: 'LayerUsd';
  identifier: string; // путь к файлу или ассет-URI (@file.usd@)
  subLayers?: abstracts.patterns.IdRef<LayerUsd>[];
  defaultPrim?: string;
  isAnonymous?: boolean;
}

// ============================================================================
// region 2. Hierarchy & Entities (IUsdEntity)
// ============================================================================

export type UsdSpecifier = 'def' | 'over' | 'class';

/**
 * Kind — классификация примитива в структуре сцены (Model Hierarchy).
 */
export type UsdModelKind =
  | 'group'         // Промежуточная ветка моделей (ветвление дерева)
  | 'assembly'      // Крупный опубликованный ассет / локация (подкласс group)
  | 'component'     // Листовой готовый объект (не может содержать другие model)
  | 'subcomponent'; // Внутренняя геометрия внутри component

/**
 * Prim (Primitive) — базовый узел графа сцены.
 */
export interface PrimUsd extends IUsdEntity {
  kind: 'PrimUsd';
  name: string;
  specifier: UsdSpecifier; // def (создать), over (переопределить), class (шаблон)
  typeName?: string; // имя Typed Schema (Mesh, Xform, Sphere, Material)
  modelKind?: UsdModelKind; // роль в Model Hierarchy
  active: boolean; // активация/деактивация узла в графе
  visibility: 'inherited' | 'invisible';
  children?: abstracts.patterns.IdRef<PrimUsd>[];
  properties?: abstracts.patterns.IdRef<PropertyUsd>[];
  compositionArcs?: abstracts.patterns.IdRef<CompositionArcUsd>[];
}

/**
 * Нативный инстансинг (instanceable = true).
 * Все инстансы делят один прототип в оперативной памяти.
 */
export interface InstanceablePrimUsd extends PrimUsd {
  isInstance: boolean;
  masterPrimPath?: string; // путь к сгенерированному прототипу (Prototype Prim)
}

/**
 * Point Instancer — массовый инстансинг на базе точек (UsdGeomPointInstancer).
 * Эффективен для лесов, толп, камней (миллионы элементов).
 */
export interface PointInstancerUsd extends PrimUsd {
  prototypes: abstracts.patterns.IdRef<PrimUsd>[]; // prototypes relationship
  protoIndices: number[]; // индекс прототипа для каждой точки
  positions: [number, number, number][]; // координаты точек
  orientations?: [number, number, number, number][]; // кватернионы
  scales?: [number, number, number][];
}

// ============================================================================
// region 3. Properties, State & Relations (IUsdProperty)
// ============================================================================

export type PropertyUsd = AttributeUsd | PrimvarUsd | RelationshipUsd;

/**
 * Базовый типизированный атрибут примитива (int, float, matrix4d, etc.).
 */
export interface AttributeUsd extends IUsdProperty {
  kind: 'AttributeUsd';
  name: string;
  typeName: string;
  value?: any; // дефолтное статическое значение
  timeSamples?: abstracts.patterns.IdRef<TimeSamplesUsd>;
  isBlocked?: boolean; // блокировка значения (None в USDA)
}

/**
 * Правило интерполяции данных primvar по поверхности геометрии.
 */
export type PrimvarInterpolation =
  | 'constant'    // Houdini: detail (одно значение на весь меш)
  | 'uniform'     // Houdini: primitive (на каждый фейс/полигон)
  | 'vertex'      // Houdini: point (на каждую топологическую вершину)
  | 'faceVarying' // Houdini: vertex (с учетом разрывов: UV, нормали)
  | 'varying';

/**
 * Primvar — специализированный атрибут геометрии (префикс `primvars:`),
 * используемый рендерами для шейдинга и отрисовки.
 */
export interface PrimvarUsd extends IUsdProperty {
  kind: 'PrimvarUsd';
  name: string; // например: "primvars:displayColor" или "primvars:st"
  typeName: string;
  interpolation: PrimvarInterpolation;
  elementSize?: number;
  indices?: number[]; // поддержка индексированных массивов
  value?: any;
}

/**
 * Связь (Relationship) — направленное ребро графа, указывающее на другие примы.
 * Например: связывание геометрии с материалом (material:binding).
 */
export interface RelationshipUsd extends IUsdProperty {
  kind: 'RelationshipUsd';
  name: string;
  targets: string[]; // целевые SdfPath
}

/**
 * Анимированные данные с привязкой по кадрам / TimeCodes.
 */
export interface TimeSamplesUsd extends IUsdProperty {
  kind: 'TimeSamplesUsd';
  samples: Map<number, any>; // ключ: кадр/TimeCode, значение: сэмпл
  interpolation: 'linear' | 'held';
}

// ============================================================================
// region 4. Composition Arcs (IUsdCompositionArc)
// ============================================================================

/**
 * Дуги композиции USD в порядке приоритета LIVRPS:
 * L - Local Opinions (суб-слои)
 * I - Inherits
 * V - Variants
 * R - References
 * P - Payloads
 * S - Specializes
 */
export type CompositionArcUsd =
  | SublayerArcUsd
  | InheritArcUsd
  | VariantSetUsd
  | ReferenceArcUsd
  | PayloadArcUsd
  | SpecializeArcUsd;

export interface SublayerArcUsd extends IUsdCompositionArc {
  kind: 'SublayerArcUsd';
  layerRef: abstracts.patterns.IdRef<LayerUsd>;
  layerPosition: number;
}

export interface InheritArcUsd extends IUsdCompositionArc {
  kind: 'InheritArcUsd';
  targetPath: string; // SdfPath до prim-класса
}

export interface VariantSetUsd extends IUsdCompositionArc {
  kind: 'VariantSetUsd';
  name: string; // например: "modelLOD", "shadingVariant"
  selectedVariant: string;
  variants: Record<string, abstracts.patterns.IdRef<PrimUsd>>;
}

export interface ReferenceArcUsd extends IUsdCompositionArc {
  kind: 'ReferenceArcUsd';
  assetPath: string; // путь к файлу (@chair.usd@)
  targetPrim?: string;
  layerOffsetTime?: number;
  layerScaleTime?: number;
}

export interface PayloadArcUsd extends IUsdCompositionArc {
  kind: 'PayloadArcUsd';
  assetPath: string;
  targetPrim?: string;
  isLoaded: boolean; // поддержка выгрузки тяжелых данных из памяти
}

export interface SpecializeArcUsd extends IUsdCompositionArc {
  kind: 'SpecializeArcUsd';
  targetPath: string; // специализированный оверрайд слабее Inherit
}

// ============================================================================
// region 5. Schemas & Semantic Contracts (IUsdSchema)
// ============================================================================

/**
 * Typed Schema: определяет сущность прима («Является Чем-то» / Is-A).
 * Например: UsdGeomMesh, UsdLuxDiskLight, UsdGeomCamera.
 */
export interface TypedSchemaUsd extends IUsdSchema {
  kind: 'TypedSchemaUsd';
  schemaName: string;
  appliedToPrim: abstracts.patterns.IdRef<PrimUsd>;
}

/**
 * API Schema: добавляет возможности поверх сущности («Умеет Что-то» / Can-Be).
 * Например: UsdPhysicsRigidBodyAPI, UsdShadeMaterialBindingAPI.
 */
export interface ApiSchemaUsd extends IUsdSchema {
  kind: 'ApiSchemaUsd';
  apiName: string;
  isApplied: boolean;
  multiApplyInstanceName?: string; // для Multiple-Apply схем (CollectionAPI:lights)
}

// ============================================================================
// region 6. Pipeline & Hydra Ecosystem (IUsdInfrastructure)
// ============================================================================

/**
 * Asset Resolver — плагин резолва URI (@shot_01/asset.usd@ -> /mnt/storage/...).
 */
export interface AssetResolverUsd extends IUsdInfrastructure {
  kind: 'AssetResolverUsd';
  resolverType: string;
}

/**
 * Hydra Render Delegate — адаптер рендера (Karma, Arnold, Storm, RenderMan, Cycles).
 */
export interface RenderDelegateUsd extends IUsdInfrastructure {
  kind: 'RenderDelegateUsd';
  rendererName: string;
}

/**
 * Scene Delegate — мост, поставляющий сцену из USD в движок Hydra.
 */
export interface SceneDelegateUsd extends IUsdInfrastructure {
  kind: 'SceneDelegateUsd';
}

/**
 * Prim Adapter — конвертер конкретного USD-примитива в буферы рендера Hydra.
 */
export interface PrimAdapterUsd extends IUsdInfrastructure {
  kind: 'PrimAdapterUsd';
  targetPrimType: string;
}
