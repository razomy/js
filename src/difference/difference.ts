import { DifferenceType } from "./difference_type";

export interface Difference<T> {
  type: DifferenceType,
  value: T,
}
