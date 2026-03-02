import type { String } from '@razomy/string';
import type { Number } from '@razomy/number';
import { countSpaceMargin } from './space_margin_count';

export function countSpaceMarginByArray(strings: String[]): Number[] {
  return strings.map(countSpaceMargin);
}
