import differences from "razomy/differences/differences";
import separate_strings from "razomy/strings/separate_strings";
import strings_string from "razomy/string/strings_string";

function differences_string(a_string: string, b_string: string) {
  const a_lines = separate_strings(a_string, 0, '\n', []);
  const b_lines = separate_strings(b_string, 0, '\n', []);
  return differences(a_lines, b_lines, (...as) => strings_string(as));
}

export default differences_string;
