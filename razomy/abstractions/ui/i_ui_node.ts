/**
 * Ontology
 * Components
 *  Color
 *  Shape
 *  Position
 * Entities
 *  Layout
 *  Embedding
 *  Interaction
 */

import * as abstractions from '@razomy/abstractions';

export interface IUiNode {}

// 2. ДВИЖКИ КОМПОНОВКИ (Layout Engines)

// 8. СЕРИЯ УНИВЕРСАЛЬНЫХ УЗЛОВ (Discriminated Uins)

export type UIUinId = string;

export interface IUIBaseUin extends abstractions.patterns.ISyntax {
  id: UIUinId;
  name?: string;
  parent?: abstractions.patterns.IdRef<UIUin>;
  children?: abstractions.patterns.IdRef<UIUin>[];
  containerLayout?: abstractions.ui.UILayoutEngine;
  itemPlacement?: {
    grid?: abstractions.ui.GridItemPlacement;
    flex?: abstractions.ui.FlexItemPlacement;
  };
  style?: abstractions.ui.UIStyleBag;
  interaction?: abstractions.ui.UIInteractionSpec;
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
export interface SurfaceUin extends IUIBaseUin {
  kind: 'SurfaceUin';
  pageSize?: {
    width: abstractions.math.MetricUnit;
    height: abstractions.math.MetricUnit;
    orientation: 'portrait' | 'landscape';
  };
  dpi?: number;
}

/** 2. Контейнер общего назначения */
export interface ContainerUin extends IUIBaseUin {
  kind: 'ContainerUin';
}

/** 3. Текстовый узел (Лист дерева) */
export interface TextLeafUin extends IUIBaseUin {
  kind: 'TextLeafUin';
  content: string;
  typography: abstractions.ui.Typography;
}

/** 4. Векторная графика (SVG d-path, DrawingML, PDF Path) */
export interface VectorShapeUin extends IUIBaseUin {
  kind: 'VectorShapeUin';
  role: 'vector';
  pathCommands: string;
  fillRule?: 'nonzero' | 'evenodd';
  fillPaint?: abstractions.ui.UIPaint;
  strokePaint?: abstractions.ui.UIPaint;
  strokeWidth?: abstractions.math.MetricUnit;
}

/** 5. Растровый медиа-ассет */
export interface MediaAssetUin extends IUIBaseUin {
  kind: 'MediaAssetUin';
  role: 'media';
  sourceUri: string;
  intrinsicWidth?: number;
  intrinsicHeight?: number;
  imageFit: 'cover' | 'contain' | 'fill' | 'none';
}

/** 6. Таблицы (Word, PDF Report, HTML) */
export interface TableContainerUin extends IUIBaseUin {
  kind: 'TableContainerUin';
  role: 'tabular';
  columnWidths: abstractions.math.MetricUnit[];
}

export interface TableRowUin extends IUIBaseUin {
  kind: 'TableRowUin';
  role: 'tabular';
  isHeader?: boolean;
}

export interface TableCellUin extends IUIBaseUin {
  kind: 'TableCellUin';
  role: 'tabular';
  colSpan?: number;
  rowSpan?: number;
}

/** 7. Интерактивные контролы ввода */
export type UIControlType = 'button' | 'text-input' | 'checkbox' | 'radio' | 'select' | 'slider';

export interface ControlUin extends IUIBaseUin {
  kind: 'ControlUin';
  role: 'control';
  controlType: UIControlType;
  value?: unknown;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

/** 8. Проекция компонентов (Web Component <slot>, Unity Prefab, Word Merge) */
export interface ProjectionUin extends IUIBaseUin {
  kind: 'ProjectionUin';
  role: 'projection';
  slotName?: string;
  componentDefinitionId?: string;
}

export type UIUin =
  | SurfaceUin
  | ContainerUin
  | TextLeafUin
  | VectorShapeUin
  | MediaAssetUin
  | TableContainerUin
  | TableRowUin
  | TableCellUin
  | ControlUin
  | ProjectionUin;

// 9. НОРМАЛИЗОВАННЫЙ ДОКУМЕНТ (Root Store)

export interface UIDocumentUin {
  id: string;
  title: string;
  rootId: UIUinId;
  nodes: Readonly<Record<UIUinId, UIUin>>;
  resources: {
    fonts: Readonly<Record<string, { uri: string; format: 'woff2' | 'ttf' | 'otf' }>>;
    images: Readonly<Record<string, { base64OrUri: string; mime: string }>>;
  };
}

