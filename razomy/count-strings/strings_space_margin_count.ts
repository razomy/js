import {String} from '@razomy/string';
import {Number} from '@razomy/number';
import {spaceMarginCount} from '@razomy/count-string';

export function stringsSpaceMarginCount(strings: String[]): Number[] {
  return strings.map(spaceMarginCount);
}


