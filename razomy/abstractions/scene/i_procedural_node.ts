import * as abstractions from '@razomy/abstractions';

/**
 * PCG (Procedural Content Generation) Ontology
 *
 * 0. Graph Core & Execution: Graph, Node, Pin/Port, Edge, ExecutionContext
 * 1. Spatial Data Containers: PointData, SurfaceData, SplineData, VolumeData, MeshData
 * 2. Point Primitives & Attributes: PcgPoint (Transform, Density, Bounds, Steepness, Attributes)
 * 3. Samplers & Generators: SurfaceSampler, SplineSampler, VolumeSampler, Noise/SDF Field
 * 4. Spatial Modifiers: TransformPoints, ProjectToSurface, AlignToNormal, BoundExtender
 * 5. Filters & Partitioning: DensityFilter, DistanceFilter, AttributeFilter, SpatialQuery (Raycast/BVH)
 * 6. Solvers & Rules: PoissonRelaxation, WaveFunctionCollapse (WFC), L-System / Shape Grammar
 * 7. Combiners & Set Operations: Union/Merge, Difference (Subtraction), Intersection, Blend
 * 8. Spawners & Sinks: StaticMeshSpawner, HierarchicalInstancer, ActorSpawner, ExportSink
 */

export interface IProceduralNode extends abstractions.patterns.ISyntax {
  name?: string;
  metadata?: Record<string, any>;
}

// ==========================================
// region 0. Graph Core & Execution
// ==========================================

export type PcgPinDirection = 'input' | 'output';

export type PcgDataType =
  | 'Point'        // Точки/инстансы (UE PCG Point, Houdini Points)
  | 'Surface'      // Ландшафт, меш поверхности (Landscape, Heightfield)
  | 'Spline'       // Кривые и пути (Roads, Rivers, Boundaries)
  | 'Volume'       // 3D объемы, SDF, Fog (VDB)
  | 'Mesh'         // Полигональная геометрия
  | 'Parametric'   // Скаляры, векторы, матрицы, строки
  | 'Any';

export interface PcgPin extends IProceduralNode {
  kind: 'PcgPin';
  pinName: string;
  direction: PcgPinDirection;
  allowedTypes: PcgDataType[];
  isMultiConnection: boolean; // поддержка нескольких входящих связей (Merge)
}

export interface PcgEdge extends IProceduralNode {
  kind: 'PcgEdge';
  fromNodeId: string;
  fromPinName: string;
  toNodeId: string;
  toPinName: string;
}

/**
 * Контекст вычисления графа (включает сид, область мира, LOD, отмену задачи).
 */
export interface PcgExecutionContext {
  worldSeed: number;
  generationBounds: {
    min: [number, number, number];
    max: [number, number, number];
  };
  lodLevel: number;
  cancellationToken?: boolean;
}

/**
 * Базовый процедурный узел графа (Node).
 */
export interface IPcgNode extends IProceduralNode {
  inputs: PcgPin[];
  outputs: PcgPin[];
  enabled: boolean;
  debugVisualization?: boolean;
}

// ==========================================
// region 1. Spatial Data Containers
// ==========================================

/**
 * Атомарная точка генерации (аналог FPCGPoint в Unreal Engine или Point в Houdini).
 */
export interface PcgPoint {
  transform: abstractions.math.Transform3;
  density: number;        // Плотность от 0.0 до 1.0 (для отсева и масок)
  steepness: number;      // Наклон поверхности под точкой
  boundsMin: abstractions.math.Vector3;     // Локальный AABB бокс для коллизий
  boundsMax: abstractions.math.Vector3;
  seed: number;           // Локальный детерминированный сид
  color?: [number, number, number, number];
  attributes: Record<string, number | string | boolean | abstractions.math.Vector3>; // Кастомные атрибуты (как @attrib в VEX)
}

/**
 * Облако точек (Point Cloud) — ключевой тип данных в PCG графах.
 */
export interface PcgPointData extends IProceduralNode {
  kind: 'PcgPointData';
  points: PcgPoint[];
  spatialBounds: { min: abstractions.math.Vector3; max: abstractions.math.Vector3 };
}

/**
 * Высотная карта / ландшафт / поверхность коллизии.
 */
export interface PcgSurfaceData extends IProceduralNode {
  kind: 'PcgSurfaceData';
  surfaceType: 'TerrainHeightfield' | 'StaticMesh' | 'ProceduralMesh';
  raycastTargetLayer?: string;
}

/**
 * Кривая / Сплайн для дорог, рек, заборов и границ биомов.
 */
export interface PcgSplineData extends IProceduralNode {
  kind: 'PcgSplineData';
  controlPoints: abstractions.math.Vector3[];
  isClosed: boolean;
  splineWidth: number;
}

// ==========================================
// region 2. Samplers & Generators
// ==========================================

/**
 * Сэмплирование точек по поверхности (Landscape / Mesh Surface).
 * @replaces Houdini: Scatter SOP, Unreal PCG: Surface Sampler
 */
export interface SurfaceSamplerNode extends IPcgNode {
  kind: 'SurfaceSamplerNode';
  samplingMethod: 'PoissonDisk' | 'Grid' | 'UniformRandom';
  pointsPerSquaredMeter: number;
  pointExtents: abstractions.math.Vector3;
  looseness: number;
}

/**
 * Сэмплирование точек вдоль направляющей сплайна.
 * @replaces Houdini: Resample SOP, Unreal PCG: Spline Sampler
 */
export interface SplineSamplerNode extends IPcgNode {
  kind: 'SplineSamplerNode';
  sampleDistance: number;
  subdivisionMethod: 'Distance' | 'Tangents' | 'ControlPoints';
  fillInteriorSpace: boolean; // сэмплировать область внутри замкнутого сплайна
}

/**
 * Генерация математических полей шума и SDF (Signed Distance Field).
 * @replaces Houdini: Volume Noise, Blender: Musgrave/Perlin Texture Node
 */
export interface NoiseFieldNode extends IPcgNode {
  kind: 'NoiseFieldNode';
  noiseType: 'Perlin' | 'Simplex' | 'WorleyVoronoi' | 'Curl';
  frequency: number;
  octaves: number;
  lacunarity: number;
  targetAttributeName: string; // куда записать (например "density" или "offset")
}

// ==========================================
// region 3. Spatial Modifiers & Operators
// ==========================================

/**
 * Рандомизация и трансформация точек.
 * @replaces Unreal PCG: Transform Points, Houdini: Attribute Randomize / Point Jitter
 */
export interface TransformPointsNode extends IPcgNode {
  kind: 'TransformPointsNode';
  offsetMin: abstractions.math.Vector3;
  offsetMax: abstractions.math.Vector3;
  rotationMin: abstractions.math.Vector3; // углы Эйлера
  rotationMax: abstractions.math.Vector3;
  uniformScale: boolean;
  scaleMin: abstractions.math.Vector3;
  scaleMax: abstractions.math.Vector3;
}

/**
 * Проекция точек вниз на поверхность с выравниванием нормалей.
 * @replaces Unreal PCG: Projection, Houdini: Ray SOP
 */
export interface ProjectToSurfaceNode extends IPcgNode {
  kind: 'ProjectToSurfaceNode';
  rayDirection: abstractions.math.Vector3; // обычно [0, -1, 0]
  maxRayDistance: number;
  alignToSurfaceNormal: boolean;
  retainOriginalZ: boolean;
}

// ==========================================
// region 4. Filters & Partitioning
// ==========================================

/**
 * Фильтрация точек по плотности и вероятности.
 * @replaces Unreal PCG: Density Filter
 */
export interface DensityFilterNode extends IPcgNode {
  kind: 'DensityFilterNode';
  lowerThreshold: number; // отсекаем все, что ниже
  upperThreshold: number;
  invert: boolean;
}

/**
 * Пространственный отсев по дистанции и коллизиям точек друг с другом (Self-Pruning).
 * @replaces Unreal PCG: Distance / Self-Pruning Node, Houdini: Relax SOP
 */
export interface SpatialDistanceFilterNode extends IPcgNode {
  kind: 'SpatialDistanceFilterNode';
  minimumDistance: number;
  pruneMode: 'RemoveLowerDensity' | 'RemoveFirst' | 'MergeBounds';
}

/**
 * Фильтрация по кастомным атрибутам (угол наклона, высота, маска биома).
 * @replaces Houdini: Blast / Split SOP (на базе условий @slope > 30)
 */
export interface AttributeFilterNode extends IPcgNode {
  kind: 'AttributeFilterNode';
  attributeName: string;
  comparator: 'Equal' | 'NotEqual' | 'Greater' | 'Less' | 'InRange';
  compareValue: any;
}

// ==========================================
// region 5. Advanced Solvers (WFC, L-Systems)
// ==========================================

/**
 * Модульная сборка на базе алгоритма Wave Function Collapse (коллапс волновой функции).
 * Применяется для генерации подземелий, интерьеров и городов из префабов по правилам смежности.
 */
export interface WaveFunctionCollapseNode extends IPcgNode {
  kind: 'WaveFunctionCollapseNode';
  gridSize: [number, number, number];
  tileSize: abstractions.math.Vector3;
  adjacencyRuleSetAsset: string; // ссылка на таблицу разрешенных стыковок
  periodicWrap: boolean; // зацикливание краев
}

/**
 * L-система / Процедурная грамматика формы (Shape Grammar).
 * Применяется для генерации деревьев, растений и дорожных сетей.
 */
export interface LSystemGrammarNode extends IPcgNode {
  kind: 'LSystemGrammarNode';
  axiom: string; // стартовая строка (например "FA")
  rules: Record<string, string>; // правила подстановки (например "A": "F[+A][-A]")
  iterations: number;
  angleStep: number;
  stepLength: number;
}

// ==========================================
// region 6. Combiners & Set Operations
// ==========================================

export type SpatialSetOperation = 'Union' | 'Difference' | 'Intersection';

/**
 * Булевы операции над коллекциями точек и пространственными зонами.
 * @replaces Unreal PCG: Difference / Merge Nodes, Houdini: Combine / Boolean SOP
 */
export interface SpatialBooleanNode extends IPcgNode {
  kind: 'SpatialBooleanNode';
  operation: SpatialSetOperation;
  targetTolerance: number;
}

// ==========================================
// region 7. Spawners & Output Sinks
// ==========================================

export interface MeshSpawnEntry {
  meshAssetPath: string; // URI ассета (.fbx, .uasset, .prefab, .usd)
  weight: number;        // Вес вероятности выбора
  scaleAdjustment?: abstractions.math.Vector3;
  collisionPreset?: string;
}

/**
 * Инстансинг финальных мешей в координаты сгенерированных точек.
 * @replaces Unreal PCG: Static Mesh Spawner, Unity: Prefab Spawner, Houdini: Copy to Points SOP
 */
export interface StaticMeshSpawnerNode extends IPcgNode {
  kind: 'StaticMeshSpawnerNode';
  meshEntries: MeshSpawnEntry[];
  instancingStrategy: 'HierarchicalInstancedStaticMesh' | 'MultiDrawIndirect' | 'PointInstancer';
  applyColorToMaterial: boolean;
  castShadows: boolean;
}

/**
 * Финальный узел-контейнер графа (PcgGraph).
 */
export interface PcgGraph extends IProceduralNode {
  kind: 'PcgGraph';
  nodes: abstractions.patterns.IdRef<IPcgNode>[];
  edges: PcgEdge[];
  exposedParameters: Record<string, any>; // глобальные параметры графа (сид, биом, плотность)
}
