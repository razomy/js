export interface HasDimension {}

/**
 * Исчерпывающий перечень кросс-платформенных единиц измерения.
 * - 'px': CSS пиксели / Экранные пиксели Unity / Условные единицы веба.
 * - 'pt': Типографские пункты (1/72 дюйма). Нативный стандарт для PDF и Word OpenXML (dxa = pt * 20).
 * - 'mm' | 'in' | 'cm': Абсолютные физические единицы (критичны для PDF печати и Word шаблонов).
 * - 'fr': Фракционные доли пространства (CSS Grid и таблицы Word).
 * - 'em' | 'rem' | 'ch': Относительные типографические единицы веба.
 * - 'vw' | 'vh' | 'vmin' | 'vmax': Единицы области видимости (Viewport).
 * - '%': Процент от ширины/высоты родительского контейнера.
 * - 'auto' | 'none': Автоматический расчет движком компоновки.
 */
export type MetricType =
  | 'px'
  | 'pt'
  | 'mm'
  | 'cm'
  | 'in'
  | 'fr'
  | '%'
  | 'em'
  | 'rem'
  | 'ch'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | 'auto'
  | 'none';

export interface MetricUnit {
  value: number;
  type: MetricType;
}

export interface HasLength<U = number> {
  length: U;
}

export interface HasX<U = number> {
  x: U;
}

export interface HasY<U = number> {
  y: U;
}

export interface BoundX<U = number> {
  startX: U;
  finishX: U;
}

export interface BoundY<U = number> {
  startY: U;
  finishY: U;
}

export interface Position2d<U = number> extends HasX<U>, HasY<U> {}

export interface BoundRectangle<U = number> extends BoundX<U>, BoundY<U> {}

export interface NodeBound<U = number> {
  fullRect: BoundY<U> & HasX<U>;
}

export interface Vector3d { x: number; y: number; z: number; }
export interface Quaternion { x: number; y: number; z: number; w: number; }
export interface Transform3d {
  position: Vector3d;
  rotation: Quaternion;
  scale: Vector3d;
}

/**
 * Двухмерный вектор физических смещений (X/Y или Horizontal/Vertical).
 */
export interface Position2dMetric extends Position2d<MetricUnit> {}
export interface BoundRectangleMetric extends BoundRectangle<MetricUnit> {}
