import type { BoundRectangle, BoundRectangleMetric, MetricUnit, Position2dMetric } from './has_dimension';
import type { ILayout } from '../translators/i_ui_node';

/**
 * Спецификация размеров дорожек (Track Sizing) для CSS Grid, OpenXML Tables и PDF.
 */
export type GridTrackSize =
  | ({ kind: 'xy' } & MetricUnit)
  | { kind: 'minmax'; min: MetricUnit; max: MetricUnit }
  | { kind: 'fit-content'; limit: MetricUnit }
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
  columnGap?: MetricUnit;
  rowGap?: MetricUnit;
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
  gap?: { row: MetricUnit; column: MetricUnit };
}

export interface FlexItemPlacement {
  grow?: number;
  shrink?: number;
  basis?: MetricUnit;
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
  x: MetricUnit;
  y: MetricUnit;
  width: MetricUnit;
  height: MetricUnit;
}

export type UILayoutEngine = GridContainerLayout | FlexLayout | FlowLayout | AnchoredLayout | FixedLayout;

// ============================================================================
// 3. БОКС-МОДЕЛЬ, РАЗМЕРЫ И ПОЗИЦИОНИРОВАНИЕ
// ============================================================================

export interface UISizing {
  width?: MetricUnit;
  height?: MetricUnit;
  minWidth?: MetricUnit;
  maxWidth?: MetricUnit;
  minHeight?: MetricUnit;
  maxHeight?: MetricUnit;
  aspectRatio?: number;
  boxSizing?: 'content-box' | 'border-box';
}

export interface UIPositioning {
  mode: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  insets?: Partial<BoundRectangleMetric>;
  zIndex?: number;
}

export interface UIOverflow {
  x: 'visible' | 'hidden' | 'scroll' | 'auto' | 'clip';
  y: 'visible' | 'hidden' | 'scroll' | 'auto' | 'clip';
}

// ============================================================================
// 4. ГРАФИЧЕСКИЙ СТЕК: ЦВЕТ, ЗАЛИВКА, ГРАНИЦЫ, ТЕНИ, ФИЛЬТРЫ
// ============================================================================

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
  position?: Position2dMetric;
  repeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
}

export type UIPaint = SolidPaint | GradientPaint | ImagePaint;

export interface BorderSide {
  width: MetricUnit;
  style: 'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge';
  color: ColorRGBA;
}

export interface UIBorders {
  sides?: Partial<BoundRectangle<BorderSide>>;
  radii?: {
    topLeft?: Position2dMetric;
    topRight?: Position2dMetric;
    bottomRight?: Position2dMetric;
    bottomLeft?: Position2dMetric;
  };
}

export interface UIShadow {
  kind: 'drop' | 'inner';
  offset: Position2dMetric;
  blurRadius: MetricUnit;
  spreadRadius?: MetricUnit;
  color: ColorRGBA;
}

export interface UIFilters {
  blur?: MetricUnit;
  backdropBlur?: MetricUnit; // Glassmorphism
  opacity?: number;
  grayscale?: number;
  contrast?: number;
  brightness?: number;
  saturate?: number;
  blendMode?: BlendMode;
}

// ============================================================================
// 5. 2D / 3D ТРАНСФОРМАЦИИ (Матричный аппарат PDF/Unity/CSS)
// ============================================================================

export interface UITransforms {
  origin?: { x: MetricUnit; y: MetricUnit; z?: MetricUnit };
  translate?: { x: MetricUnit; y: MetricUnit; z?: MetricUnit };
  scale?: { x: number; y: number; z?: number };
  rotate?: { x?: number; y?: number; z: number };
  skew?: { x: number; y: number };
  /**
   * Аффинная матрица 4x4 в формате Column-Major:
   * Прямой маппинг в PDF оператор `cm`, Unity `Matrix4x4` и CSS `matrix3d()`.
   */
  rawMatrix4x4?: [
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

// ============================================================================
// 6. ТИПОГРАФИКА И ШРИФТОВОЙ ШЕЙПИНГ (Advanced Typography)
// ============================================================================

export interface Typography {
  fontFamily: string[];
  fontSize: MetricUnit;
  fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  fontStyle: 'normal' | 'italic' | 'oblique';
  lineHeight: MetricUnit;
  letterSpacing?: MetricUnit;
  wordSpacing?: MetricUnit;
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

// ============================================================================
// 7. СТЕК СТИЛЯ И ИНТЕРАКТИВНОСТЬ
// ============================================================================

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

export interface UIStyleBag {
  sizing?: UISizing;
  positioning?: UIPositioning;
  margin?: Partial<BoundRectangleMetric>;
  padding?: Partial<BoundRectangleMetric>;
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

import * as abstracts from "@razomy/abstracts";
import type {HasExtension} from "../functions/has_args";


export type Text = string;

export interface HasText extends abstracts.meta.IHas {
  text: Text;
}

export type TextType = 'thinking' | 'text' | 'channel' | 'example';

export interface HasTextType extends abstracts.meta.IHas {
  textType: TextType;
}

export type CodeLanguage = 'ts' | 'py' | 'js' | 'sh';

export interface HasCodeLanguage extends abstracts.meta.IHas {
  codeLanguage: CodeLanguage;
}

export interface HasEntityRef extends abstracts.meta.IHas, abstracts.patterns.IHasRef {
  entity: abstracts.patterns.IdRef<abstracts.patterns.IEntity>;
}

export interface HasTask extends abstracts.meta.IHas {
  task: Text;
}

export type TaskType = 'do' | 'goto' | 'task' | 'loop' | 'task_done' | 'subtask';

export interface HasTaskType extends abstracts.meta.IHas {
  taskType: TaskType;
}

export type CallEntity<A extends abstracts.functions.ExtensionGenerics = abstracts.functions.ExtensionGenerics> = abstracts.patterns.IEntity & HasFunctionHir & HasExtension<A>
export type CallRef<A extends abstracts.functions.ExtensionGenerics = abstracts.functions.ExtensionGenerics> = abstracts.patterns.IdRef<CallEntity<A>>

export interface HasCallRef extends abstracts.patterns.IHasRef {
  call: CallRef;
}

export interface HasArguments extends abstracts.meta.IHas {
  arguments_: any[];
}

export interface HasResult extends abstracts.meta.IHas {
  result: any;
}

export type InteractionTurnSender = 'SYSTEM' | 'USER' | 'MODEL' | 'TOOL';

export interface HasSender extends abstracts.meta.IHas {
  sender: InteractionTurnSender;
}

export interface HasFunctionHir extends abstracts.meta.IHas {
  functionHir: abstracts.translators.FunctionHir;
}
