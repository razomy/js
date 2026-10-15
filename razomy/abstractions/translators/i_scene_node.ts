import * as abstractions from '@razomy/abstractions';


export interface ISceneNode {}
// region 3. Properties, State & Relations (IInProperty)

/**
 * Базовый типизированный атрибут примитива (int, float, matrix4d, etc.).
 */
export interface AttributeIn extends abstractions.patterns.IComponent {
  kind: 'AttributeIn';
  name: string;
  shapeName: string;
  value?: any; // дефолтное статическое значение
  timeSamples?: abstractions.patterns.IdRef<TimeSamplesIn>;
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
 * Primvar - специализированный атрибут геометрии (префикс `primvars:`),
 * используемый рендерами для шейдинга и отрисовки.
 */
export interface PrimvarIn extends abstractions.patterns.IComponent {
  kind: 'PrimvarIn';
  name: string; // например: "primvars:displayColor" или "primvars:st"
  shapeName: string;
  interpolation: PrimvarInterpolation;
  elementSize?: number;
  indices?: number[]; // поддержка индексированных массивов
  value?: any;
}

/**
 * Связь (Relationship) - направленное ребро графа, указывающее на другие примы.
 * Например: связывание геометрии с материалом (material:binding).
 */
export interface RelationshipIn extends abstractions.patterns.IComponent {
  kind: 'RelationshipIn';
  name: string;
  targets: string[]; // целевые SdfPath
}

/**
 * Анимированные данные с привязкой по кадрам / TimeCodes.
 */
export interface TimeSamplesIn extends abstractions.patterns.IEntity {
  kind: 'TimeSamplesIn';
  samples: Map<number, any>; // ключ: кадр/TimeCode, значение: сэмпл
  interpolation: 'linear' | 'held';
}

export type PropertyIn = AttributeIn | PrimvarIn | RelationshipIn;
// endregion

// region 2. Hierarchy & Entities (IInEntity)

export type InSpecifier = 'def' | 'over' | 'class';

/**
 * Kind - классификация примитива в структуре сцены (Model Hierarchy).
 */
export type InModelKind =
  | 'group'         // Промежуточная ветка моделей (ветвление дерева)
  | 'assembly'      // Крупный опубликованный ассет / локация (подкласс group)
  | 'component'     // Листовой готовый объект (не может содержать другие model)
  | 'subcomponent'; // Внутренняя геометрия внутри component

/**
 * Prim (Primitive) - базовый узел графа сцены.
 */
export interface PrimIn extends abstractions.patterns.IEntity {
  kind: 'PrimIn';
  name: string;
  specifier: InSpecifier; // def (создать), over (переопределить), class (шаблон)
  shapeName?: string; // имя Typed Schema (Mesh, Xform, Sphere, Material)
  modelKind?: InModelKind; // роль в Model Hierarchy
  active: boolean; // активация/деактивация узла в графе
  visibility: 'inherited' | 'invisible';
  children?: abstractions.patterns.IdRef<PrimIn>[];
  properties?: abstractions.patterns.IdRef<abstractions.patterns.IAttribute>[];
  compositionArcs?: abstractions.patterns.IdRef<CompositionArcIn>[];
}

/**
 * Нативный инстансинг (instanceable = true).
 * Все инстансы делят один прототип в оперативной памяти.
 */
export interface InstanceablePrimIn extends PrimIn {
  isInstance: boolean;
  masterPrimPath?: string; // путь к сгенерированному прототипу (Prototype Prim)
}

/**
 * Point Instancer - массовый инстансинг на базе точек (InGeomPointInstancer).
 * Эффективен для лесов, толп, камней (миллионы элементов).
 */
export interface PointInstancerIn extends PrimIn {
  prototypes: abstractions.patterns.IdRef<PrimIn>[]; // prototypes relationship
  protoIndices: number[]; // индекс прототипа для каждой точки
  positions: [number, number, number][]; // координаты точек
  orientations?: [number, number, number, number][]; // кватернионы
  scales?: [number, number, number][];
}
// endregion

// region 1. Execution & Context (IInContext)

/**
 * Stage - итоговый составленный (composed) граф сцены в памяти.
 * Точка входа для рендеров и вьюпортов.
 */
export interface StageIn extends abstractions.patterns.IContext {
  kind: 'StageIn';
  rootLayer: abstractions.patterns.IdRef<LayerIn>;
  sessionLayer?: abstractions.patterns.IdRef<LayerIn>;
  defaultPrim?: abstractions.patterns.IdRef<PrimIn>;
  timeCodesPerSecond?: number;
  framesPerSecond?: number;
}

/**
 * Layer - атомарный файл (.usd, .usda, .usdc, .usdz) или слой в памяти (LOP sublayer).
 * Хранит изолированные «мнения» (opinions) без их композиции.
 */
export interface LayerIn extends abstractions.patterns.IContext {
  kind: 'LayerIn';
  identifier: string; // путь к файлу или ассет-URI (@file.usd@)
  subLayers?: abstractions.patterns.IdRef<LayerIn>[];
  defaultPrim?: string;
  isAnonymous?: boolean;
}
// endregion

// region 4. Composition Arcs (IInCompositionArc)

/**
 * Дуги композиции USD в порядке приоритета LIVRPS:
 * L - Local Opinions (суб-слои)
 * I - Inherits
 * V - Variants
 * R - References
 * P - Payloads
 * S - Specializes
 */
export type CompositionArcIn =
  | SublayerArcIn
  | InheritArcIn
  | VariantSetIn
  | ReferenceArcIn
  | PayloadArcIn
  | SpecializeArcIn;

export interface SublayerArcIn extends abstractions.patterns.IEdge {
  kind: 'SublayerArcIn';
  layerRef: abstractions.patterns.IdRef<LayerIn>;
  layerPosition: number;
}

export interface InheritArcIn extends abstractions.patterns.IEdge {
  kind: 'InheritArcIn';
  targetPath: string; // SdfPath до prim-класса
}

export interface VariantSetIn extends abstractions.patterns.IEdge {
  kind: 'VariantSetIn';
  name: string; // например: "modelLOD", "shadingVariant"
  selectedVariant: string;
  variants: Record<string, abstractions.patterns.IdRef<PrimIn>>;
}

export interface ReferenceArcIn extends abstractions.patterns.IEdge {
  kind: 'ReferenceArcIn';
  assetPath: string; // путь к файлу (@chair.usd@)
  targetPrim?: string;
  layerOffsetTime?: number;
  layerScaleTime?: number;
}

export interface PayloadArcIn extends abstractions.patterns.IEdge {
  kind: 'PayloadArcIn';
  assetPath: string;
  targetPrim?: string;
  isLoaded: boolean; // поддержка выгрузки тяжелых данных из памяти
}

export interface SpecializeArcIn extends abstractions.patterns.IEdge {
  kind: 'SpecializeArcIn';
  targetPath: string; // специализированный оверрайд слабее Inherit
}
// endregion

// region 5. Schemas & Semantic Contracts (IInSchema)

/**
 * Typed Schema: определяет сущность прима («Является Чем-то» / Is-A).
 * Например: InGeomMesh, InLuxDiskLight, InGeomCamera.
 */
export interface TypedSchemaIn extends abstractions.patterns.IShape {
  kind: 'TypedSchemaIn';
  schemaName: string;
  appliedToPrim: abstractions.patterns.IdRef<PrimIn>;
}

/**
 * API Schema: добавляет возможности поверх сущности («Умеет Что-то» / Can-Be).
 * Например: InPhysicsRigidBodyAPI, InShadeMaterialBindingAPI.
 */
export interface ApiSchemaIn extends abstractions.patterns.IShape {
  kind: 'ApiSchemaIn';
  apiName: string;
  isApplied: boolean;
  multiApplyInstanceName?: string; // для Multiple-Apply схем (CollectionAPI:lights)
}
// endregion

// region 6. Pipeline & Hydra Ecosystem (IInInfrastructure)

/**
 * Asset Resolver - плагин резолва URI (@shot_01/asset.usd@ -> /mnt/storage/...).
 */
export interface AssetResolverIn extends abstractions.patterns.IInfrastructure {
  kind: 'AssetResolverIn';
  resolverType: string;
}

/**
 * Hydra Render Delegate - адаптер рендера (Karma, Arnold, Storm, RenderMan, Cycles).
 */
export interface RenderDelegateIn extends abstractions.patterns.IInfrastructure {
  kind: 'RenderDelegateIn';
  rendererName: string;
}

/**
 * Scene Delegate - мост, поставляющий сцену из USD в движок Hydra.
 */
export interface SceneDelegateIn extends abstractions.patterns.IInfrastructure {
  kind: 'SceneDelegateIn';
}

/**
 * Prim Adapter - конвертер конкретного USD-примитива в буферы рендера Hydra.
 */
export interface PrimAdapterIn extends abstractions.patterns.IInfrastructure {
  kind: 'PrimAdapterIn';
  targetPrimType: string;
}
// endregion
