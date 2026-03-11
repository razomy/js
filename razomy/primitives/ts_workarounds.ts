/**
 * Утилита для создания номинальных типов (Branded Types)
 * Позволяет отличать type I8 = number от type U32 = number на уровне компилятора
 */
export type Brand<K, T> = K & { readonly __brand: T };

/**
 * Базовый маркерный интерфейс для всех структур данных.
 * Метаданные (memoryLayout и topology) вынесены в JSDoc.
 */
export interface DataStructure<T> {
  // Маркерный дженерик, чтобы TS понимал структуру
  readonly _typeMarker?: T;
}

// Допустимые значения для документации JSDoc
export type LogicalTopology =
  | '1:1_Linear'
  | '1:N_Hierarchical'
  | 'N:M_Network'
  | 'Spatial_Grid';

export type MemoryLayout =
  | 'Contiguous' // Подряд в памяти (массивы)
  | 'Pointer'    // Ссылочные (узлы, графы)
  | 'Hashed'     // Хэш-таблицы
  | 'Composite'; // Смешанные
