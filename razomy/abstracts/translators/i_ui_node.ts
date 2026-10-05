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

import * as abstracts from '@razomy/abstracts';

export interface IUiNode {}

// 2. ДВИЖКИ КОМПОНОВКИ (Layout Engines)

// 8. СЕРИЯ УНИВЕРСАЛЬНЫХ УЗЛОВ (Discriminated Uins)

export type UIUinId = string;

export interface IUIBaseUin extends abstracts.patterns.ISyntax {
  id: UIUinId;
  name?: string;
  parent?: abstracts.patterns.IdRef<UIUin>;
  children?: abstracts.patterns.IdRef<UIUin>[];
  containerLayout?: abstracts.components.UILayoutEngine;
  itemPlacement?: {
    grid?: abstracts.components.GridItemPlacement;
    flex?: abstracts.components.FlexItemPlacement;
  };
  style?: abstracts.components.UIStyleBag;
  interaction?: abstracts.components.UIInteractionSpec;
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
    width: abstracts.components.MetricUnit;
    height: abstracts.components.MetricUnit;
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
  typography: abstracts.components.Typography;
}

/** 4. Векторная графика (SVG d-path, DrawingML, PDF Path) */
export interface VectorShapeUin extends IUIBaseUin {
  kind: 'VectorShapeUin';
  role: 'vector';
  pathCommands: string;
  fillRule?: 'nonzero' | 'evenodd';
  fillPaint?: abstracts.components.UIPaint;
  strokePaint?: abstracts.components.UIPaint;
  strokeWidth?: abstracts.components.MetricUnit;
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
  columnWidths: abstracts.components.MetricUnit[];
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

