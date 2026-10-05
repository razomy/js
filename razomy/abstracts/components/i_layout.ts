import * as abstracts from '@razomy/abstracts';

export interface ILayout extends abstracts.patterns.IComponent {}

//region layout
/**
 * Спецификация размеров дорожек (Track Sizing) для CSS Grid, OpenXML Tables и PDF.
 */
export type GridTrackSize =
  | ({ kind: 'xy' } & abstracts.components.MetricUnit)
  | { kind: 'minmax'; min: abstracts.components.MetricUnit; max: abstracts.components.MetricUnit }
  | { kind: 'fit-content'; limit: abstracts.components.MetricUnit }
  | { kind: 'repeat'; count: number | 'auto-fill' | 'auto-fit'; track: GridTrackSize };

/**
 * 2D Grid Layout Engine.
 * Web: `display: grid; grid-template-*`
 * Word: `w:tbl` с массивом колонок `w:tblGrid`
 * PDF: Математическая разбивка ширины страницы на X-координаты
 * Unity: UI Toolkit Grid Layout
 */
export interface GridContainerLayout extends ILayout {
  kind: 'grid';
  columns: GridTrackSize[];
  rows: GridTrackSize[];
  autoColumns?: GridTrackSize[];
  autoRows?: GridTrackSize[];
  autoFlow?: 'row' | 'column' | 'row-dense' | 'column-dense';
  templateAreas?: string[];
  columnGap?: abstracts.components.MetricUnit;
  rowGap?: abstracts.components.MetricUnit;
  justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly';
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  alignItems?: 'start' | 'end' | 'center' | 'stretch';
}

export interface GridItemPlacement {
  columnStart?: number | string;
  columnEnd?: number | string;
  rowStart?: number | string;
  rowEnd?: number | string;
  area?: string;
  justifySelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch';
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch';
}

/**
 * 1D Flexbox Layout Engine.
 * Web: `display: flex`
 * Unity: UI Toolkit (Yoga Layout Engine)
 * Word/PDF: Эмулируется через выравнивание строчных блоков
 */
export interface FlexLayout extends ILayout {
  kind: 'flex';
  direction: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around';
  gap?: { row: abstracts.components.MetricUnit; column: abstracts.components.MetricUnit };
}

export interface FlexItemPlacement {
  grow?: number;
  shrink?: number;
  basis?: abstracts.components.MetricUnit;
  order?: number;
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';
}

/**
 * Потоковый макет (Flow Layout).
 * Базовый для Word (w:p, w:r) и HTML Inline/Block.
 */
export interface FlowLayout extends ILayout {
  kind: 'flow';
  display: 'block' | 'inline' | 'inline-block' | 'none';
  float?: 'left' | 'right' | 'none';
  clear?: 'left' | 'right' | 'both' | 'none';
  breakBefore?: 'auto' | 'always' | 'page' | 'column' | 'avoid';
  breakAfter?: 'auto' | 'always' | 'page' | 'column' | 'avoid';
  breakInside?: 'auto' | 'avoid';
}

/**
 * Якорное позиционирование (Anchored Layout).
 * Нативный макет Unity uGUI (RectTransform).
 */
export interface AnchoredLayout extends ILayout {
  kind: 'anchored';
  anchorMin: [x: number, y: number]; // [0..1, 0..1]
  anchorMax: [x: number, y: number];
  pivot: [x: number, y: number]; // [0..1, 0..1]
  anchoredPosition: [x: number, y: number];
  sizeDelta: [width: number, height: number];
}

/**
 * Фиксированное позиционирование (Fixed Layout).
 * Нативный макет PDF страниц (ISO 32000 MediaBox / CropBox) и абсолютных оверлеев.
 */
export interface FixedLayout extends ILayout {
  kind: 'fixed';
  x: abstracts.components.MetricUnit;
  y: abstracts.components.MetricUnit;
  width: abstracts.components.MetricUnit;
  height: abstracts.components.MetricUnit;
}

export type UILayoutEngine = GridContainerLayout | FlexLayout | FlowLayout | AnchoredLayout | FixedLayout;

//endregion

// region Position and size

export interface UISizing {
  width?: abstracts.components.MetricUnit;
  height?: abstracts.components.MetricUnit;
  minWidth?: abstracts.components.MetricUnit;
  maxWidth?: abstracts.components.MetricUnit;
  minHeight?: abstracts.components.MetricUnit;
  maxHeight?: abstracts.components.MetricUnit;
  aspectRatio?: number;
  boxSizing?: 'content-box' | 'border-box';
}

export interface UIPositioning {
  mode: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  insets?: Partial<abstracts.components.BoundRectangleMetric>;
  zIndex?: number;
}

export interface UIOverflow {
  x: 'visible' | 'hidden' | 'scroll' | 'auto' | 'clip';
  y: 'visible' | 'hidden' | 'scroll' | 'auto' | 'clip';
}

//endregion

//region Color

export type ColorRGBA = [r: number, g: number, b: number, a: number];

export type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion';

export interface SolidPaint {
  kind: 'solid';
  color: ColorRGBA;
  opacity?: number;
}

export interface GradientStop {
  offset: number; // 0..1
  color: ColorRGBA;
}

export interface GradientPaint {
  kind: 'linear-gradient' | 'radial-gradient' | 'conic-gradient';
  angle?: number; // В градусах
  stops: GradientStop[];
}

export interface ImagePaint {
  kind: 'image';
  uri: string;
  fit: 'cover' | 'contain' | 'fill' | 'tile' | 'none';
  position?: abstracts.components.Vector2Metric;
  repeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
}

export type UIPaint = SolidPaint | GradientPaint | ImagePaint;

export interface BorderSide {
  width: abstracts.components.MetricUnit;
  style: 'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge';
  color: ColorRGBA;
}

export interface UIBorders {
  sides?: Partial<abstracts.components.BoundRectangle<BorderSide>>;
  radii?: {
    topLeft?: abstracts.components.Vector2Metric;
    topRight?: abstracts.components.Vector2Metric;
    bottomRight?: abstracts.components.Vector2Metric;
    bottomLeft?: abstracts.components.Vector2Metric;
  };
}

export interface UIShadow {
  kind: 'drop' | 'inner';
  offset: abstracts.components.Vector2Metric;
  blurRadius: abstracts.components.MetricUnit;
  spreadRadius?: abstracts.components.MetricUnit;
  color: ColorRGBA;
}

export interface UIFilters {
  blur?: abstracts.components.MetricUnit;
  backdropBlur?: abstracts.components.MetricUnit; // Glassmorphism
  opacity?: number;
  grayscale?: number;
  contrast?: number;
  brightness?: number;
  saturate?: number;
  blendMode?: BlendMode;
}

//endregion

//region ТРАНСФОРМАЦИИ 2D / 3D

export interface UITransforms {
  origin?: { x: abstracts.components.MetricUnit; y: abstracts.components.MetricUnit; z?: abstracts.components.MetricUnit };
  translate?: { x: abstracts.components.MetricUnit; y: abstracts.components.MetricUnit; z?: abstracts.components.MetricUnit };
  scale?: { x: number; y: number; z?: number };
  rotate?: { x?: number; y?: number; z: number };
  skew?: { x: number; y: number };
  /**
   * Аффинная матрица 4x4 в формате Column-Major:
   * Прямой маппинг в PDF оператор `cm`, Unity `Matrix4x4` и CSS `matrix3d()`.
   */
  rawMatrix4X4?: [
    number,
    number,
    number,
    number,

    number,
    number,
    number,
    number,

    number,
    number,
    number,
    number,

    number,
    number,
    number,
    number,
  ];
}

//endregion

//region Typography

export interface Typography {
  fontFamily: string[];
  fontSize: abstracts.components.MetricUnit;
  fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  fontStyle: 'normal' | 'italic' | 'oblique';
  lineHeight: abstracts.components.MetricUnit;
  letterSpacing?: abstracts.components.MetricUnit;
  wordSpacing?: abstracts.components.MetricUnit;
  textAlign: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
  verticalAlign?: 'baseline' | 'sub' | 'super' | 'top' | 'middle' | 'bottom';
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
  textDecoration?: {
    line: 'none' | 'underline' | 'overline' | 'line-through';
    style?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
    color?: ColorRGBA;
  };
  whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line';
  wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word';
  textOverflow?: 'clip' | 'ellipsis';
  maxLines?: number;
  /**
   * Аппаратные OpenType свойства (DirectWrite, HarfBuzz, FreeType, CSS font-feature-settings)
   * Пример: { "liga": 1, "calt": 1, "tnum": 1, "smcp": 0 }
   */
  openTypeFeatures?: Readonly<Record<string, number | boolean>>;
  textShadow?: UIShadow[];
  color: UIPaint;
}

//endregion

//region Animation

export interface UITransition {
  property: string;
  durationMs: number;
  delayMs?: number;
  timingFunction?:
    | 'linear'
    | 'ease'
    | 'ease-in'
    | 'ease-out'
    | 'ease-in-out'
    | { cubicBezier: [number, number, number, number] };
}

//endregion

//region Events

export interface UIStyleBag {
  sizing?: UISizing;
  positioning?: UIPositioning;
  margin?: Partial<abstracts.components.BoundRectangleMetric>;
  padding?: Partial<abstracts.components.BoundRectangleMetric>;
  overflow?: UIOverflow;
  backgrounds?: UIPaint[];
  borders?: UIBorders;
  shadows?: UIShadow[];
  filters?: UIFilters;
  transforms?: UITransforms;
  transitions?: UITransition[];
  cursor?: 'default' | 'pointer' | 'text' | 'move' | 'not-allowed' | 'grab';
  opacity?: number;
  visible?: boolean;
}

export type UIEventType =
  | 'pointer.click'
  | 'pointer.doubleClick'
  | 'pointer.enter'
  | 'pointer.exit'
  | 'pointer.down'
  | 'pointer.up'
  | 'focus.in'
  | 'focus.out'
  | 'input.change'
  | 'form.submit'
  | 'drag.start'
  | 'drag.over'
  | 'drop';

export interface UIEventBinding {
  event: UIEventType;
  actionId: string;
  payload?: Readonly<Record<string, unknown>>;
}

export interface UIInteractionSpec {
  focusable?: boolean;
  tabIndex?: number;
  events?: UIEventBinding[];
  states?: {
    hover?: UIStyleBag;
    focus?: UIStyleBag;
    active?: UIStyleBag;
    disabled?: UIStyleBag;
  };
}

//endregion
