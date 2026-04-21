export type DifferenceType = 'unchanged' | 'added' | 'removed';

export interface Difference<T> {
  type: DifferenceType;
  value: T;
}

export interface ReplaceDifference<T> {
  type: 'replace';
  prevValue: T;
  value: T;
}

export type ChangeDifference<T> = Difference<T> | ReplaceDifference<T>;
