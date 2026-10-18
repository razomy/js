import * as abstractions from "@razomy/abstractions";

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

export interface HasLength<U = number> extends abstractions.patterns.IComponent {
  length: U;
}

export interface HasX<U = number> extends abstractions.patterns.IComponent {
  x: U;
}

export interface HasY<U = number> extends abstractions.patterns.IComponent {
  y: U;
}

export interface HasZ<U = number>  extends abstractions.patterns.IComponent{
  z: U;
}

export interface BoundX<U = number> extends abstractions.patterns.IComponent {
  startX: U;
  finishX: U;
}

export interface BoundY<U = number> extends abstractions.patterns.IComponent {
  startY: U;
  finishY: U;
}

export interface Vector2<U = number> extends HasX<U>, HasY<U> {}

export interface BoundRectangle<U = number> extends BoundX<U>, BoundY<U> {}

export interface NodeBound<U = number> extends abstractions.patterns.IComponent {
  fullRect: BoundY<U> & HasX<U>;
}

export interface Vector3<U = number> extends Vector2<U> , HasZ<U> {}
export interface Quaternion<U = number> extends Vector3<U> {  w: number; }
export interface Transform3 extends abstractions.patterns.IEntity {
  position: Vector3;
  rotation: Quaternion;
  scale: Vector3;
}

/**
 * Двухмерный вектор физических смещений (X/Y или Horizontal/Vertical).
 */
export interface Vector2Metric extends Vector2<MetricUnit> {}
export interface BoundRectangleMetric extends BoundRectangle<MetricUnit> {}
