export interface WithChildrenArray<T> {
  children: T[]
}

export function map_children<I extends WithChildrenArray<any>, O extends WithChildrenArray<any>>(
  _children: I[],
  cb: (input: I) => O
): O[] {
  const children: O[] = [];
  for (let child of _children) {
    children.push(map(child, cb))
  }
  return children;
}


export function map<I extends WithChildrenArray<any>, O extends WithChildrenArray<any>>(
  input: I,
  cb: (input: I) => O
): O {
  const otput = cb(input);
  otput.children = map_children(input.children, cb);
  return otput;
}
