import assign from 'razomy.key/assign';

export default function get_path(obj, path: string) {
  if (path === '') {
    return [];
  }

  const closing_bracket_index = path.indexOf(assign);
  const slug = path.substring(0, closing_bracket_index);
  let child_node = Object.keys(obj).find(key => key === slug);
  if (!child_node) {
    throw new Error(`Node not found path="${path}".`);
  }

  const remaining_string = path.substring(closing_bracket_index + 1);
  return [child_node, ...get_path(child_node, remaining_string)];
}
