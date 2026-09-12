// Допустимые значения для документации JSDoc
export type LogicalTopology = '1:1_Linear' | '1:N_Hierarchical' | 'N:M_Network' | 'Spatial_Grid';

export type MemoryLayout =
  | 'Contiguous' // Подряд в памяти (массивы)
  | 'Pointer' // Ссылочные (узлы, графы)
  | 'Hashed' // Хэш-таблицы
  | 'Composite'; // Смешанные
