import {String} from 'razomy.string/string';
import {Number} from 'razomy.number/number';
import {spaceMarginCount} from 'razomy.count/string/space_margin_count';

export function stringsSpaceMarginCount(strings: String[]): Number[] {
  return strings.map(spaceMarginCount);
}


