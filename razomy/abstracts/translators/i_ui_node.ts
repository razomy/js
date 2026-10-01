/**
 * ============================================================================
 * UNIVERSAL UI INTERMEDIATE REPRESENTATION (UI-IR)
 * Package: @razomy/abstracts-ui
 * ============================================================================
 *
 * Архитектурные инварианты:
 * 1. Normalized Graph (Плоское хранилище): узлы ссылаются друг на друга через
 *    `IdRef<T>`. Это гарантирует O(1) доступ, нулевую стоимость циклических
 *    зависимостей, простую сериализацию в JSON/Protobuf/WASM и отсутствие утечек GC.
 * 2. Orthogonal Separation: Свойства геометрии (Layout), внешнего вида (Paint/Style),
 *    интерактивности (State/Events) и семантики (Role/Kind) изолированы друг от друга.
 * 3. 100% Cross-Target Coverage: Любое свойство транслируется без потерь в:
 *    - HTML5 / CSS3 / Web Components (Shadow DOM, Slots, CSS Grid)
 *    - Microsoft Word OpenXML (w:tbl, w:p, w:r, w:drawing, a:xfrm)
 *    - PDF Reference (Fixed MediaBox, Content Streams, CTM, ExtGState, Type3/TrueType)
 *    - Unity Engine (uGUI RectTransform, UI Toolkit Yoga, TextMeshPro, Shaders)
 */

import * as abstracts from '@razomy/abstracts';
import type { MetricUnit } from '../domains/has_dimension';
import type {
  FlexItemPlacement,
  GridItemPlacement,
  HasArguments,
  HasCallRef,
  HasCodeLanguage,
  HasEntityRef,
  HasResult,
  HasSender,
  HasTask,
  HasTaskType,
  HasText,
  HasTextType,
  Typography,
  UIInteractionSpec,
  UILayoutEngine,
  UIPaint,
  UIStyleBag,
} from '../domains/ui';

export interface IUiNode {}

export interface ILayout extends IUiNode {}
// ============================================================================
// 2. ДВИЖКИ КОМПОНОВКИ (Layout Engines)
// ============================================================================

// ============================================================================
// 8. СЕРИЯ УНИВЕРСАЛЬНЫХ УЗЛОВ (Discriminated Nodes)
// ============================================================================

export type UINodeId = string;

export interface IUIBaseNode extends abstracts.patterns.IEntity {
  id: UINodeId;
  kind: string;
  name?: string;
  parent?: abstracts.patterns.IdRef<UINode>;
  children?: abstracts.patterns.IdRef<UINode>[];
  containerLayout?: UILayoutEngine;
  itemPlacement?: {
    grid?: GridItemPlacement;
    flex?: FlexItemPlacement;
  };
  style?: UIStyleBag;
  interaction?: UIInteractionSpec;
  metadata?: {
    htmlTag?: string;
    ariaRole?: string;
    wordBookmark?: string;
    pdfTag?: 'Document' | 'Part' | 'Art' | 'Sect' | 'Div' | 'BlockQuote' | 'Table';
    unityLayer?: number;
    customData?: Readonly<Record<string, unknown>>;
  };
}

/** 1. Поверхность документа / Страница */
export interface SurfaceNode extends IUIBaseNode {
  kind: 'SurfaceNode';
  pageSize?: {
    width: MetricUnit;
    height: MetricUnit;
    orientation: 'portrait' | 'landscape';
  };
  dpi?: number;
}

/** 2. Контейнер общего назначения */
export interface ContainerNode extends IUIBaseNode {
  kind: 'ContainerNode';
}

/** 3. Текстовый узел (Лист дерева) */
export interface TextLeafNode extends IUIBaseNode {
  kind: 'TextLeafNode';
  content: string;
  typography: Typography;
}

/** 4. Векторная графика (SVG d-path, DrawingML, PDF Path) */
export interface VectorShapeNode extends IUIBaseNode {
  kind: 'VectorShapeNode';
  role: 'vector';
  pathCommands: string;
  fillRule?: 'nonzero' | 'evenodd';
  fillPaint?: UIPaint;
  strokePaint?: UIPaint;
  strokeWidth?: MetricUnit;
}

/** 5. Растровый медиа-ассет */
export interface MediaAssetNode extends IUIBaseNode {
  kind: 'MediaAssetNode';
  role: 'media';
  sourceUri: string;
  intrinsicWidth?: number;
  intrinsicHeight?: number;
  imageFit: 'cover' | 'contain' | 'fill' | 'none';
}

/** 6. Таблицы (Word, PDF Report, HTML) */
export interface TableContainerNode extends IUIBaseNode {
  kind: 'TableContainerNode';
  role: 'tabular';
  columnWidths: MetricUnit[];
}

export interface TableRowNode extends IUIBaseNode {
  kind: 'TableRowNode';
  role: 'tabular';
  isHeader?: boolean;
}

export interface TableCellNode extends IUIBaseNode {
  kind: 'TableCellNode';
  role: 'tabular';
  colSpan?: number;
  rowSpan?: number;
}

/** 7. Интерактивные контролы ввода */
export type UIControlType = 'button' | 'text-input' | 'checkbox' | 'radio' | 'select' | 'slider';

export interface ControlNode extends IUIBaseNode {
  kind: 'ControlNode';
  role: 'control';
  controlType: UIControlType;
  value?: unknown;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

/** 8. Проекция компонентов (Web Component <slot>, Unity Prefab, Word Merge) */
export interface ProjectionNode extends IUIBaseNode {
  kind: 'ProjectionNode';
  role: 'projection';
  slotName?: string;
  componentDefinitionId?: string;
}

export type UINode =
  | SurfaceNode
  | ContainerNode
  | TextLeafNode
  | VectorShapeNode
  | MediaAssetNode
  | TableContainerNode
  | TableRowNode
  | TableCellNode
  | ControlNode
  | ProjectionNode;

// ============================================================================
// 9. НОРМАЛИЗОВАННЫЙ ДОКУМЕНТ (Root Store)
// ============================================================================

export interface UIDocument {
  id: string;
  title: string;
  rootId: UINodeId;
  nodes: Readonly<Record<UINodeId, UINode>>;
  resources: {
    fonts: Readonly<Record<string, { uri: string; format: 'woff2' | 'ttf' | 'otf' }>>;
    images: Readonly<Record<string, { base64OrUri: string; mime: string }>>;
  };
}


export type InformationNode = abstracts.meta.IHas &{
  kind: string;
}

export type HasInteractionInsRef = InformationNode& abstracts.patterns.IHasRef &{
  interactionIns: abstracts.patterns.IdRefArray<AnyIn>;
}

export type InteractionIn = abstracts.patterns.IEntity &{
}

export type TextIn = InteractionIn & HasText & HasTextType & { kind: 'TextIn' };
export type CodeIn = InteractionIn & HasText & HasCodeLanguage & { kind: 'CodeIn' };

export type EntityIn = InteractionIn & HasEntityRef & { kind: 'EntityIn' };

export type TaskIn = InteractionIn & HasTaskType & HasTask & HasTasksRef & { kind: 'TaskIn' };

export type CallIn = InteractionIn & HasCallRef & HasArguments & { kind: 'CallIn' };
export type ResultIn = InteractionIn & HasCallRef & HasResult & { kind: 'ResultIn' };
export type ToolIn = InteractionIn & HasCallRef & { kind: 'ToolIn' };

export type InteractionTurnIn = InteractionIn & HasSender & HasInteractionInsRef & {
  kind: 'InteractionTurnIn'
};

export type AnyIn = TextIn
  | CodeIn
  | EntityIn
  | TaskIn
  | CallIn
  | ResultIn
  | ToolIn
  | InteractionTurnIn;

export type HasInteractionTurns = InformationNode &{
  interactionTurns: abstracts.patterns.IdRefArray<InteractionTurnIn>,
}

export type InteractionEntity = abstracts.patterns.IEntity & HasInteractionTurns;

export type HasInteractionEntityRef = InformationNode& abstracts.patterns.IHasRef &{
  interactionEntity: abstracts.patterns.IdRef<InteractionEntity>;
}

export interface HasTasksRef extends abstracts.meta.IHas, abstracts.patterns.IHasRef {
  tasks: abstracts.patterns.IdRefArray<TaskIn>;
}
