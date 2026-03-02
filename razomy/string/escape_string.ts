import type { String } from '@razomy/string';
import { replace } from '@razomy/string';

export function escapeByString(string: String, separateString: String): String {
  return replace(string, separateString, '\\' + separateString);
}
