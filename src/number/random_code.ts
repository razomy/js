export type OutIndex = -1 & { readonly type: "OutIndex" };
export type Index = number & { readonly type: "Index" };
export type IndexOrOut = Index | OutIndex;

export default function random_code() {
  return Math.random().toString(36).substr(2);
}


