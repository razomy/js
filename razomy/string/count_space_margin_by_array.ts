import type { String } from '@razomy/string';
import type { Number } from '@razomy/number';
import { countSpaceMargin } from './count_space_margin';

export function countSpaceMarginByArray(strings: String[]): Number[] {
  return strings.map(countSpaceMargin);
}
