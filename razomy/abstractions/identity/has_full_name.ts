import * as abstractions from '@razomy/abstractions';

/**
 * Unique identifier / Full representation
 */
export interface HasFullName extends abstractions.meta.IHas {
  fullName: string; // исправлен camelCase (было fullname)
}

/**
 * Short personal identifier / Alias
 */
export interface HasNickName extends abstractions.meta.IHas {
  nickName: string;
}

/**
 * Display name for UI / Public profile
 */
export interface HasDisplayName extends abstractions.meta.IHas {
  displayName: string;
}

/**
 * Minimal legal name
 */
export interface HasLegalName extends abstractions.meta.IHas {
  legalName: string;
}

/* ==========================================================================
   Основные компоненты имени (Name Parts)
   ========================================================================== */

export interface HasFirstName extends abstractions.meta.IHas {
  firstName: string;
}

export interface HasMiddleName extends abstractions.meta.IHas {
  middleName: string;
}

/**
 * Inherited surname / Family name
 */
export interface HasFamilyName extends abstractions.meta.IHas {
  familyName: string;
}

export interface HasLastName extends abstractions.meta.IHas {
  lastName: string;
}

/**
 * Father's/Mother's name or Patronymic (Отчество)
 */
export interface HasPatronymic extends abstractions.meta.IHas {
  patronymic: string;
}

export interface HasParentName extends abstractions.meta.IHas {
  parentName: string;
}

/**
 * Name before marriage
 */
export interface HasMaidenName extends abstractions.meta.IHas {
  maidenName: string;
}

/**
 * Titles: Mr., Ms., Dr., Prof., Sheikh, etc.
 */
export interface HasHonorificPrefix extends abstractions.meta.IHas {
  honorificPrefix: string;
}

/**
 * Generational suffixes: Jr., Sr., III, Esq., etc.
 */
export interface HasGenerationalSuffix extends abstractions.meta.IHas {
  generationalSuffix: string;
}

/**
 * For East Asian / Hungarian structures or phonebooks
 * e.g., "Yao, Ming" or "Kim, Jong-un" for alphabetical lists
 */
export interface HasSortingName extends abstractions.meta.IHas {
  sortingName: string;
}

/**
 * Cultural naming convention types
 */
export type NamingConventionType =
  | 'western' // [Given] [Middle] [Family] (e.g. John Fitzgerald Kennedy)
  | 'eastern' // [Family] [Given] (e.g. Kim Jong-un, Mao Zedong)
  | 'patronymic' // [Given] [Patronymic] [Family] (e.g. Иван Иванович Иванов)
  | 'mononym' // Only single name (e.g. Plato, Zendaya)
  | 'spanish'; // [Given] [Paternal] [Maternal]

export interface HasNamingConvention extends abstractions.meta.IHas {
  namingConventionType: NamingConventionType;
}
