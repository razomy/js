import path from "path";
import fs from "fs";
import {createDirectoryIfNotExists} from "razomy.js/fs/create";
import {is_value_recursion, ValueRecursiveDictOrValue} from "razomy.js/vrd/value";

export function create(absolute_path: string, dict: ValueRecursiveDictOrValue<Buffer>) {
  if (is_value_recursion(dict)) {
    createDirectoryIfNotExists(absolute_path)
    for (const key in dict) {
      const branch = dict[key];
      const item_absolute_path = path.join(absolute_path, key);
      create(item_absolute_path, branch);
    }
  } else {
    fs.writeFileSync(absolute_path, dict)
  }
}
