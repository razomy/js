import get from "razomy.kv/get";
import {ArrayKeyValuable, ArrayOrKeyValuable, KeyValuable, Valuable} from "razomy.kv/kv";

function set<T>(value: ArrayOrKeyValuable<T, T>, path: T[], newValue: Valuable<T, T>): void {
  const parent_path = path.slice(0, -1);
  const parent_node = get(value, parent_path, 0);
  parent_node[1] = newValue;
}

export default set;
