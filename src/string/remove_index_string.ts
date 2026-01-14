import { String } from 'razomy.string/string';
import { Index } from 'razomy.index/index_';
import { Number } from 'razomy.number/number';

export default function remove_index_string(string: String, index: Index, length: Number): String {
    return string.substring(0, index) + string.substring(index + length);
}
